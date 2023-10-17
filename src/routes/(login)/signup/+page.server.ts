import { auth } from '$lib/firebase';
import { fail, redirect } from '@sveltejs/kit';
import { createUserWithEmailAndPassword, type UserCredential } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';
import { getUserNames, newUser } from '$lib/user.js';

// Aciton submitting sign up form.
/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        // Get data from submitted form
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const username = data.get('username') as string;
        const firstName = data.get('firstName') as string;
        const lastName = data.get('lastName') as string;
        let uid;
        let success = false;
        // Give errors for invalid usernames
        if (username.length < 8) {
            return fail(400, { error: "Username must be at least 8 characters", location: "username" });
        } else if (username.includes(" ")) {
            return fail(400, { error: "Username should not have any spaces", location: "username" });
        } else if (!/^[a-z0-9]+$/.test(username)) {
            return fail(400, { error: "Username must only contain lower case letters and numbers", location: "username" });
        }
        const usernames: string[] = await getUserNames();
        if (usernames.includes(username)) {
            return fail(400, { error: "Username already exists", location: "username" });
        }
        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Set uid to uid of created user
            uid = userCredential.user.uid;
            success = true;
            // Return error message if there is one
        } catch (error) {
            const firebaseError = error as FirebaseError;
            if (firebaseError.code == "auth/email-already-in-use") {
                return fail(400, { error: "Email already in use", location: "email" });
            } else if (firebaseError.code === "auth/invalid-email") {
                return fail(400, { error: "Email is invalid", location: "email" });
            }
            else if (firebaseError.code === "auth/weak-password") {
                return fail(400, { error: "Password is weak", location: "password" });
            }
            return fail(400, { error: firebaseError.message, location: "" });
        }
        // If succesfully signed up, create a firestore entry for user and then redirect to home page
        if (success) {
            await newUser({
                firstName: firstName,
                lastName: lastName,
                uid: uid,
                username: username,
                email: email,
                followers: [],
                following: [],
            });
            throw redirect(303, '/');
        }
        return fail(400, { error: "Try again: Unknown error", location: "" });
    },
};