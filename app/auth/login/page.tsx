import LoginForm from '@/components/auth/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Giriş Yap - Karagül Ajans',
  description: 'Karagül Ajans hesabınıza giriş yapın. İşletme panelinize erişin.',
}

export default function LoginPage() {
  return <LoginForm />
}