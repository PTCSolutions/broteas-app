import { NewPost } from '$lib/post.js';
import type { Post } from '$lib/post.js';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const text = data.get('text') as string;
        const objectId = data.get('objectId') as string;
        if (text != null && objectId != null) {
            const post: Post = {
                creatorId: '12345',
                text: text,
                
                objectId: objectId,
            };
            NewPost(post);
        }
    },
};