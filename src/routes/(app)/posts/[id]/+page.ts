import { getPost, type PostMeta } from '$lib/post.js'
import { getObjectJson, type PostObject } from '$lib/spotify.js';

export async function load({ params, parent }) {
    const currentAccessToken = (await parent()).token;
    if (currentAccessToken != null) {
        const post: PostMeta | null = await getPost(params.id);
        const object: PostObject = await getObjectJson(post!.objectId, currentAccessToken, post!.objectType);
        return {
            post: post,
            object: object
        };
    }
}