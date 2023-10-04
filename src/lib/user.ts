export interface User {
    firstName: string;
    lastName: string;
    uid: string;
    email: string;
    following: Array<string>;
    followers: Array<string>;
}