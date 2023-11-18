import { getNewsJSON } from '$lib/news.js';
import {  getPost, type PostMeta } from '$lib/post.js'
import { getObjectJson } from '$lib/spotify.js';
import { subscribeToComments } from '$lib/stores/commentsStore.js';
import { getUser, type User } from '$lib/user';

export async function load({ params, parent }) {
    const currentAccessToken = (await parent()).token;
    if (currentAccessToken != null) {
        const post: PostMeta | null = await getPost(params.id);
        if (post != null) {
            let object;
            if (post.objectType != "news") {
                object =  await getObjectJson(post!.objectId, currentAccessToken, post!.objectType);
            } else {
                object = await getNewsJSON(post!.objectId, post!.objectType)
            }
            const poster: User | null = await getUser(post!.creatorId);
            subscribeToComments(post.postId);
            return {
                post: post,
                object: object,
                poster: poster,
            };
        }
    }
}