import type { User } from '$lib/user.js';
import { getUser } from '$lib/user.js';

export async function load({ params }) {
    const user: User | null = await getUser(params.uid);
    return user;
}