import { query, onSnapshot, collection, orderBy, Timestamp, limit, where } from 'firebase/firestore';
import { userProfileStore } from './userStore';
import { db } from '$lib/firebase';
import { get, writable, type Writable } from "svelte/store";
import type { PostMeta } from '$lib/post';

export const feedPosts: Writable<{ posts: PostMeta[], loading: boolean }> = writable({ posts: [], loading: true });
export const explorePosts: Writable<{ posts: PostMeta[], loading: boolean }> = writable({ posts: [], loading: true });
export const usersPosts: Writable<{ posts: PostMeta[], loading: boolean }> = writable({ posts: [], loading: true });

export const subscribeToFeedPosts = async () => {
    // Get the uids of the person the user is following
    // Note: Empty string is required to avoid "FirebaseError: Invalid Query. A non-empty array is required for 'in' filters."
    const following: string[] = get(userProfileStore)?.user?.following ?? [""];
    console.log(following);
    const querySnapshot = query(collection(db, "posts"), orderBy("date", "desc"), where("creatorId", "in", following), limit(100));
    // const querySnapshot = query(collection(db, "posts"), orderBy("date", "desc"), limit(100));
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

export const subscribeToExplorePosts = async () => {
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
            explorePosts.update(() => {
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