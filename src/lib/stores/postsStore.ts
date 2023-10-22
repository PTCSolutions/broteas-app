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
            q.docChanges().forEach((change) => {
                const post = change.doc.data();
                if (post.creatorId != uid) {
                    post.postId = change.doc.id;
                    if (post.date != null) {
                        post.date = (post.date as Timestamp).toDate();
                    }
                    const postMeta = post as PostMeta;
                    if (change.type === "added") {
                        postStore.update((currentPosts) => {
                            return { posts: [...currentPosts.posts, postMeta], loading: false }
                        });
                    }
                    if (change.type === "modified") {
                        postStore.update((currentPosts) => {
                            const posts: PostMeta[] = [...currentPosts.posts];
                            posts[posts.findIndex((post) => post.postId == postMeta.postId)] = postMeta;
                            return { posts: posts, loading: false }
                        });
                    }
                    if (change.type === "removed") {
                        postStore.update((currentPosts) => {
                            const posts: PostMeta[] = [...currentPosts.posts];
                            const index = posts.findIndex((post) => post.postId == postMeta.postId);
                            posts.splice(index, 1);
                            return { posts: posts, loading: false }
                        });
                    }
                }
            });
        },
        (error) => {
            console.warn("Couldn't update snapshot, maybe the user is logged out?", error);
        }
    );
    return messagesUnsubscribeCallback;
};