'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Coffee, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { ForgotPasswordForm, forgotPasswordSchema } from '@/validations/auth-validation';
import { forgotPasswordAction } from '../action';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { control, handleSubmit, setError: setFieldError } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const origin = window.location.origin;
      const result = await forgotPasswordAction(data, origin);

      if (result.status === 'success') {
        setSuccess(true);
      } else if (result.status === 'error') {
        if (result.errors) {
          Object.entries(result.errors).forEach(([key, value]) => {
            if (key === '_form') {
              setErrorMsg(value?.[0] || 'Terjadi kesalahan');
            } else {
              setFieldError(key as any, {
                type: 'server',
                message: value?.[0] || 'Kolom tidak valid',
              });
            }
          });
        } else {
          setErrorMsg('Terjadi kesalahan yang tidak diketahui');
          toast.error('Koneksi gagal atau terjadi kesalahan server');
        }
      }
    } catch (err: any) {
      console.error(err);
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
          Forgot Password
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Masukkan email Anda untuk menerima link pemulihan password.
        </p>
      </div>

      {success ? (
        <div className="flex flex-col items-center justify-center text-center p-4 gap-4 animate-fade-in">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Email Berhasil Dikirim!
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Silakan periksa folder inbox atau spam email Anda untuk mengklik link pemulihan.
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

          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                  Alamat Email
                </FieldLabel>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-muted-foreground/75 pointer-events-none">
                    <Mail className="h-5 w-5 stroke-[1.8]" />
                  </span>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="Masukkan email terdaftar Anda"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                    disabled={loading}
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
                Mengirim...
              </span>
            ) : (
              'Kirim Link Reset'
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
