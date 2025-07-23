import React from 'npm:react@18.3.1'
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { WelcomeEmail } from './_templates/welcome-email.tsx'
import { ResetPasswordEmail } from './_templates/reset-password.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    })
  }

  try {
    const payload = await req.text()
    const headers = Object.fromEntries(req.headers)
    
    // Verify webhook signature if secret is provided
    if (hookSecret) {
      const wh = new Webhook(hookSecret)
      try {
        wh.verify(payload, headers)
      } catch (error) {
        console.error('Webhook verification failed:', error)
        return new Response('Unauthorized', { 
          status: 401,
          headers: corsHeaders 
        })
      }
    }

    const webhookData = JSON.parse(payload)
    
    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = webhookData as {
      user: {
        email: string
      }
      email_data: {
        token: string
        token_hash: string
        redirect_to: string
        email_action_type: string
        site_url: string
      }
    }

    console.log(`Sending ${email_action_type} email to ${user.email}`)

    // Choose the appropriate email template
    let emailComponent
    let subject = ''
    
    if (email_action_type === 'signup') {
      emailComponent = WelcomeEmail
      subject = '🎯 Confirme seu email - Escrita Ágil'
    } else if (email_action_type === 'recovery') {
      emailComponent = ResetPasswordEmail
      subject = '🔑 Redefinir senha - Escrita Ágil'
    } else {
      emailComponent = WelcomeEmail
      subject = '✉️ Confirmação - Escrita Ágil'
    }

    // Render the email template
    const html = await renderAsync(
      React.createElement(emailComponent, {
        supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
        token,
        token_hash,
        redirect_to,
        email_action_type,
        user_email: user.email,
      })
    )

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Escrita Ágil <noreply@yourdomain.com>', // Substitua pelo seu domínio
      to: [user.email],
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Email sent successfully:', data)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        emailId: data?.id 
      }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
      }
    )

  } catch (error) {
    console.error('Error in send-email function:', error)
    
    return new Response(
      JSON.stringify({
        error: {
          message: error.message || 'Internal server error',
          code: error.code || 'UNKNOWN_ERROR',
        },
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
      }
    )
  }
})