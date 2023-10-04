import type { User } from "./user";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./firebase";


export interface Post {
    postId: string;
    creator: User;
    date: Date;
    objectId: string;
    likes: Array<string>;
    comments: Array<PostComment>;
}

interface PostComment {
    commentor: User;
    text: string;
    date: Date;
}

export async function NewPost() {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}