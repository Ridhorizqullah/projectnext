import AppSidebar from '@/components/ui/common/app-sidebar';
import { DarkModeToggle } from '@/components/ui/common/darkmode-toggle';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ReactNode } from 'react';

// Layout utama untuk halaman dashboard admin/user.
// SidebarProvider mengelola state terbukanya sidebar (collapsible state) secara global lewat React Context.
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      {/* Sidebar utama di sisi kiri aplikasi */}
      <AppSidebar />
      
      {/* SidebarInset digunakan sebagai pembungkus konten utama di sebelah kanan sidebar yang otomatis menyesuaikan lebar saat sidebar menciut/collapsible. */}
      <SidebarInset className="overflow-x-hidden">
        {/* Header atas yang berisi tombol toggle collapse sidebar (SidebarTrigger) dan DarkModeToggle untuk penyesuaian tema. */}
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="cursor-pointer" />
            {/* Separator vertikal minimalis untuk memisahkan trigger sidebar dengan remah roti / konten lainnya */}
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <div className="px-4">
            <DarkModeToggle />
          </div>
        </header>
        
        {/* Area utama pengisian page content (children) dengan padding responsif */}
        <main className="flex flex-1 flex-col items-start gap-4 p-4 pt-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
