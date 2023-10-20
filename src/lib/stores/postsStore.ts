import { query, onSnapshot, collection, orderBy, Timestamp, limit } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { writable, type Writable } from "svelte/store";
import type { PostMeta } from '$lib/post';

export const postStore: Writable<{ posts: PostMeta[], loading: boolean }> = writable({ posts: [], loading: true });

let messagesUnsubscribeCallback;

export const subscribeToMessages = async (uid: string) => {
    const querySnapshot = query(collection(db, "posts"), orderBy("date", "desc"), limit(100));
    messagesUnsubscribeCallback = onSnapshot(
        querySnapshot,
        (q) => {
            const posts: PostMeta[] = [];
            q.forEach((doc) => {
                const post = doc.data();
                if (post.creatorId != uid) {
                    post.postId = doc.id
                    if (post.date != null) {
                        post.date = (post.date as Timestamp).toDate();
                    }
                    posts.push(post as PostMeta);
                }
            });
            postStore.update(() => {
                // console.log('💥 querySnapshot: New data: ', posts);
                return { posts: [...posts], loading: false };
            });

        },
        (error) => {
            console.warn("Couldn't update snapshot, maybe the user is logged out?", error);
        }
    );
    return messagesUnsubscribeCallback;
};