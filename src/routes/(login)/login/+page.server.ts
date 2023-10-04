import { auth } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

//TODO: Tidy up page and comment
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
            return { error: error.message };
        }
        if (success) {
            // if (auth.currentUser?.uid != undefined) {
            //     cookies.set('uid', auth.currentUser?.uid, { path: '/' });
            // }
            throw redirect(303, '/');
        }
    },
    logIn: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        let success = false;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            success = true;
        } catch (error) {
            return { error: error.message };
        }
        if (success) {
            // if (auth.currentUser?.uid != undefined) {
            //     cookies.set('uid', auth.currentUser?.uid, { path: '/' });
            // }
            throw redirect(303, '/');
        }
    },
};