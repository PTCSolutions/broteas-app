import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { spotifyLoginFromCode } from '$lib/auth/spotify_login.js';
import { spotifyUser } from '$lib/stores/spotifyUserStore.js';
import { updateUser } from '$lib/user';
import { get } from 'svelte/store';


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const firstName = data.get('firstName') as string;
        const lastName = data.get('lastName') as string;
        const uid = data.get('uid') as string;
        if (firstName != null && lastName != null) {
            await updateUser(firstName, lastName, uid);
        }
    },
}

// Load in the uid of the current user from cookies
/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url }) {
    // Get uid from cookies
    let uid = cookies.get('uid');
    // If its undefined, because it hasnt been set yet, then set it to the empty string
    // This matches the value we set to, when the user logs out
    if (uid == undefined) {
        uid = "";
    }
    if (url.searchParams.get('code') && !get(spotifyUser)) {
        console.log("dfs")
        const spotify_user = await spotifyLoginFromCode(uid, url, CLIENT_ID, CLIENT_SECRET)
        console.log("USer is", spotify_user);
        return {
            spotify_user: spotify_user
        };
    } 
    return {
        spotify_user: get(spotifyUser)
    }
}