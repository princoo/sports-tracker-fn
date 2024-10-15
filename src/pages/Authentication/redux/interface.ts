export interface LoginResponse {
    access_token: string
}
// export interface LoginRequest {
//     username: string,
//     password: string
// }
export interface LoginPayload {
    username: string,
    password: string,
};
export interface SignUpPayload{
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    phone: number,
    nationality: string,
    gender: Gender,
    password: string,
};

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}
