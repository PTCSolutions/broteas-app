import type { SpotifyUser } from "$lib/spotify_user";
import { writable, type Writable } from "svelte/store";

export const spotifyUser: Writable<SpotifyUser | null> = writable(null);
