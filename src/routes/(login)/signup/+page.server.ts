import { auth } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';
import { createUserWithEmailAndPassword } from 'firebase/auth';

//TODO: Tidy up page and comment
/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
         // Get email and password from submitted form
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        let success = false;
        // Try sign up
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            success = true;
        // Return error message if there is one
        } catch (error) {
            return { error: error.message };
        }
        // If succesfully signed up, redirect to home page
        if (success) {
            throw redirect(303, '/');
        }
    },
};