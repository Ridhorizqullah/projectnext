'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Coffee, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { INITIAL_RESET_PASSWORD_FORM } from '@/constants/auth-constant';
import { ResetPasswordForm, resetPasswordSchema } from '@/validations/auth-validation';
import { createClient } from '@/lib/supabase/client';

export default function ResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const supabase = createClient();

  const { control, handleSubmit } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: INITIAL_RESET_PASSWORD_FORM,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (success && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (success && countdown === 0) {
      router.push('/login');
    }
    return () => clearTimeout(timer);
  }, [success, countdown, router]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        setErrorMsg(error.message || 'Gagal memperbarui password. Silakan coba lagi.');
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto bg-background p-6 md:p-8 rounded-2xl shadow-sm border border-border">
      {/* Header dengan Coffee Icon */}
      <div className="flex flex-col items-center justify-center text-center gap-2 mb-2">
        <div className="flex items-center justify-center w-12 h-12">
          <Coffee className="h-9 w-9 text-blue-500 fill-blue-500 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          Create New Password
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Masukkan password baru untuk akun Cafetaria Anda.
        </p>
      </div>

      {success ? (
        <div className="flex flex-col items-center justify-center text-center p-4 gap-4 animate-fade-in">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Password Berhasil Diubah!
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Mengalihkan Anda ke halaman login dalam {countdown} detik...
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          {errorMsg && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* New Password Field */}
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                  Password Baru
                </FieldLabel>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-muted-foreground/75 pointer-events-none">
                    <Lock className="h-5 w-5 stroke-[1.8]" />
                  </span>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="Masukkan password baru"
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

          {/* Confirm Password Field */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                  Konfirmasi Password Baru
                </FieldLabel>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-muted-foreground/75 pointer-events-none">
                    <Lock className="h-5 w-5 stroke-[1.8]" />
                  </span>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="Masukkan kembali password baru"
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#222] hover:bg-[#111] text-white font-medium rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.99] dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 mt-2 text-base flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Memperbarui...
              </span>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
      )}

      {/* Footer Link */}
      <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
        Kembali ke{' '}
        <Link
          href="/login"
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
