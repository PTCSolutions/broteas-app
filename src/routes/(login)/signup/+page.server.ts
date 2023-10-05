import { auth } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';
import { createUserWithEmailAndPassword, type UserCredential } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';
import { newUser } from '$lib/user.js';


// Aciton submitting sign up form.
/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        // Get data from submitted form
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const firstName = data.get('firstName') as string;
        const lastName = data.get('lastName') as string;
        let uid;

        let success = false;
        // Try sign up
        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Set uid to uid of created user
            uid = userCredential.user.uid;
            success = true;
            // Return error message if there is one
        } catch (error) {
            return { error: (error as FirebaseError).message };
        }
        // If succesfully signed up, create a firestore entry for user and then redirect to home page
        if (success) {
            await newUser({
                firstName: firstName,
                lastName: lastName,
                uid: uid,
                email: email,
                followers: [],
                following: []
            });
            throw redirect(303, '/');
        }
    },
};