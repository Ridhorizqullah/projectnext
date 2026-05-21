'use client';

import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Coffee, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { INITIAL_SIGNUP_FORM } from '@/constants/auth-constant';
import { SignupForm, signupSchema } from '@/validations/auth-validation';

import { signupAction } from '../action';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { control, handleSubmit, setError: setFieldError } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsPending(true);
    setError(null);
    setIsSuccess(false);
    try {
      const result = await signupAction(data);
      if (result.status === 'success') {
        setIsSuccess(true);
      } else if (result.status === 'error') {
        if (result.errors) {
          Object.entries(result.errors).forEach(([key, value]) => {
            if (key === '_form') {
              setError(value?.[0] || 'Terjadi kesalahan');
            } else {
              setFieldError(key as any, {
                type: 'server',
                message: value?.[0] || 'Kolom tidak valid',
              });
            }
          });
        } else {
          setError('Terjadi kesalahan yang tidak diketahui');
        }
      }
    } catch (e: any) {
      console.error(e);
      setError('Koneksi gagal atau terjadi kesalahan server');
    } finally {
      setIsPending(false);
      toast.error('Koneksi gagal atau terjadi kesalahan server');
    }
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto bg-background p-6 md:p-8 rounded-2xl shadow-sm border border-border">
      {/* Header with blue Lightning Bolt */}
      <div className="flex flex-col items-center justify-center text-center gap-2 mb-2">
        <div className="flex items-center justify-center w-12 h-12">
          <Coffee className="h-9 w-9 text-blue-500 fill-blue-500 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          Sign up to Cafetaria
        </h1>
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center text-center gap-4 py-4 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50">
            <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">Registrasi Berhasil!</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Silakan periksa email Anda untuk memverifikasi akun sebelum masuk ke Cafetaria.
            </p>
          </div>
          <Link
            href="/login"
            className="mt-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Kembali ke Login
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}
        {/* Full Name Field */}
        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                Full Name
              </FieldLabel>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-muted-foreground/75 pointer-events-none">
                  <User className="h-5 w-5 stroke-[1.8]" />
                </span>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Please enter your full name"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  disabled={isPending}
                  className="pl-11 h-12 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 placeholder:text-muted-foreground/60 transition-all text-base md:text-sm"
                />
              </div>
              {fieldState.invalid && (
                <FieldError className="mt-1">{fieldState.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Email Field */}
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                Email
              </FieldLabel>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-muted-foreground/75 pointer-events-none">
                  <Mail className="h-5 w-5 stroke-[1.8]" />
                </span>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="Please enter your email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  disabled={isPending}
                  className="pl-11 h-12 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 placeholder:text-muted-foreground/60 transition-all text-base md:text-sm"
                />
              </div>
              {fieldState.invalid && (
                <FieldError className="mt-1">{fieldState.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Password Field */}
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                Password
              </FieldLabel>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-muted-foreground/75 pointer-events-none">
                  <Lock className="h-5 w-5 stroke-[1.8]" />
                </span>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Please enter your password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  disabled={isPending}
                  className="pl-11 h-12 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 placeholder:text-muted-foreground/60 transition-all text-base md:text-sm"
                />
              </div>
              {fieldState.invalid && (
                <FieldError className="mt-1">{fieldState.error?.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Action Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-[#222] hover:bg-[#111] text-white font-medium rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.99] dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 mt-2 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isPending ? 'Registering...' : 'Create an account'}
        </Button>
      </form>
      )}

      {/* Footer Link */}
      <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
