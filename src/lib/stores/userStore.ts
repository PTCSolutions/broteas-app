import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { getUser, type User } from '$lib/user';

interface UserStore {
    user: User | null;
    loading: boolean;
}
const initialUserStore : UserStore = {user: null, loading: true}

export const userStore : Writable<string | null> = writable(null);

export const userProfileStore: Readable<UserStore | null> = derived(userStore, ($userStore, set) => {
    if ($userStore != null) {
        getUser($userStore).then((user: User | null) => set({user: user, loading: false}));
    }
}, initialUserStore);