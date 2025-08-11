import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Button,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface PurchaseConfirmationEmailProps {
  user_name: string
  course_name: string
  course_slug: string
  amount: number
  payment_date: string
  payment_method: string
  site_url: string
}

export const PurchaseConfirmationEmail = ({
  user_name,
  course_name,
  course_slug,
  amount,
  payment_date,
  payment_method,
  site_url,
}: PurchaseConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Sua compra do curso "{course_name}" foi confirmada!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>✅ Compra Confirmada!</Heading>
        </Section>

        <Section style={content}>
          <Text style={greeting}>Olá, {user_name},</Text>
          
          <Text style={text}>
            Obrigado por se inscrever no curso "<strong>{course_name}</strong>"! 
            Estamos muito felizes em ter você conosco.
          </Text>

          <Text style={text}>
            Seu acesso já está liberado. Comece seus estudos agora mesmo clicando no botão abaixo:
          </Text>

          <Section style={buttonContainer}>
            <Button
              href={`${site_url}/course/${course_slug}`}
              style={button}
            >
              Acessar o curso agora
            </Button>
          </Section>

          <Hr style={hr} />

          <Section style={detailsSection}>
            <Heading style={h2}>Detalhes da sua compra:</Heading>
            
            <Text style={detailItem}>
              <strong>Curso:</strong> {course_name}
            </Text>
            
            <Text style={detailItem}>
              <strong>Valor:</strong> R$ {(amount / 100).toFixed(2).replace('.', ',')}
            </Text>
            
            <Text style={detailItem}>
              <strong>Data da Compra:</strong> {payment_date}
            </Text>
            
            <Text style={detailItem}>
              <strong>Forma de Pagamento:</strong> {payment_method}
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            Caso tenha qualquer dúvida ou precise de ajuda, basta responder a este e-mail 
            ou entrar em contato com nossa equipe de suporte.
          </Text>

          <Text style={text}>
            <strong>Bons estudos!</strong>
          </Text>

          <Text style={signature}>
            Atenciosamente,<br />
            A Equipe Escrita Ágil
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            <Link href={`${site_url}/dashboard`} style={footerLink}>
              Ir para o Dashboard
            </Link>
            {' · '}
            <Link href={`${site_url}/contact`} style={footerLink}>
              Suporte
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default PurchaseConfirmationEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const header = {
  padding: '32px 24px',
  textAlign: 'center' as const,
}

const content = {
  padding: '0 24px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'center' as const,
}

const h2 = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '24px 0 16px',
}

const greeting = {
  color: '#1a1a1a',
  fontSize: '16px',
  margin: '24px 0 16px',
  fontWeight: '600',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#3b82f6',
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

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

const detailsSection = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
}

const detailItem = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '8px 0',
}

const signature = {
  color: '#374151',
  fontSize: '16px',
  margin: '24px 0 16px',
}

const footer = {
  borderTop: '1px solid #e5e7eb',
  padding: '24px',
  textAlign: 'center' as const,
  marginTop: '48px',
}

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
}

const footerLink = {
  color: '#3b82f6',
  textDecoration: 'underline',
}