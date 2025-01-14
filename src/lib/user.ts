import { doc, getDoc, DocumentSnapshot, updateDoc, arrayUnion, arrayRemove, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

type ProfileColour = "blue" | "cream" | "purple" | "rose";
export const profileColours: ProfileColour[] = ["blue", "cream", "purple", "rose"];


export interface User {
    firstName: string;
    lastName: string;
    uid: string;
    username: string;
    email: string;
    following: Array<string>;
    followers: Array<string>;
    profile_colour: ProfileColour;
    invite_code: {
        code: string,
        times_used: number,
    },
}

export async function updateUser(firstName: string, lastName: string, uid: string) {
    try {
        await updateDoc(doc(db, "users", uid),
            {
                firstName: firstName,
                lastName: lastName,
            }
        );
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getUser(uid: string): Promise<User | null> {
    if (uid != null && uid != "") {
        const docSnapshot: DocumentSnapshot = await getDoc(doc(db, "users", uid));
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const user: User = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                following: data.following,
                followers: data.followers,
                uid: uid,
                username: data.username,
                // Modulo profile color integer to ensure it is not out of bounds for 
                // profile colours list
                profile_colour: profileColours[data.profile_colour % profileColours.length],
                invite_code: data.invite_code,
            };
            return user;
        }
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
    } else {
        throw "The person you entered doesn't exist";
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
    } else {
        throw "The person you entered doesn't exist";
    }
}

// Get users whose names contain specific letters of search
async function searchForUsers(searchText: string | null): Promise<User[]> {
    // Empty users array
    const users: User[] = [];
    if (searchText != null && searchText != "") {
        // Make search text lower case as all usernames are lower case
        searchText = searchText.toLowerCase();
        // NB: This is a pretty lame text search but we will have to use a THIRD party firebase extension to get 
        // better text querying. lack of good text search is a KNOWN issue with firebase querying
        const q = query(collection(db, "users"),
            where("username", ">=", searchText), where("username", "<=", searchText + '\uf8ff'));
        // For each of the queries add user from the returned documents
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const user: User = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    following: data.following,
                    followers: data.followers,
                    uid: doc.id,
                    username: data.username,
                    // Modulo profile color integer to ensure it is not out of bounds for 
                    // profile colours list
                    profile_colour: profileColours[data.profile_colour % profileColours.length],
                    invite_code: data.invite_code
                };
                users.push(user);
            }
            );
        }
    }
    return users;

}

export async function searchForOtherUsers(searchText: string, user: User | null) {
    if (user != null) {
        const returnedUsers = await searchForUsers(searchText);
        let users = returnedUsers;
        if (returnedUsers.length > 0) {
            users = returnedUsers.filter((returnedUser: User) => returnedUser.uid != user.uid);
        }
        return users;
    }
    return [];
}

export async function searchForUsersToFollow(searchText: string, user: User | null): Promise<User[]> {
    if (user != null) {
        const returnedUsers = await searchForUsers(searchText);
        let users = returnedUsers;
        if (returnedUsers.length > 0) {
            users = returnedUsers.filter((returnedUser: User) => returnedUser.uid != user.uid && !user.following.includes(returnedUser.uid),);
        }
        return users;
    }
    return [];
}

export async function searchForUsersToUnfollow(searchText: string, user: User | null): Promise<User[]> {
    if (user != null) {
        const returnedUsers = await searchForUsers(searchText);
        let users = returnedUsers;
        if (returnedUsers.length > 0) {
            users = returnedUsers.filter((returnedUser: User) => returnedUser.uid != user.uid && user.following.includes(returnedUser.uid),);
        }
        return users;
    }
    return [];
}

export async function getUserNames(): Promise<string[]> {
    // Empty username array
    const usernames: string[] = [];
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.username != undefined) {
            usernames.push(data.username);
        }
    }
    );
    return usernames;
}

export async function getRefresh(uid: string): Promise<string | null> {
    if (uid) {
        const docSnapshot: DocumentSnapshot = await getDoc(doc(db, "users", uid));
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data.refresh_token) {
                return data.refresh_token
            } else {
                return null;
            }
        }
    }
    return null;
}

export async function addRefresh(uid: string, refresh_token: string) {
    try {
        await updateDoc(doc(db, "users", uid),
            {
                refresh_token: refresh_token
            }
        );
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

