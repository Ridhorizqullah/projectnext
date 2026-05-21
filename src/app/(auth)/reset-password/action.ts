'use server';

import { createClient } from '@/lib/supabase/server';
import { resetPasswordSchema, ResetPasswordForm } from '@/validations/auth-validation';
import { AuthFormState } from '@/types/auth';

export async function resetPasswordAction(
  data: ResetPasswordForm
): Promise<AuthFormState> {
  const validatedFields = resetPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { password } = validatedFields.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
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
