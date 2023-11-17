import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, arrayRemove, arrayUnion, Timestamp, DocumentReference, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { serverTimestamp } from 'firebase/firestore';

export interface PostComment {
    id: string;
    commentorId: string;
    parentId: string;
    text: string;
    date: Date;
    subCommentIds: Array<string>
}

// Function to getComments for a specific post
export async function getComments(postId: string) {
    const comments: PostComment[] = [];
    const q = query(collection(db, "posts", postId, "comments"),
        where("parentId", "==", postId));
    const docs = await getDocs(q);
    if (!docs.empty) {
        docs.forEach((doc) => {
            const data = doc.data();
            const comment: PostComment = {
                commentorId: data.commentorId,
                parentId: data.parentId,
                date: (data!.date as Timestamp).toDate(),
                id: doc.id,
                text: data.text,
                subCommentIds: data.subCommentIds
            }
            comments.push(comment);
        })
    }
    return comments;
}

// Function to getSubComments for a specific comment
export async function getSubComments(postId: string, commentId: string,) {
    const comments: PostComment[] = [];

    const q = query(collection(db, "posts", postId, "comments"),
        where("parentId", "==", commentId));
    const docs = await getDocs(q);
    if (!docs.empty) {
        docs.forEach((doc) => {
            const data = doc.data();
            const comment: PostComment = {
                commentorId: data.commentorId,
                parentId: data.parentId,
                date: (data!.date as Timestamp).toDate(),
                id: doc.id,
                text: data.text,
                subCommentIds: data.subCommentIds
            }
            comments.push(comment);
        })
    }
    return comments;
}

// Add a new comment
export async function newComment(postId: string, commentorId: string, text: string) {
    try {
        // Add comment in post's comment subcollection
        const docRef: DocumentReference = await addDoc(collection(db, "posts", postId, "comments"),
            {
                commentorId: commentorId,
                parentId: postId,
                text: text,
                date: serverTimestamp(),
                subCommentIds: []
            }
        );
        // Add reference to comment in post document
        try {
            await updateDoc(doc(db, "posts", postId), {
                commentIds: arrayUnion(docRef.id)
            });
        } catch (error) {
            console.log(error);
        }

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Add a new comment
export async function newSubComment(postId: string, parentId: string, commentorId: string, text: string) {
    try {
        // Add comment in post's comment subcollection
        const docRef: DocumentReference = await addDoc(collection(db, "posts", postId, "comments"),
            {
                commentorId: commentorId,
                parentId: parentId,
                text: text,
                date: serverTimestamp(),
                subCommentIds: []
            }
        );
        // Add reference to comment in post document
        try {
            if (postId == parentId) {
                await updateDoc(doc(db, "posts", postId), {
                    commentIds: arrayUnion(docRef.id)
                });
            } else {
                await updateDoc(doc(db, "posts", postId, "comments", parentId), {
                    subCommentIds: arrayUnion(docRef.id)
                });
            }

        } catch (error) {
            console.log(error);
        }

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
// Delete a comment
export async function deleteComment(postId: string, commentId: string, parentId: string ) {
    await deleteDoc(doc(db, "posts", postId, "comments", commentId));
    // Delete reference to comment in relevant location
    if (postId == parentId) {
        await updateDoc(doc(db, "posts", postId), {
            commentIds: arrayRemove(commentId)
        });
    } else {
        await updateDoc(doc(db, "posts", postId, "comments", parentId), {
            subCommentIds: arrayRemove(commentId)
        });
    }
}