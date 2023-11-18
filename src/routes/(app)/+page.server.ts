import { newPost, type ObjectType, type Post } from '$lib/post.js';
// import { CLIENT_SECRET, CLIENT_ID } from '$env/static/private';
import { accessToken } from '$lib/stores/accessTokenStore.js';
import { get } from 'svelte/store';

/** @type {import('./$types').Actions} */
export const actions = {
    newPost: async ({ request }) => {
        const data = await request.formData();
        const text = data.get('text') as string;
        const uid = data.get('uid') as string;
        const objectId = data.get('objectId') as string;
        const objectType = data.get('objectType') as ObjectType;
        console.log("Im running")
        if (text != null && objectId != null && uid != null && objectType != null) {
            const post: Post = {
                creatorId: uid,
                text: text,
                objectId: objectId,
                objectType: objectType,
            };
            await newPost(post);
        }
    },
    search: async ({ request }) => {
        // Get text from the search form
        const data = await request.formData();
        const text = data.get('text') as string;
        // If the text is not empty
        if (text != null) {
            // Next make a request to spotify search api with correct body
            const response = await fetch(`https://api.spotify.com/v1/search`,
                {
                    method: 'GET',
                    headers: {
                        // Accept: 'application/json'
                        Authorization: `Bearer ${get(accessToken)}`
                    },
                    // Search for tracks with the input song title
                    body: `q=${text}&type=track`
                });
            return response.json();
        }
    },
};