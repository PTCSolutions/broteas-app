import { doc, setDoc, getDoc, DocumentSnapshot, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import { db } from "./firebase";

export interface User {
    firstName: string;
    lastName: string;
    uid: string;
    email: string;
    following: Array<string>;
    followers: Array<string>;
}

export async function newUser(user: User) {
    try {
        await setDoc(doc(db, "users", user.uid,),
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                following: user.following,
                followers: user.followers,
            }
        );
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getUser(uid: string): Promise<User | null> {
    const docSnapshot: DocumentSnapshot = await getDoc(doc(db, "users", uid));
    const data = docSnapshot.data();
    if (data != undefined) {
        const user: User = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            following: data.following,
            followers: data.followers,
            uid: uid
        };
        return user;
    }
    return null;
}

export async function followUser(follower: string, followed: string) {
    // Check if the followed really does exist
    const docSnapshot: DocumentSnapshot = await getDoc(doc(db, "users", followed));
    if (docSnapshot.exists()) {
        // First add the follower to the followed's "Followers"
        try {
            await updateDoc(doc(db, "users", followed), {
                followers: arrayUnion(follower)
            });
        } catch (error) {
            console.log(error);
        }

        // Now add the followed to the follower's "Following"
        try {
            await updateDoc(doc(db, "users", follower), {
                following: arrayUnion(followed)
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export async function unfollowUser(follower: string, followed: string) {
    // Check if the followed really does exist
    const docSnapshot: DocumentSnapshot = await getDoc(doc(db, "users", followed));
    if (docSnapshot.exists()) {
        // First remove the follower from the followed's "Followers"
        try {
            await updateDoc(doc(db, "users", followed), {
                followers: arrayRemove(follower)
            });
        } catch (error) {
            console.log(error);
        }
        // Now remove the followed from the follower's "Following"
        try {
            await updateDoc(doc(db, "users", follower), {
                following: arrayRemove(followed)
            });
        } catch (error) {
            console.log(error);
        }
    }
}