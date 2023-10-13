import { getComments, getPost, type PostComment, type PostMeta } from '$lib/post.js'
import { getObjectJson, type PostObject } from '$lib/spotify.js';
import { getUser, type User } from '$lib/user';

export async function load({ params, parent }) {
    const currentAccessToken = (await parent()).token;
    if (currentAccessToken != null) {
        const post: PostMeta | null = await getPost(params.id);
        const object: PostObject = await getObjectJson(post!.objectId, currentAccessToken, post!.objectType);
        const poster: User | null = await getUser(post!.creatorId);
        const comments: PostComment[] = await getComments(post!.postId);
        return {
            post: post,
            object: object,
            poster: poster,
            comments: comments
        };
    }
}