import { getPost, type PostMeta } from '$lib/post.js'

export async function load({ params }) {
    const post : PostMeta | null = await getPost(params.id);
    return post;
}