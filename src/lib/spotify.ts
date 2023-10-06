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