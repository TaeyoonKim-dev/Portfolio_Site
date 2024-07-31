import { createClient } from '@supabase/supabase-js';

// Supabase URL 및 키 설정
const supabaseUrl = 'https://nodmnrnkojjnihcvqplu.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY; // Netlify 환경 변수에서 가져옴

// Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase }; // 클라이언트 내보내기
