export interface Song {
    album: {
        id: string,
        images: [
            {
                url: string,
            }
        ],
        name: string,
    },
    artists: [
        {
            id: string,
            images: [
                {
                    url: string,
                }
            ],
            name: string,
        }
    ],
    duration_ms: number,
    external_urls: {
        spotify: string
    }
    href: string,
    id: string,
    name: string,
    type: string,
}

export interface Artist {
    external_urls: {
        spotify: string
    },
    followers: {
        href: string,
        total: number,
    },
    genres: [],
    href: string,
    id: string,
    images: [
        {
            url: string,
        }
    ],
    name: string,
    popularity: number,
    uri: string
    type: string,
}

export interface Album {
    album_type: string,
    total_tracks: number,
    available_markets: [string],
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    images: [
        {
            url: string,
        }
    ],
    name: string,
    release_date: string,
    release_date_precision: string,
    restrictions: {
        reason: string
    },

    uri: string,
    artists: [
        {
            external_urls: {
                spotify: string
            },
            href: string,
            id: string,
            name: string,
            type: string,
            uri: string
        }
    ],
    tracks: {
        href: string
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: [
            {
                artists: [
                    {
                        external_urls: {
                            spotify: string
                        },
                        href: string,
                        id: string,
                        name: string,
                        type: string,
                        uri: string
                    }
                ],
                available_markets: [string],
                disc_number: number,
                duration_ms: number,
                explicit: boolean,
                external_urls: {
                    spotify: string
                },
                href: string,
                id: string,
                is_playable: boolean,
                linked_from: {
                    external_urls: {
                        spotify: string
                    },
                    href: string,
                    id: string,
                    type: string,
                    uri: string
                },
                restrictions: {
                    reason: string
                },
                name: string,
                preview_url: string,
                track_number: number,
                type: string,
                uri: string,
                is_local: boolean
            }
        ]
    },
    copyrights: [
        {
            text: string,
            type: string
        }
    ],
    external_ids: {
        isrc: string,
        ean: string,
        upc: string
    },
    genres: [string],
    label: string,
    popularity: number,
    type: string,
}

// Get the json info of the song in the post widget
export async function getObjectJson(objectId: string, accessToken: string | null, objectType: string) {
    console.log(`access token: ${accessToken}`)
    if (accessToken != null) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/${objectType}s/${objectId}`, {
                method: 'GET',
                headers: {
                    // Accept: 'application/json'
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.json();
        } catch (error) {
            return '';
        }
    }
}

export async function getArtistTopTracks(artistId: string, accessToken: string): Promise<Array<Song>> {
    const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=GB`,
        {
            method: 'GET',
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
            // body: JSON.stringify({ market: 'GB' })
        }
    );
    if (response.status == 200) {
        const json = await response.json();
        const songs: Array<Song> = json.tracks;
        return songs;
    } else {
        throw Error;
    }
}