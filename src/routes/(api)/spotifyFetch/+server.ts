import { getRefresh } from '$lib/user.js';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {

    const { uid, targetUrl } = await request.json();


    if (!targetUrl || !uid) {
        throw error(400);
    }

    // get stored refresh token from firebase
    const refresh_token = await getRefresh(uid);
    let access_token;

    // If refresh saved
    if (refresh_token) {

        // Get access_token using refresh
        const response = await fetch("https://accounts.spotify.com/api/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
                },
                body: `grant_type=refresh_token&refresh_token=${refresh_token}`
            });
        // If call succeeds update access token 
        if (response.status == 200) {
            const data = await response.json()
            console.log("DAta is ", data);
            access_token = data.access_token;
            // If refresh token invalid, return null
        } else {
            console.log("Refresh token invalid");
            throw error(400, "Refresh token invalid");
        }


        // Now get user info using access_token
        const user_response = await fetch(targetUrl, {
            headers: {
                "Authorization": `Bearer  ${access_token}`
            },
        },);

        // If succesfull return spotify user
        if (user_response.status == 200) {
            const data = await user_response.json()
            return json(data);
        }

    }
    throw error(400, "No refresh token in Firebase for this user");
}