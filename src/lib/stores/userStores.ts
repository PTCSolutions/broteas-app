import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { getUser, type User } from '$lib/user';

export const userStore: Writable<string | null> = writable(null);

export const userProfileStore: Readable<User | null> = derived(userStore, ($userStore, set) => {
    if ($userStore != null) {
        getUser($userStore).then((user: User | null) => set(user));
    }
});