import { writable, type Writable } from "svelte/store";

export const accessToken : Writable<string | null>= writable(null);