// Ketika componentnya menggunakan use client (Client Component)
import { createBrowserClient } from "@supabase/ssr";
import { environment } from "@/configs/environment";

// Fungsi untuk membuat client Supabase yang berjalan di sisi browser/client
export function createClient() {
    {
        // Mengambil variabel URL dan Anon Key dari konfigurasi environment
        const { SUPABASE_URL, SUPABASE_ANON_KEY } = environment;
        
        // Menginisialisasi dan mengembalikan browser client Supabase
        return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
    }
}
