import { DarkModeToggle } from '@/components/ui/common/darkmode-toggle';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-background text-foreground transition-colors duration-300">
      {/* Floating Dark Mode Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <DarkModeToggle />
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-md px-4 py-8">
        {children}
      </main>

      {/* Sonner Toast Notification */}
      <Toaster position="top-center" closeButton richColors />
    </div>
  );
}