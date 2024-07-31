import { supabase } from './supabaseClient.mjs';

export async function handler(event) {
    try {
        const { name, email, message } = JSON.parse(event.body);

        if (!message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Message is required.' }),
            };
        }

        const { error } = await supabase
            .from('contact_messages')
            .insert([{ name: name || null, email: email || null, message }]);

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
}
