import type { User } from "./user";
import { collection, addDoc, FieldValue } from "firebase/firestore"; 
import { db } from "./firebase";


export interface Post {
    postId: string;
    creator: User;
    date: FieldValue;
    objectId: string;
    likes: Array<string>;
    comments: Array<PostComment>;
}

interface PostComment {
    commentor: User;
    text: string;
    date: Date;
}

export async function NewPost(post: Post) {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            post
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}