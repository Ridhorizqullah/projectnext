'use server';

import { createClient } from '@/lib/supabase/server';
import { AuthFormState } from '@/types/auth';
import { loginSchemaForm, LoginForm } from '@/validations/auth-validation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(
  data: LoginForm
): Promise<AuthFormState> {
  const validatedFields = loginSchemaForm.safeParse(data);

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const {
    error,
    data: { user },
  } = await supabase.auth.signInWithPassword(validatedFields.data);

  if (error) {
    return {
      status: 'error',
      errors: {
        _form: [error.message],
      },
    };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();

  if (profile) {
    const cookiesStore = await cookies();
    cookiesStore.set('user_profile', JSON.stringify(profile), {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  revalidatePath('/', 'layout');
  redirect('/');
}