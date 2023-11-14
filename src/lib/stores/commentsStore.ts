// import { query, onSnapshot, collection, orderBy, Timestamp, limit } from 'firebase/firestore';
// import { db } from '$lib/firebase';
// import { writable, type Writable } from "svelte/store";
// import type { PostMeta } from '$lib/post';

// // The comments to currently show on the users screen. 
// // These will be the comments corresponding to a particular song or album
// export const comments: Writable<{ posts: PostMeta[], loading: boolean }> = writable({ posts: [], loading: true });

// export const subscribeToComments = async () => {
//     const querySnapshot = query(collection(db, "posts"), orderBy("date", "desc"), limit(100));
//     const callback = onSnapshot(
//         querySnapshot,
//         (q) => {
//             const posts: PostMeta[] = [];
//             q.forEach((doc) => {
//                 const post = doc.data();
//                 post.postId = doc.id
//                 if (post.date != null) {
//                     post.date = (post.date as Timestamp).toDate();
//                 }
//                 posts.push(post as PostMeta);

//             });
//             feedPosts.update(() => {
//                 // console.log('💥 querySnapshot: New data: ', posts);
//                 return { posts: [...posts], loading: false };
//             });

//         },
//         (error) => {
//             console.warn("Couldn't update snapshot, maybe the user is logged out?", error);
//         }
//     );
//     return callback;
// };