import { auth } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';
import type { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


/** @type {import('./$types').Actions} */
export const actions = {
    signUp: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        let success = false;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            success = true;
        } catch (error) {
            return {error: error.message};
        }
        if (success) {
            throw redirect(303, '/');
        }
    },
    logIn: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        if (email != null && password != null) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    throw redirect(303, "/");
                })
                .catch(({ error }) => {
                    return { error: error.message };
                });
        }
    },
};