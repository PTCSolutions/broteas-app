import type { User } from "@firebase/auth";
import { writable, type Writable } from "svelte/store";

export const authStore : Writable<{user: User | null, loading: boolean, data: unknown}> = writable({
    user: null,
    loading: true,
    data: {}
});