import { auth } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';
import { createUserWithEmailAndPassword } from 'firebase/auth';


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        if (email != null && password != null) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    throw redirect(300, "/");
                })
                .catch(() => {
                });
        }
    },
};