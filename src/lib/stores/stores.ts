import { writable, type Writable } from "svelte/store";

export const uid: Writable<string> = writable("");