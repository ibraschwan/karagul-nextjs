import RegisterForm from '@/components/auth/RegisterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İşletme Kaydı - Karagül Ajans',
  description: 'Ücretsiz işletme kaydı yapın. İşletmenizi binlerce müşteriye tanıtın.',
  keywords: 'işletme kaydı, ücretsiz kayıt, firma kaydı, müşteri bulma',
}

export default function RegisterPage() {
  return <RegisterForm />
}