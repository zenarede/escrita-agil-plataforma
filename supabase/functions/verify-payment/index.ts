import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@4.0.0";
import React from 'npm:react@18.3.1';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { PurchaseConfirmationEmail } from './_templates/purchase-confirmation.tsx';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string);

// Helper function to get course name from slug
function getCourseNameFromSlug(slug: string): string {
  const courseMap: { [key: string]: string } = {
    'curso-redacao-academica': 'Curso de Redação Acadêmica',
    'curso-escrita-criativa': 'Curso de Escrita Criativa',
    'curso-escrita-profissional': 'Curso de Escrita Profissional',
    'curso-gramatica-avancada': 'Curso de Gramática Avançada'
  };
  
  return courseMap[slug] || 'Curso de Escrita';
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Function to send purchase confirmation email
async function sendPurchaseConfirmationEmail({
  userEmail,
  userName,
  courseSlug,
  amount,
  sessionId
}: {
  userEmail: string;
  userName: string;
  courseSlug: string;
  amount: number;
  sessionId: string;
}) {
  try {
    const courseName = getCourseNameFromSlug(courseSlug);
    const paymentDate = formatDate(new Date().toISOString());
    const siteUrl = Deno.env.get('SUPABASE_URL')?.replace('//', '//').replace('supabase.co', 'lovable.app') || 'https://app.lovable.app';

    console.log(`Sending purchase confirmation email to ${userEmail} for course: ${courseName}`);

    const html = await renderAsync(
      React.createElement(PurchaseConfirmationEmail, {
        user_name: userName,
        course_name: courseName,
        course_slug: courseSlug,
        amount: amount,
        payment_date: paymentDate,
        payment_method: 'Cartão de Crédito',
        site_url: siteUrl,
      })
    );

    const { data, error } = await resend.emails.send({
      from: 'Escrita Ágil <noreply@escritaagil.com>',
      to: [userEmail],
      subject: `✅ Sua compra do curso "${courseName}" foi confirmada!`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    console.log('Purchase confirmation email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Error sending purchase confirmation email:', error);
    // Don't throw error to avoid breaking the payment verification
    return null;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key to bypass RLS
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Parse request body
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    console.log(`Verifying payment for session: ${sessionId}`);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      throw new Error("Payment not completed");
    }

    const courseSlug = session.metadata?.courseSlug;
    const userId = session.metadata?.userId;

    if (!courseSlug || !userId) {
      throw new Error("Missing course or user information in session metadata");
    }

    console.log(`Payment verified for course: ${courseSlug}, user: ${userId}`);

    // Get current user profile with full name and email
    const { data: profile, error: profileError } = await supabaseService
      .from('profiles')
      .select('cursos_liberados, status, full_name, email')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      throw new Error("Failed to fetch user profile");
    }

    // Add course to user's released courses
    const cursosLiberados = profile.cursos_liberados || [];
    if (!cursosLiberados.includes(courseSlug)) {
      cursosLiberados.push(courseSlug);
      
      // Update user profile with new course access
      const { error: updateError } = await supabaseService
        .from('profiles')
        .update({
          cursos_liberados: cursosLiberados,
          status: 'ativo', // Ensure user has active status
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) {
        console.error("Error updating user profile:", updateError);
        throw new Error("Failed to grant course access");
      }

      console.log(`Course access granted: ${courseSlug} for user: ${userId}`);

      // Send purchase confirmation email
      await sendPurchaseConfirmationEmail({
        userEmail: profile.email,
        userName: profile.full_name || 'Cliente',
        courseSlug,
        amount: session.amount_total || 0,
        sessionId
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      courseSlug,
      message: "Payment verified and course access granted" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});