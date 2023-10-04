import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { serverTimestamp } from 'firebase/firestore';

export interface Post {
    creatorId: string;
    text: string;
    objectId: string;
}
// Uncomment this when we want to read posts
// interface PostMeta extends Post {
//     postId: string;
//     date: FieldValue;
//     likes: Array<string>;
//     comments: Array<PostComment>;
// }

// interface PostComment {
//     commentorId: string;
//     text: string;
//     date: Date;
// }

export async function NewPost(post: Post) {
    try {
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