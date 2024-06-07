export interface User {
    email: string;
    password: number | string;
    returnSecureToken?: boolean;
}

export interface FbAuthResponse {
    idToken: string;
    expiresIn: number;
}


export interface FbCreateResponse {
    name?: string;
}

export interface Post {
    id?: string;
    title: string;
    text: string;
    date: Date;
}