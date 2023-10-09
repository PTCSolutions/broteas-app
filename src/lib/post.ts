import { collection, addDoc, deleteDoc, doc, getDoc, DocumentSnapshot, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";
import { serverTimestamp } from 'firebase/firestore';
import type { Cookies } from "@sveltejs/kit";

export interface Post {
    creatorId: string;
    text: string;
    objectId: string;
}
// Uncomment this when we want to read posts
export interface PostMeta extends Post {
    postId: string;
    date: Date;
    likes: Array<string>;
    comments: Array<PostComment>;
}

interface PostComment {
    id : string;
    commentorId: string;
    text: string;
    date: Date;
}

export async function newPost(cookies: Cookies, request: Request) {
    const uid = cookies.get('uid');
    const data = await request.formData();
    const text = data.get('text') as string;
    const objectId = data.get('objectId') as string;
    if (text != null && objectId != null && uid != null) {
        const post: Post = {
            creatorId: uid,
            text: text,
            objectId: objectId,
        };
        try {
            console.log("Trying");

            const docRef = await addDoc(collection(db, "posts"),
                {
                    creatorId: post.creatorId,
                    text: post.text,
                    objectId: post.objectId,
                    date: serverTimestamp(),
                    likes: [],
                    comments: [],
                }
            );
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

export async function deletePost(id: string) {
    await deleteDoc(doc(db, "posts", id));
}

export async function likePost(postId: string, uid: string) {
    // Get document associated with post
    const docRef = doc(db, "posts", postId);
    const docSnapshot: DocumentSnapshot = await getDoc(docRef);
    // If the document exists, add or remove like.
    if (docSnapshot.exists()) {
        const likes: Array<string> = docSnapshot.data().likes;

        if (likes.includes(uid)) {
            await updateDoc(docRef, {
                likes: arrayRemove(uid)
            });
        } else {
            await updateDoc(docRef, {
                likes: arrayUnion(uid)
            });
        }

    }
}

