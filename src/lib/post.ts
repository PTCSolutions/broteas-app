import type { User } from "./user";

export interface Post {
    postId: string;
    creator: User;
    date: Date;
    objectId: string;
    likes: Array<string>;
    comments: Array<PostComment>;
}

interface PostComment {
    commentor: User;
    text: string;
    date: Date;
}