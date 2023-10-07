import { newPost } from '$lib/post.js';
import { CLIENT_SECRET, CLIENT_ID } from '$env/static/private';

/** @type {import('./$types').Actions} */
export const actions = {
    newPost: async ({ request, cookies }) => {
        await newPost(cookies, request);
    },
    search: async ({ request }) => {
        // Get text from the search form
        const data = await request.formData();
        const text = data.get('text') as string;
        // If the text is not empty
        if (text != null) {
            // First get an access token from spotify
            const tokenResponse = await fetch("https://accounts.spotify.com/api/token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
                });
            const tokenJson = await tokenResponse.json()
            const accessToken = tokenJson.access_token;
            // Next make a request to spotify search api with correct body
            const response = await fetch(`https://api.spotify.com/v1/search`,
                {
                    method: 'GET',
                    headers: {
                        // Accept: 'application/json'
                        Authorization: `Bearer ${accessToken}`
                    },
                    // Search for tracks with the input song title
                    body: `q=${text}&type=track`
                });
            return response.json();
        }
    },
};

/** @type {import('./$types').PageServerLoad} */
// Load spotify access token to use in the page
export async function load() {
    const response = await fetch("https://accounts.spotify.com/api/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        });
    const token = await response.json();
    const accessToken = token.access_token;
    console.log(accessToken);
    return { accessToken: accessToken };
}