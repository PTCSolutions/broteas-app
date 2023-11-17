import { query, onSnapshot, collection, orderBy, Timestamp, limit } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { writable, type Writable } from "svelte/store";
import type { PostComment } from '$lib/comment';

// The comments to currently show on the users screen. 
// These will be the comments corresponding to a particular song or album
export const comments: Writable<{ comments: PostComment[], loading: boolean }> = writable({ comments: [], loading: true });

export const subscribeToComments = async (postId: string) => {
    const q = query(collection(db, "posts", postId, "comments"), orderBy("date", "desc"), limit(100) );
    const callback = onSnapshot(
        q,
        (q) => {
            const commentList: PostComment[] = [];
            q.forEach((doc) => {
            const comment = doc.data();
            comment.postId = postId
            comment.id = doc.id
            if (comment.date != null) {
                comment.date = (comment.date as Timestamp).toDate();
            }
            commentList.push(comment as PostComment);
            });
            comments.update(() => {
                // console.log('💥 querySnapshot: New data: ', posts);
                return { comments: [...commentList], loading: false };
            });
        },
        (error) => {
            console.warn("Couldn't update snapshot, maybe the user is logged out?", error);
        }
    );
    return callback;
};