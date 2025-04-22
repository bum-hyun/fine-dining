import { createBrowserClient } from '@supabase/ssr';

import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const createClient = () => createBrowserClient<Database>(supabaseUrl, supabaseKey);
const browserClient = createClient();

export default browserClient;
