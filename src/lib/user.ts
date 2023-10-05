import { doc, setDoc } from "firebase/firestore";
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