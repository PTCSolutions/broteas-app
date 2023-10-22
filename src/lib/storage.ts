import { uploadString, ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadProfilePicture(base64string: string, uid: string) {
    const storageRef = ref(storage, `profile_pictures/${uid}`);
    const uploadRef = await uploadString(storageRef, base64string, 'base64');
    const url: string = await getDownloadURL(uploadRef.ref);
    // Get currently stored images in localStorage
    const storedUrlMap = localStorage.getItem('profile_pic') == null ? {} : JSON.parse(localStorage.getItem('profile_pic')!);
    // Add new url to localStorage
    storedUrlMap[uid] = url;
    localStorage.setItem('profile_pic', JSON.stringify(storedUrlMap));
}

export async function getProfilePicture(uid: string | null | undefined): Promise<string | null> {
    if (uid) {
        // Get stored url for users profile pic in localStorafe
        const storedUrl = (localStorage.getItem('profile_pic')) == null ? null : JSON.parse(localStorage.getItem('profile_pic')!)[uid];
        if (storedUrl != null) {
            return storedUrl;
        }
        // If there is no stored url, get url from firebase, then add it to localhost
        else {
            try {
                const storageRef = ref(storage, `profile_pictures/${uid}`);
                const url = await getDownloadURL(storageRef);
                const storedUrlMap = localStorage.getItem('profile_pic') == null ? {} : JSON.parse(localStorage.getItem('profile_pic')!);
                storedUrlMap[uid] = url;
                localStorage.setItem('profile_pic', JSON.stringify(storedUrlMap));
                return url;
            } catch {
                return null;
            }
        }
    }
    return null;
}