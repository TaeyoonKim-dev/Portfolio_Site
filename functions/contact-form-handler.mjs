import { supabase } from "./supabaseClient.mjs";

export const handler = async (event) => {
    // Check the method type
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405, // Method Not Allowed
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        // Parse the request body
        const { name, email, message } = JSON.parse(event.body);

        // Insert data into Supabase
        const { error } = await supabase
            .from('contact_form')
            .insert([{ name, email, message }]);

        // Handle errors from Supabase
        if (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error inserting data into the database.' }),
            };
        }

        // Return success response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message received successfully!' }),
        };
    } catch (error) {
        // Handle exceptions
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while processing your request.' }),
        };
    }
};
