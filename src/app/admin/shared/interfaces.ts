export interface User {
    email: string;
    password: number | string,
    returnSecureToken?: boolean
}

export interface FbAuthResponse {
    idToken: string;
    expiresIn: number
}