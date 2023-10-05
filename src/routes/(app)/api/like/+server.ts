import { doc, updateDoc } from "firebase/firestore";
import { db } from "$lib/firebase.js";
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, cookies }): Promise<void> {
    const uid = cookies.get('uid');
    const postId: string | null = url.searchParams.get('postId');
    // const querySnapshot = await getDoc(doc(db, "posts", "ref?"));
    //TODO: Make this add to the likes not rewrite them
    if (postId != null) {
        await updateDoc(doc(db, "posts", postId), {
            likes: [uid]
        });
    }
    throw redirect(303, "/");
}