// Ketika component nya menggunakan use server (Server Component, Server Action, atau Route Handler)

import { environment } from "@/configs/environment";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Opsi konfigurasi untuk menentukan level akses client Supabase (apakah admin atau publik)
type CreateClientOptions = {
    isAdmin?: boolean
}

// Fungsi untuk membuat client Supabase yang berjalan di sisi server (Node.js runtime)
export async function createClient({ isAdmin = false }: CreateClientOptions = {}) {
  // Mengambil cookie store dari request untuk sinkronisasi sesi auth
  const cookieStore = await cookies();
  const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } =
    environment;

  return createServerClient(
    SUPABASE_URL!,
    // Jika isAdmin bernilai true, gunakan Service Role Key (dapat bypass Row Level Security/RLS)
    // Jika false (default), gunakan Anon Key publik
    isAdmin ? SUPABASE_SERVICE_ROLE_KEY! : SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Mengambil semua cookies dari browser untuk dikirim ke request Supabase
        getAll() {
          return cookieStore.getAll();
        },
        // Menyimpan cookies baru dari Supabase ke browser (misalnya token sesi setelah refresh)
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Error ini wajar terjadi jika dipanggil dari Server Component biasa,
            // karena Server Component hanya boleh membaca cookie (Read-Only)
            console.error('Error setting cookies', cookiesToSet);
          }
        },
      },
    },
  );
}
