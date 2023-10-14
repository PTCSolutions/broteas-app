import { deleteComment, newComment, newSubComment } from '$lib/comment.js';


/** @type {import('./$types').Actions} */
export const actions = {
    newComment: async ({ request, params }) => {
        const data = await request.formData();
        const text = data.get('text') as string;
        const uid = data.get('commentorId') as string;
        const postId = params.id;
        if (text != null && postId != null && uid != null) {
            await newComment(postId, uid, text);
        }
    },
    deleteComment: async ({ request, params }) => {
        const data = await request.formData();
        const commentId = data.get('commentId') as string;
        await deleteComment(params.id, commentId);
    },
    newSubComment: async ({ request, params }) => {
        const data = await request.formData();
        const text = data.get('text') as string;
        const uid = data.get('commentorId') as string;
        const postId = params.id;
        const parentId = data.get('parentId') as string;
        if (text != null && postId != null && uid != null) {
            await newSubComment(postId, parentId, uid, text);
        }
    },

}