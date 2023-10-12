import { getArtistTopTracks, getObjectJson, type Artist, type Song } from '$lib/spotify.js'
import { accessToken } from '$lib/stores/accessTokenStore.js';
import { get } from 'svelte/store';

export async function load({ params }) {
    const currentAccessToken = get(accessToken);
    if (currentAccessToken != null) {
        const artist: Artist = await getObjectJson(params.id, currentAccessToken, 'artist');
        const songs: Song[] = await getArtistTopTracks(params.id, currentAccessToken);
        return {
            artist : artist,
            songs : songs
        };
    }
    return null;
}