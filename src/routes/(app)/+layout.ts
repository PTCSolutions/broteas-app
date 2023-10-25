import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutLoad} */
export async function load({parent}) {
    const uid = (await parent()).uid;
    // If its undefined, because it hasnt been set yet, then set it to the empty string
    // This matches the value we set to, when the user logs out
    if (uid == "") {
        throw redirect(302, "/welcome");
    };
}