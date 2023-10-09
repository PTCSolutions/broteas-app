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
    href: string,
    id: string,
    name: string,
}

// Get the json info of the song in the post widget
export async function getSongJson(objectId: string, accessToken: string | null) {
    console.log(`access token: ${accessToken}`)
    if (accessToken != null) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${objectId}`, {
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