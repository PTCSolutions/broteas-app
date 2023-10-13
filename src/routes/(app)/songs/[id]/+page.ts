import { getObjectJson, type Song } from '$lib/spotify.js'

export async function load({ params, parent }) {
    const currentAccessToken = (await parent()).token;
    if (currentAccessToken != null) {
        const song: Song = await getObjectJson(params.id, currentAccessToken, 'track');
        return song;
    }
    return null;
}