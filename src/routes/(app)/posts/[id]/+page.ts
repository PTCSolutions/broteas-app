import { getPost, type PostMeta } from '$lib/post.js'
import { getObjectJson, type PostObject } from '$lib/spotify.js';
import { accessToken } from '$lib/stores/accessTokenStore.js';
import { get } from 'svelte/store';

export async function load({ params }) {
    const currentAccessToken = get(accessToken);
    if (currentAccessToken != null) {
        const post: PostMeta | null = await getPost(params.id);
        const object: PostObject = await getObjectJson(post!.objectId, currentAccessToken, post!.objectType);
        return {
            post: post,
            object: object
        };
    }
}