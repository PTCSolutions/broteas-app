import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, arrayRemove, arrayUnion, Timestamp, DocumentReference } from "firebase/firestore";
import { db } from "./firebase";
import { serverTimestamp } from 'firebase/firestore';

export interface PostComment {
    id: string;
    commentorId: string;
    text: string;
    date: Date;
    subCommentIds: Array<string>
}

// Function to getComments for a specific post
export async function getComments(postId: string) {
    const comments: PostComment[] = [];
    const docs = await getDocs(collection(db, "posts", postId, "comments"));
    if (!docs.empty) {
        docs.forEach((doc) => {
            const data = doc.data();
            const comment : PostComment = {
                commentorId: data.commentorId,
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
        const docRef : DocumentReference = await addDoc(collection(db, "posts", postId, "comments"),
            {
                commentorId: commentorId,
                text: text,
                date: serverTimestamp(),
                subCommentIds: []
            }
        );
        // Add reference to comment in post document
        await updateDoc(doc(db, "post", postId), {
            commentIds: arrayUnion(docRef.id)
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
// Delete a comment
export async function deleteComment(postId: string, commentId: string) {
    await deleteDoc(doc(db, "posts", postId, "comments", commentId));
    // Remove reference to comment in post document
    await updateDoc(doc(db, "posts", postId), {
        commentIds: arrayRemove(commentId)
    });
}