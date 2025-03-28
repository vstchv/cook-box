import { Database } from "@/types/supabase";
import { createBrowserClient as createBrowserClientSupabase } from "@supabase/ssr";

export const createBrowserClient = () => {
  return createBrowserClientSupabase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
