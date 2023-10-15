import { getUser } from '$lib/user.js';
import type { User } from '$lib/user.js';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
    // Get the uid loaded in the parent +layout.server.ts file
    const { uid } = await parent();
    // Get a user object from this uid
    const user: User | null = await getUser(uid);
    return user;
}