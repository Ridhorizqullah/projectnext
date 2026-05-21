import { z } from 'zod';

export const loginSchemaForm = z.object({
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email({ message: 'Format email tidak valid' }),
  password: z
    .string()
    .min(6, { message: 'Password minimal harus 6 karakter' }),
});

export type LoginForm = z.infer<typeof loginSchemaForm>;

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: 'Nama lengkap wajib diisi' })
    .min(3, { message: 'Nama lengkap minimal harus 3 karakter' }),
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email({ message: 'Format email tidak valid' }),
  password: z
    .string()
    .min(6, { message: 'Password minimal harus 6 karakter' }),
    
});

export type SignupForm = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email({ message: 'Format email tidak valid' }),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password minimal harus 6 karakter' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Konfirmasi password wajib diisi' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

