import { followUser, unfollowUser } from '$lib/user.js';

/** @type {import('./$types').Actions} */
export const actions = {
    follow: async ({ request, cookies }) => {
        const data = await request.formData();
        const followed = data.get('uid') as string;
        // TODO: Currently get currently loggedin user from cookies but ideally would pass it in to
        // the form from the settings page itself
        const follower = cookies.get('uid');
        // Try to add follower
        if (follower != null) {
            await followUser(follower, followed);
        }
    },
    unfollow: async ({ request, cookies }) => {
        const data = await request.formData();
        const followed = data.get('uid') as string;
        // TODO: Currently get currently loggedin user from cookies but ideally would pass it in to
        // the form from the settings page itself
        const follower = cookies.get('uid');
        // Try to add follower
        if (follower != null) {
            await unfollowUser(follower, followed);
        }
    },
};