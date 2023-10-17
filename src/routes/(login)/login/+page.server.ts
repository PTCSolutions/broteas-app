import { auth } from '$lib/firebase';
import { fail, redirect } from '@sveltejs/kit';
import type {FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        // Get email and password from submitted form
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        let success = false;
        interface Form {
            email: string;
            password: string;
        }
        const form : Form = {
            email: email,
            password: password,
        }
        // Try sign in
        try {
            await signInWithEmailAndPassword(auth, email, password);
            success = true;
        // Return error message if there is one
        } catch (error) {
            const firebaseError = error as FirebaseError;
            if (firebaseError.code == "auth/invalid-login-credentials") {
                return fail(400, { error: "Wrong email/password", location: "password", form: form });
            }
            return fail(400,{ error: firebaseError.message, location: "", form: form});
        }
        // If succesfully signed in, redirect to home page and set the uid in cookies
        if (success && auth.currentUser != null) {
            cookies.set('uid', auth.currentUser?.uid, { path: '/' });
            throw redirect(303, '/');
        }
        return fail(400,{ error: "Try again: Unknown error", location: "", form: form});
    },
};