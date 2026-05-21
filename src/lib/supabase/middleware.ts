import { environment } from '@/configs/environment';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

// Fungsi untuk memperbarui sesi user dan mengelola proteksi rute (routing protection)
export async function updateSession(request: NextRequest) {
  // 1. Membuat response dasar dari Next.js untuk request saat ini
  let supabaseResponse = NextResponse.next({
    request,
  });

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = environment;

  // 2. Inisialisasi Supabase client khusus untuk middleware
  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      // Membaca cookie yang dikirim dari browser user
      getAll() {
        return request.cookies.getAll();
      },
      // Mengubah/menyimpan cookie baru jika ada pembaruan session (seperti refresh token auth)
      setAll(cookiesToSet) {
        // Set cookie pada request agar server component berikutnya mendapatkan data session terbaru
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        // Regenerasi response dengan request cookie yang telah diperbarui
        supabaseResponse = NextResponse.next({ request });
        // Set cookie pada response agar disimpan kembali ke browser user
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // 3. Mengambil data user yang sedang login dari server Supabase secara aman
  // Fungsi getUser() akan memvalidasi token JWT ke backend Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  
  // Rute auth luar (jika sudah login, dilarang mengakses ini dan akan dilempar ke '/')
  const isAuthRoute = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';

  // Rute callback (untuk token exchange Supabase, bypass seluruh pemeriksaan redirect)
  const isCallbackRoute = pathname.startsWith('/auth/callback');

  if (isCallbackRoute) {
    return supabaseResponse;
  }

  // 4. PROTEKSI RUTE: Jika user BELUM login dan mencoba membuka halaman selain halaman auth
  if (!user && !isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    // Alihkan (redirect) user ke halaman login
    return NextResponse.redirect(url);
  }

  // 5. PROTEKSI RUTE: Jika user SUDAH login dan mencoba membuka halaman auth
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    // Alihkan (redirect) user kembali ke halaman utama (home)
    return NextResponse.redirect(url);
  }

  // 6. Kembalikan response default jika tidak ada kondisi redirect yang terpenuhi
  return supabaseResponse;
}
