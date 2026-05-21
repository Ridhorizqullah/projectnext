import { Metadata } from 'next';
import ForgotPassword from './_components/forgot-password';

export const metadata: Metadata = {
  title: 'Forgot Password - Cafetaria',
  description: 'Minta link reset password untuk memulihkan akun Cafetaria Anda.',
};

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
