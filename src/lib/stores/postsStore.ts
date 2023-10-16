import { query, onSnapshot, collection, orderBy, Timestamp, where, limit } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { get, writable, type Writable } from "svelte/store";
import type { PostMeta } from '$lib/post';
import { userProfileStore } from './userStore';

export const postStore: Writable<{ posts: PostMeta[], loading: boolean }> = writable({ posts: [], loading: true });

let messagesUnsubscribeCallback;

export const subscribeToMessages = async (followingFilter : string) => {
    let querySnapshot;
    if (followingFilter === "following") {
        // Get the uids of the person the user is following
        const following: string[] = get(userProfileStore)?.user?.following == undefined ? [""] : get(userProfileStore)!.user!.following;
        querySnapshot = query(collection(db, "posts"), orderBy("date", "desc"), where("creatorId", "in", following), limit(100));
    } else {
        querySnapshot = query(collection(db, "posts"), orderBy("date", "desc"), limit(100));
    }
    messagesUnsubscribeCallback = onSnapshot(
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