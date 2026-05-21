import { DarkModeToggle } from '@/components/ui/common/darkmode-toggle';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

type AuthLayoutProps = {
  children: ReactNode;
};

// File ini adalah nested layout untuk halaman autentikasi (Login, Signup, dll.).
// Kita tidak menduplikasi tag <html>, <body>, atau ThemeProvider karena sudah dideklarasikan secara global di root layout (src/app/layout.tsx).

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // Menggunakan container flexbox minimalis yang dinamis untuk memusatkan form auth secara vertikal dan horizontal.
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-background text-foreground transition-colors duration-300">
      {/* Tombol toggle diposisikan absolute di sudut kanan atas agar pengguna bebas mengubah tema kapan pun tanpa mengganggu layout form. */}
      <div className="absolute top-4 right-4 z-50">
        <DarkModeToggle />
      </div>

      {/* Membatasi lebar area form (max-w-md) demi estetika responsif yang seimbang di perangkat mobile maupun desktop. */}
      <main className="w-full max-w-md px-4 py-8">
        {children}
      </main>

      {/* Meletakkan Toaster di level layout agar notifikasi toast dari aksi Server Actions (seperti login/signup gagal atau sukses) bisa ditangkap dan dirender dengan konsisten di seluruh halaman auth. */}
      <Toaster position="top-center" closeButton richColors />
    </div>
  );
}