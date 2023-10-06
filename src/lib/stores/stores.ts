import type { User } from "$lib/user";
import { writable, type Writable } from "svelte/store";

export const userStore: Writable<User | null> = writable(null);