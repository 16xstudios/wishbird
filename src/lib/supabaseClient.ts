import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// NOTE:
// Lovable Cloud injects these at build/runtime. In rare cases the preview can load
// before env injection is available; we provide safe fallbacks so the app doesn't
// crash with `supabaseUrl is required`.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ??
  "https://cpgcpximrdsgebgeprjc.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_0KKu3U7_x3LH0Pjz6_qfQg_Dm0RYUWB";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
