import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Button,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface ResetPasswordEmailProps {
  supabase_url: string
  email_action_type: string
  redirect_to: string
  token_hash: string
  token: string
  user_email: string
}

export const ResetPasswordEmail = ({
  token,
  supabase_url,
  email_action_type,
  redirect_to,
  token_hash,
  user_email,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Redefinir senha - Escrita Ágil</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🔐 Redefinir Senha</Heading>
        
        <Text style={text}>
          Olá! Recebemos uma solicitação para redefinir a senha da sua conta na Escrita Ágil.
        </Text>
        
        <Text style={text}>
          Se você solicitou essa alteração, clique no botão abaixo para criar uma nova senha:
        </Text>
        
        <div style={buttonContainer}>
          <Button
            href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
            style={button}
          >
            🔑 Redefinir Senha
          </Button>
        </div>
        
        <Text style={{ ...text, marginTop: '24px' }}>
          Ou copie e cole este código:
        </Text>
        <code style={code}>{token}</code>
        
        <Text style={disclaimer}>
          <strong>⚠️ Importante:</strong> Se você não solicitou a redefinição de senha, 
          ignore este email com segurança. Sua conta permanecerá protegida.
        </Text>
        
        <Text style={text}>
          Este link expira em 24 horas por segurança.
        </Text>
        
        <Text style={footer}>
          <strong>Escrita Ágil</strong> - Transformando sua escrita acadêmica<br/>
          Plataforma de cursos para estudantes e pesquisadores
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ResetPasswordEmail

// Estilos
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  maxWidth: '600px',
}

const h1 = {
  color: '#1f2937',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '40px 20px 20px 20px',
  padding: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 20px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#dc2626',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  border: 'none',
}

const code = {
  display: 'inline-block',
  padding: '16px 20px',
  width: '90%',
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  color: '#1f2937',
  fontSize: '14px',
  fontFamily: 'monospace',
  margin: '16px 20px',
  textAlign: 'center' as const,
}

const disclaimer = {
  ...text,
  color: '#dc2626',
  fontSize: '14px',
  marginTop: '32px',
  padding: '16px',
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
}

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '32px 20px 0 20px',
  textAlign: 'center' as const,
}