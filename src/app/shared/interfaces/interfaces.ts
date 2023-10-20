export interface User{
    email: string,
    password: string,
    nickname: string,
    posts: string[],
}

export interface IUser extends User{
    id: string
}

export interface data{
    users: IUser[],
    currentUserId: string
}

export interface posts{
    levelSelect: '',
    subjectSelect: '',
    availabilitySelect: '',
    locationSelect: '',
    languageSelect: '',
    priceSelect: '',
    description: '',
}