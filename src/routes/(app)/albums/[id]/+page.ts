import { getObjectJson, type Album } from '$lib/spotify.js'

export async function load({ params, parent }) {
    const currentAccessToken = (await parent()).token;
    if (currentAccessToken != null) {
        const album: Album = await getObjectJson(params.id, currentAccessToken, 'album');
        return album;
    }
    return null;
}