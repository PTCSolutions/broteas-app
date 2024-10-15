export interface SpotifyUser {
    uid: string;
    name: string;
    img: string | null;
    access_token: string;
}

import { getRefresh } from "$lib/user";

export async function getRecentlyPlayed(uid: string, clientId: string, clientSecret: string): Promise<SpotifyUser | null> {
    // get stored refresh token from firebase
    const refresh_token = await getRefresh(uid);
    let access_token;
    // If refresh saved
    if (refresh_token) {
        console.log(refresh_token);
        // Get access_token using refresh
        const response = await fetch("https://accounts.spotify.com/api/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + btoa(`${clientId}:${clientSecret}`)
                },
                body: `grant_type=refresh_token&refresh_token=${refresh_token}`
            });
        // If call succeeds update access token 
        if (response.status == 200) {
            const data = await response.json()
            console.log("DAta is ", data);
            access_token = data.access_token;
            // If refresh token invalid, return null
        } else {
            console.log("Refresh token invalid")
            return null;
        }
        // Now get user info using access_token
        const user_response = await fetch("https://api.spotify.com/v1/me/player/recently-played", {
            headers: {
                "Authorization": `Bearer  ${access_token}`
            },
        },);
        // If succesfull return spotify user
        if (user_response.status == 200) {
            const json = await user_response.json();
            // if (spotify_user.images != undefined) {
            //     return { uid: spotify_user.id, name: spotify_user.display_name, img: spotify_user.images[0].url, access_token: access_token };
            // } else {
            //     return { uid: spotify_user.id, name: spotify_user.display_name, img: null, access_token: access_token };
            // }
            console.log("Recently played:" + json);
            return json;
        }
        console.log(user_response.status)
        return null
    }
    console.log("No refresh token in Firebase")
    return null;
}