import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config(); // Load .env variables

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for server-side operations
export const supabase = createClient(supabaseUrl, supabaseKey);
