import { signOut } from 'firebase/auth';
import {auth} from "$lib/firebase"
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({cookies}) {
    await signOut(auth);
    cookies.set('uid', '', { path: '/' });
    throw redirect(303, "/");
}