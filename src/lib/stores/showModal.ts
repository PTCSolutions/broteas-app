import { writable, type Writable } from "svelte/store";

export const showModal : Writable<{search: boolean, newPost: boolean}>= writable({search: false, newPost: false});