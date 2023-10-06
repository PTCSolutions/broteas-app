import { NewPost } from '$lib/post.js';
import type { Post } from '$lib/post.js';
import { CLIENT_SECRET, CLIENT_ID } from '$env/static/private';

/** @type {import('./$types').Actions} */
export const actions = {
    newPost: async ({ request, cookies }) => {
        const uid = cookies.get('uid');
        const data = await request.formData();
        const text = data.get('text') as string;
        const objectId = data.get('objectId') as string;
        if (text != null && objectId != null && uid != null) {
            const post: Post = {
                creatorId: uid,
                text: text,
                objectId: objectId,
            };
            NewPost(post);
        }
    },
    search: async ({ request }) => {
        const data = await request.formData();
        const text = data.get('text') as string;
        if (text != null) {
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
            const response = await fetch(`https://api.spotify.com/v1/search`,
                {
                    method: 'GET',
                    headers: {
                        // Accept: 'application/json'
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: `q=${text}&type=track`
                });
            return response.json();
        }
    },
};

/** @type {import('./$types').PageServerLoad} */
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