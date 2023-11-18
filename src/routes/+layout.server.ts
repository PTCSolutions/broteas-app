import { CLIENT_SECRET, CLIENT_ID } from '$env/static/private';
import { spotifyLoginFromRefresh } from '$lib/auth/spotify_login';

// Load in the uid of the current user from cookies
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, url }) {
    // Get uid from cookies
    let uid = cookies.get('uid');
    // If its undefined, because it hasnt been set yet, then set it to the empty string
    // This matches the value we set to, when the user logs out
    if (uid == undefined) {
        uid = "";
    }
    const response = await fetch("https://accounts.spotify.com/api/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        });
    const general_token = await response.json();
    const spotify_user = await spotifyLoginFromRefresh(uid, url, CLIENT_ID, CLIENT_SECRET)

    return {
        uid: uid,
        general_token: general_token.access_token,
        spotify_user: spotify_user
    };
}