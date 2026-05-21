import { Metadata } from 'next';
import ResetPassword from './_components/reset-password';

export const metadata: Metadata = {
  title: 'Reset Password - Cafetaria',
  description: 'Perbarui password akun Cafetaria Anda dengan aman.',
};

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
