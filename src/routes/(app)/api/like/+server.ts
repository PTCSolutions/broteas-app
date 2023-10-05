import { arrayUnion, doc, updateDoc, DocumentSnapshot, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "$lib/firebase.js";
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, cookies }) {
    const uid = cookies.get('uid');
    const postId: string | null = url.searchParams.get('postId');
    if (postId != null && uid != null) {

        const docSnapshot: DocumentSnapshot = await getDoc(doc(db, "posts", postId));
        if (docSnapshot.exists()) {
            const likes: Array<string> = docSnapshot.data().likes;

            if (likes.includes(uid)) {
                await updateDoc(doc(db, "posts", postId), {
                    likes: arrayRemove(uid)
                });
            } else {
                await updateDoc(doc(db, "posts", postId), {
                    likes: arrayUnion(uid)
                });
            }

        }

    }
    throw redirect(303, "/");
}