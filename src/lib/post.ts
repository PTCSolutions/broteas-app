import { collection, addDoc, deleteDoc, doc, getDoc, getDocs, DocumentSnapshot, updateDoc, arrayRemove, arrayUnion, Timestamp, query, where, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { serverTimestamp } from 'firebase/firestore';
import type { PostComment } from "./comment";

export interface Post {
    creatorId: string;
    text: string;
    objectId: string;
    objectType: ObjectType;
}

export type ObjectType = "artist" | "track" | "album"
// Uncomment this when we want to read posts
export interface PostMeta extends Post {
    postId: string;
    date: Date;
    likes: Array<string>;
    commentIds: Array<string>;
}

export async function newPost(post: Post) {
    try {
        await addDoc(collection(db, "posts"),
            {
                creatorId: post.creatorId,
                text: post.text,
                objectId: post.objectId,
                date: serverTimestamp(),
                objectType: post.objectType,
                likes: [],
                commentIds: [],
            }
        );
    } catch (e) {
        console.error("Error adding document: ", e);
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
// Get a post from its postId
export async function getPost(postId: string): Promise<PostMeta | null> {
    const querySnapshot = await getDoc(doc(db, "posts", postId));
    let post: PostMeta | null = null;
    const data = querySnapshot.data();
    if (querySnapshot.exists()) {
        post = {
            creatorId: data!.creatorId,
            text: data!.text,
            objectId: data!.objectId,
            date: (data!.date as Timestamp).toDate(),
            objectType: data!.objectType,
            likes: data!.likes,
            commentIds: data!.commentIds,
            postId: postId
        }
        // doc.data() is never undefined for query doc snapshots
    }
    return post;
}

// Get the posts about a specific object
export async function getPostsForObject(objectId: string): Promise<Array<PostComment| null>> {
    const comments: Array<PostComment> = [];

    const q = query(collection(db, "posts"),
        where("objectId", "==", objectId));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const comment: PostComment = {
                id: doc.id,
                commentorId: data!.creatorId,
                text: data!.text,
                parentId: doc.id,
                postId: doc.id,
                date: (data!.date as Timestamp).toDate(),
                subCommentIds: data!.commentIds,
            };
            comments.push(comment);
        }
        );
    };
    return comments;
}


// Get the posts by a specific user
export async function getUsersPosts(uid: string): Promise<Array<PostMeta | null>> {
    const posts: Array<PostMeta> = [];

    const q = query(collection(db, "posts"),
        where("creatorId", "==", uid));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const post = {
                creatorId: data!.creatorId,
                text: data!.text,
                objectId: data!.objectId,
                date: (data!.date as Timestamp).toDate(),
                objectType: data!.objectType,
                likes: data!.likes,
                commentIds: data!.commentIds,
                postId: data!.postId
            }
            posts.push(post);
        }
        );
    };
    return posts;
}