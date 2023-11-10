import { doc, setDoc, updateDoc, increment } from "firebase/firestore";
import { profileColours } from "./user";
import { db } from "./firebase";

export const codeLength = 5;

export function makeCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < codeLength) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export function validateCode(code: string) {
    return /^[A-Za0-9]*$/.test(code);
}

export async function newUser(user: { firstName: string, lastName: string, email: string, following: string[], followers: string[], username: string, uid: string }, code_user: string) {
    try {
        await setDoc(doc(db, "users", user.uid,),
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                following: user.following,
                followers: user.followers,
                username: user.username,
                // Profile colour is a random int between 0 and length of profile_colours list
                profile_colour: Math.floor(Math.random() * profileColours.length),
                invite_code: { code: makeCode(), times_used: 0 }
            }
        );
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    // Now mark invite code as used
    await updateDoc(doc(db, "users", code_user),
        {
            "invite_code.times_used": increment(1)
        }
    );
}