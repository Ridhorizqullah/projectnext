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

export default function Signup() {
  const { control, handleSubmit } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: INITIAL_SIGNUP_FORM,
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log('Signup data submitted:', data);
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

      <form onSubmit={onSubmit} className="space-y-5">
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
          className="w-full h-12 bg-[#222] hover:bg-[#111] text-white font-medium rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.99] dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 mt-2 text-base"
        >
          Create an account
        </Button>
      </form>

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
