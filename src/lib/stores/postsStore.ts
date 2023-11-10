import { query, onSnapshot, collection, orderBy, Timestamp, limit, where } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { writable, type Writable } from "svelte/store";
import type { PostMeta } from '$lib/post';

export const feedPosts: Writable<{ posts: PostMeta[], loading: boolean }> = writable({ posts: [], loading: true });
export const usersPosts: Writable<{ posts: PostMeta[], loading: boolean }> = writable({ posts: [], loading: true });

export const subscribeToFeedPosts = async () => {
    const querySnapshot = query(collection(db, "posts"), orderBy("date", "desc"), limit(100));
    const callback = onSnapshot(
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
            feedPosts.update(() => {
                // console.log('💥 querySnapshot: New data: ', posts);
                return { posts: [...posts], loading: false };
            });

        },
        (error) => {
            console.warn("Couldn't update snapshot, maybe the user is logged out?", error);
        }
    );
    return callback;
};

export const subscribeToUsersPosts = async (creatorId: string) => {
    const querySnapshot = query(collection(db, "posts"), where("creatorId", "==", creatorId), orderBy("date", "desc"), limit(100));
    const callback = onSnapshot(
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
            usersPosts.update(() => {
                return { posts: [...posts], loading: false };
            });

        },
        (error) => {
            console.warn("Couldn't update snapshot, maybe the user is logged out?", error);
        }
    );
    return callback;
};