import { CLIENT_SECRET, CLIENT_ID } from '$env/static/private';

// Load in the uid of the current user from cookies
/** @type {import('./$types').LayoutServerLoad} */
export async function load({cookies}) {
    // Get access token and save to cookies
    const response = await fetch("https://accounts.spotify.com/api/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        });
    const token = await response.json();
    // Get uid from cookies
    let uid = cookies.get('uid');
    // If its undefined, because it hasnt been set yet, then set it to the empty string
    // This matches the value we set to, when the user logs out
    if (uid == undefined) {
        uid = "";
    }
	return {
		uid : uid,
        token: token.access_token
	};
}