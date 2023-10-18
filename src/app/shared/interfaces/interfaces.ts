export interface User{
    email: string,
    password: string,
    nickname: string,
    phone: string,
}

export interface IUser extends User{
    id: string
}