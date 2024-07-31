import 'dotenv/config'; // 환경 변수 로드
import { createClient } from '@supabase/supabase-js';

// Supabase URL 및 키 설정
const supabaseUrl = process.env.SUPABASE_URL; // 환경 변수에서 Supabase URL 가져오기
const supabaseKey = process.env.SUPABASE_KEY; // 환경 변수에서 Supabase 키 가져오기

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL 또는 Supabase Key가 정의되지 않았습니다.');
}

// Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase }; // 클라이언트 내보내기
