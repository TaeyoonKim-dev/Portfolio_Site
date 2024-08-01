import { supabase } from "./supabaseClient.mjs";

export const handler = async (event) => {
    try {
        const { name, email, message } = JSON.parse(event.body);

        const { error } = await supabase
            .from('contact_form')
            .insert([{ name, email, message }]);

        if (error) {
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
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while processing your request.' }),
        };
    }
};
