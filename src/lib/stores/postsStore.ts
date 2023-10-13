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
                const data = doc.data();
                const post : PostMeta = {
                    creatorId: data!.creatorId,
                    text: data!.text,
                    objectId: data!.objectId,
                    date: (data!.date as Timestamp).toDate(),
                    objectType: data!.objectType,
                    likes: data!.likes,
                    commentIds: data!.commentIds,
                    postId: doc.id
                }
                posts.push(post);
            });
            console.log(`Posts are ${posts}`)
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