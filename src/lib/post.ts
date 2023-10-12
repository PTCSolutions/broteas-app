import { collection, addDoc, deleteDoc, doc, getDoc, DocumentSnapshot, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";
import { serverTimestamp } from 'firebase/firestore';

export interface Post {
    creatorId: string;
    text: string;
    objectId: string;
    objectType: string;
}
// Uncomment this when we want to read posts
export interface PostMeta extends Post {
    postId: string;
    date: Date;
    likes: Array<string>;
    comments: Array<PostComment>;
}

interface PostComment {
    id: string;
    commentorId: string;
    text: string;
    date: Date;
}

export async function newPost(request: Request) {
    const data = await request.formData();
    const text = data.get('text') as string;
    const uid = data.get('uid') as string;
    const objectId = data.get('objectId') as string;
    const objectType = data.get('objectType') as string;
    if (text != null && objectId != null && uid != null && objectType != null) {
        const post: Post = {
            creatorId: uid,
            text: text,
            objectId: objectId,
            objectType: objectType,
        };
        try {
            await addDoc(collection(db, "posts"),
                {
                    creatorId: post.creatorId,
                    text: post.text,
                    objectId: post.objectId,
                    date: serverTimestamp(),
                    objectType: post.objectType,
                    likes: [],
                    comments: [],
                }
            );
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

export async function newComment(postId: string, commentorId: string, text: string) {
    try {
        await addDoc(collection(db, "posts", postId, "comments"),
            {
                commentorId: commentorId,
                text: text,
                date: serverTimestamp(),
            }
        );
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteComment(postId: string, commentId: string) {
    await deleteDoc(doc(db, "posts", postId, "comments", commentId));
}
