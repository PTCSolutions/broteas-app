import { followUser, unfollowUser } from '$lib/user.js';

/** @type {import('./$types').Actions} */
export const actions = {
    follow: async ({ request }) => {
        console.log("Oh we here baby");
        const data = await request.formData();
        const followed = data.get('followedUid') as string;
        const follower = data.get('currentUid') as string;
        // Try to add follower
        if (follower != null) {
            try {
                await followUser(follower, followed);
            } catch (error) {
                return {error: error};
            }
        }
    },
    unfollow: async ({ request }) => {
        const data = await request.formData();
        const followed = data.get('followedUid') as string;
        const follower = data.get('currentUid') as string;
        // Try to remove follower
        if (follower != null) {
            try {
                await unfollowUser(follower, followed);
            } catch (error) {
                return {error: error};
            }
        }
    },
};