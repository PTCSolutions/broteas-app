import { derived, writable, type Readable, type Writable, get } from 'svelte/store';
import { getUser, type User } from '$lib/user';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '$lib/firebase';

interface UserStore {
    user: User | null;
    loading: boolean;
}
// The initial value of userProfileStore
const initialUserStore: UserStore = { user: null, loading: true }

// Store containing user's uid. Null if they are logged out
export const userStore: Writable<string | null> = writable(null);
// Store containing a boolean. This boolean is toggled when something in the user
// document in firestore changes. 
const userInfoChangeStore: Writable<boolean> = writable(false);

// The userProfile store below is 'derived'. This means it auto updates whenever the stores
// it depends on change. It currently updates when 
// the user logs in/out (userStore changes) OR 
// when something changes in firebase (userInfoChangeStore is toggled)
// NOTE: It is read-only and so cant be manipulated directly
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const userProfileStore: Readable<UserStore | null> = derived([userStore, userInfoChangeStore], ([$userStore, $userInfoChangeStore], set) => {
    if ($userStore != null) {
        getUser($userStore).then((user: User | null) => set({ user: user, loading: false }));
    }
}, initialUserStore);

// Read userInfo from firestore in a stream. Toggle boolean
// when something in firestore changes
let userInfoUnsuscribeCallback;
export const subscribeToUser = () => {
    const uid: string | null = get(userStore);
    if (uid != null) {
        const docRef = doc(db, "users", uid);
        userInfoUnsuscribeCallback = onSnapshot(
            docRef,
            (doc) => {
                if (doc.exists()) {
                    userInfoChangeStore.update((bool: boolean) => !bool);
                }
            },
            (error) => {
                console.warn("Couldn't update snapshot, maybe the user is logged out?", error);
            }
        );
        return userInfoUnsuscribeCallback;
    };
}
