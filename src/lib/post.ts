import { collection, addDoc, getDocs, FieldValue, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import { serverTimestamp } from 'firebase/firestore';

export interface Post {
    creatorId: string;
    text: string;
    objectId: string;
}
// Uncomment this when we want to read posts
export interface PostMeta extends Post {
    postId: string;
    date: FieldValue;
    likes: Array<string>;
    comments: Array<PostComment>;
}

interface PostComment {
    commentorId: string;
    text: string;
    date: Date;
}

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

export async function GetPosts() : Promise<Array<PostMeta>> {
    const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy("date", "desc")));
    const posts : Array<PostMeta> = [];
    querySnapshot.forEach((doc) => {
        const post = doc.data();
        post.postId = doc.id;
        posts.push(post as PostMeta);
        // doc.data() is never undefined for query doc snapshots
    });
    return posts;
}