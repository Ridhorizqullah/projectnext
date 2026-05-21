import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Rute tujuan pengalihan setelah sesi berhasil dibuat
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient({ isAdmin: false });
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin sebelum proxy
      const isLocalEnv = process.env.NODE_ENV === 'development';
      
      if (isLocalEnv) {
        // Lingkungan pengembangan lokal
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // Lingkungan produksi di balik proxy (seperti Vercel/Cloudflare)
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Jika kode gagal ditukar atau tidak ada kode, arahkan ke login dengan pesan error
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
}
