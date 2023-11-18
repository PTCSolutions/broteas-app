import type { ObjectType } from "./post";
import { DocumentSnapshot, getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export interface NewsMeta {
    url: string;
    title: string;
    description: string;
    domain: string;
    img: string;
    favicon: string;
}

// Get the json info of the song in the post widget
export async function getNewsJSON(objectId: string, objectType: ObjectType): Promise<NewsMeta | undefined> {
    if (objectType == "news") {
        const docSnapshot: DocumentSnapshot = await getDoc(doc(db, "news", objectId));
        if (docSnapshot.exists()) {
            const data = docSnapshot.data() as NewsMeta;
            return data
        }
    }
}