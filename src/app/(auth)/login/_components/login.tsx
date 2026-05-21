'use client';

import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Zap, Mail, Lock, Coffee, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { LoginForm, loginSchemaForm } from '@/validations/auth-validation';

import { login } from '../action';
import { useState } from 'react';

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { control, handleSubmit, setError: setFieldError } = useForm<LoginForm>({
    resolver: zodResolver(loginSchemaForm),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsPending(true);
    setError(null);
    try {
      const result = await login(data);
      if (result?.status === 'error') {
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
          Login to Cafetaria
        </h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {error && (
          <div className="p-3.5 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

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
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                  Password
                </FieldLabel>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-muted-foreground/75 pointer-events-none">
                  <Lock className="h-5 w-5 stroke-[1.8]" />
                </span>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Please enter your password"
                  autoComplete="current-password"
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
        
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-[#222] hover:bg-[#111] text-white font-medium rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.99] dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 mt-2 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            'Log in'
          )}
        </Button>
      </form>

      <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Forgot password?
          </Link>
        </div>

      {/* Footer Link */}
      <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
