import { supabase } from './supabaseClient';

exports.handler = async (event) => {
    try {
        // 요청 본문에서 데이터 추출
        const { name, email, message } = JSON.parse(event.body);

        // Supabase를 이용해 데이터베이스에 저장
        const { error } = await supabase
            .from('contacts')
            .insert([{ name, email, message }]);

        if (error) {
            console.error('Error inserting data:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error inserting data into the database.' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Message sent successfully!' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
