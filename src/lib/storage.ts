import { uploadString, ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadProfilePicture(base64string: string, uid: string) {
    const storageRef = ref(storage, `profile_pictures/${uid}`);
    await uploadString(storageRef, base64string, 'base64');
}

export async function getProfilePicture(uid: string | null | undefined): Promise<string | null> {
    if (uid) {
        const storageRef = ref(storage, `profile_pictures/${uid}`);

        try {
            const url = await getDownloadURL(storageRef)
            return url;
        } catch {
            return null;
        }
    }
    return null;
}