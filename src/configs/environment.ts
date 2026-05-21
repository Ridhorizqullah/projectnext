//agar tidak perlu memanggil next_public_supabase url jadi cukup ambil environment saja dan dia tidak terpost public dan non pablicnyua
//tapi sebelumnya cek dulu process.env apakah ada atau tidak
//const { SUPABASE_URL, SUPABASE_ANON_KEY } = environment; contoh manggilnya

export const environment = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
};