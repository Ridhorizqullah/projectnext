'use server';

import { createClient } from '@/lib/supabase/server';
import { forgotPasswordSchema, ForgotPasswordForm } from '@/validations/auth-validation';
import { AuthFormState } from '@/types/auth';

export async function forgotPasswordAction(
  data: ForgotPasswordForm,
  origin: string
): Promise<AuthFormState> {
  const validatedFields = forgotPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return {
      status: 'error',
      errors: {
        _form: [error.message],
      },
    };
  }

  return {
    status: 'success',
  };
}
