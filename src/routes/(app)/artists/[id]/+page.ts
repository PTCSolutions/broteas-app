import { getArtistTopTracks, getObjectJson, type Artist, type Song, type Album, getArtistAlbums } from '$lib/spotify.js'

export async function load({ params }) {
    const artist: Artist = await getObjectJson(params.id, 'artist');
    const albums: Album[] = await getArtistAlbums(params.id);
    const songs: Song[] = await getArtistTopTracks(params.id);
    return {
        artist: artist,
        songs: songs,
        albums: albums
    };
    return null;
}