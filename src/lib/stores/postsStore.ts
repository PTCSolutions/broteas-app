import { query, onSnapshot, collection, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { writable, type Writable } from "svelte/store";
import type { PostMeta } from '$lib/post';

export const postStore: Writable<PostMeta[]> = writable([]);

let messagesUnsubscribeCallback;

const subscribeToMessages = async () => {

    const querySnapshot = query(collection(db, "posts"), orderBy("date", "desc"));
    console.log("Top level run")
    messagesUnsubscribeCallback = onSnapshot(
        querySnapshot,
        (q) => {
            console.log("Snapshot run")
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
                console.log('💥 querySnapshot: New data: ', posts);
                return [...posts];
            });
        },
        (error) => {
            console.warn("Couldn't update snapshot, maybe the user is logged out?", error);
        }
    );
    return messagesUnsubscribeCallback;
};
subscribeToMessages();