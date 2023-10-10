import { derived, writable, type Readable } from 'svelte/store';
import { getUser, type User } from '$lib/user';

export const userStore = writable({ uid: null, loading: true });

export const userProfileStore: Readable<User | null> = derived(userStore, ($userStore, set) => {
    if ($userStore.uid != null) {
        getUser($userStore.uid).then((user: User | null) => set(user));
    }
});