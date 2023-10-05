import { doc, setDoc, getDoc, DocumentSnapshot } from "firebase/firestore";
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

export async function getUser(uid: string) : Promise<User | null> {
    const docSnapshot: DocumentSnapshot = await getDoc(doc(db, "users", uid));
    const data = docSnapshot.data();
    if (data != undefined) {
        const user : User = {
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