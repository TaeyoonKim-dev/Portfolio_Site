import { supabase } from './supabaseClient.js';

export const handler = async (event) => {
    try {
        const { name, email, message } = JSON.parse(event.body);

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
