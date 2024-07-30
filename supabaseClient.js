import 'dotenv/config'; // 환경 변수 로드
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nodmnrnkojjnihcvqplu.supabase.co'; // Supabase URL
const supabaseKey = process.env.SUPABASE_KEY; // 환경 변수에서 Supabase 키 가져오기

const supabase = createClient(supabaseUrl, supabaseKey); // Supabase 클라이언트 생성

export { supabase }; // 클라이언트 내보내기
