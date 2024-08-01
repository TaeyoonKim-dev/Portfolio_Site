import { supabase } from './supabaseClient.mjs';

export const handler = async (event) => {
    try {
        const { name, email, message } = JSON.parse(event.body);

        // 데이터베이스에 삽입
        const { data, error } = await supabase
            .from('contact_form')
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
            body: JSON.stringify({ message: 'Message received successfully!' }),
        };
    } catch (error) {
        console.error('Error handling request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while processing your request.' }),
        };
    }
};
