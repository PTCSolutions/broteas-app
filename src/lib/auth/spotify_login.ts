import type { SpotifyUser } from "$lib/spotify_user";
import { addRefresh, getRefresh } from "$lib/user";

export async function spotifyLoginFromRefresh(uid: string, url: URL, clientId: string, clientSecret:string): Promise<SpotifyUser | null> {
    // get stored refresh token from firebase
    const refresh_token = await getRefresh(uid);
    console.log("Acces token", refresh_token)
    let access_token;
    // If refresh saved
    if (refresh_token) {
        // Get access_token using refresh
        const response = await fetch("https://accounts.spotify.com/api/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + btoa(`${clientId}:${clientSecret}`)
                },
                body: `grant_type=refresh_token&code=${refresh_token}&redirect_uri=http://${url.host}`
            });
        console.log("Acces token", response.json())
        // If call succeeds update access token and refresh token in firebase
        if (response.status == 200) {
            const data = await response.json()
            access_token = data.access_token;
            await addRefresh(uid, data.refresh_token);
            // If refresh token invalid, return null
        } else {
            return null;
        }
        // Now get user info using access_token
        const user_response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                "Authorization": `Bearer  ${access_token}`
            },
        },);
        // If succesfull return spotify user
        if (user_response.status == 200) {
            const spotify_user = await user_response.json();
            if (spotify_user.images != undefined) {
                return { uid: spotify_user.id, name: spotify_user.display_name, img: spotify_user.images[0].url, access_token: access_token };
            } else {
                return { uid: spotify_user.id, name: spotify_user.display_name, img: null, access_token: access_token };
            }

        }
        return null
    }
    return null;
}

export async function spotifyLoginFromCode(uid: string, url: URL, clientId: string, clientSecret:string): Promise<SpotifyUser | null> {
    // Generate access_token and refresh_token from code
    const response = await fetch("https://accounts.spotify.com/api/token",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(`${clientId}:${clientSecret}`)
        },
        body: `grant_type=authorization_code&code=${url.searchParams.get('code')}&redirect_uri=http://${url.host}/account`
    });
    const token = await response.json();
    const access_token = token.access_token;
    const refresh_token = token.refresh_token;
    await addRefresh(uid, refresh_token);
    // Now get user info using access_token
    const user_response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            "Authorization": `Bearer  ${access_token}`
        },
    },);
    console.log()
    // If succesfull return spotify user
    if (user_response.status == 200) {
        const spotify_user = await user_response.json();
        if (spotify_user.images != undefined) {
            return { uid: spotify_user.id, name: spotify_user.display_name, img: spotify_user.images[0].url, access_token: access_token };
        } else {
            return { uid: spotify_user.id, name: spotify_user.display_name, img: null, access_token: access_token };
        }
    }
    return null
}


