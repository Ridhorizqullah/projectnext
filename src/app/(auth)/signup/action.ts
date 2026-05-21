'use server';

import { createClient } from '@/lib/supabase/server';
import { signupSchema, SignupForm } from '@/validations/auth-validation';
import { AuthFormState } from '@/types/auth';

export async function signupAction(
  data: SignupForm
): Promise<AuthFormState> {
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, fullName } = validatedFields.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        role: 'user', // Default role untuk pendaftar baru
      },
    },
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
