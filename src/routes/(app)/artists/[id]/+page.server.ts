import { getArtistTopTracks, getObjectJson, type Artist, type Song, type Album, getArtistAlbums } from '$lib/spotify.js'
import { LASTFM_API_KEY } from '$env/static/private';

export async function load({ params, parent }) {
    const currentAccessToken = (await parent()).token;



    if (currentAccessToken != null) {
        const artist: Artist = await getObjectJson(params.id, currentAccessToken, 'artist');
        const albums: Album[] = await getArtistAlbums(params.id, currentAccessToken);
        const songs: Song[] = await getArtistTopTracks(params.id, currentAccessToken);
        const lastFMResponse = await fetch(
            `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist.name}&api_key=${LASTFM_API_KEY}&format=json`
        );
        const json = await lastFMResponse.json();
        return {
            artist: artist,
            songs: songs,
            albums: albums,
            json: json.artist,
        };
    }
    return null;
}