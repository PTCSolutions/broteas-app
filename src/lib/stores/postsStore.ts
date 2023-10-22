import { query, onSnapshot, collection, orderBy, Timestamp, limit, where } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { writable, type Writable } from "svelte/store";
import type { PostMeta } from '$lib/post';

export const postStore: Writable<{ posts: PostMeta[], loading: boolean }> = writable({ posts: [], loading: true });
export const usersPostStore: Writable<{ posts: PostMeta[], loading: boolean }> = writable({ posts: [], loading: true });

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

let usersMessagesUnsubscribeCallback;
export const usersSubscribeToMessages = async (creatorId: string) => {
    const querySnapshot = query(collection(db, "posts"), where("creatorId", "==", creatorId), limit(100));
    usersMessagesUnsubscribeCallback = onSnapshot(
        querySnapshot,
        (q) => {
            const posts: PostMeta[] = [];
            q.forEach((doc) => {
                const post = doc.data();
                post.postId = doc.id
                if (post.date != null) {
                    post.date = (post.date as Timestamp).toDate();
                }
                posts.push(post as PostMeta);
            });
            usersPostStore.update(() => {
                return { posts: [...posts], loading: false };
            });

        },
        (error) => {
            console.warn("Couldn't update snapshot, maybe the user is logged out?", error);
        }
    );
    return usersMessagesUnsubscribeCallback;
};