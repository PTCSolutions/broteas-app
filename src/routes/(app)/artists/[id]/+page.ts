import { getArtistTopTracks, getObjectJson, type Artist, type Song, type Album, getArtistAlbums } from '$lib/spotify.js'

export async function load({ params, parent }) {
    const currentAccessToken = (await parent()).token;
    if (currentAccessToken != null) {
        const artist: Artist = await getObjectJson(params.id, currentAccessToken, 'artist');
        const albums: Album[] = await getArtistAlbums(params.id, currentAccessToken);
        const songs: Song[] = await getArtistTopTracks(params.id, currentAccessToken);
        return {
            artist: artist,
            songs: songs,
            albums: albums
        };
    }
    return null;
}