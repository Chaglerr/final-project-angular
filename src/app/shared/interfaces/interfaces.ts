export interface User{
    email: string,
    password: string,
    nickname: string,
    posts: IPost[],
    rating: IRating,
}

 export interface IRating{
    rating: number,
    ratedNum: number
 }


export interface IUser extends User{
    id: string
}

export interface data{
    users: IUser[],
    currentUserId: string
}

export interface posts{
    academicState: string,
    subjectSelect: string,
    availabilitySelect: string,
    locationSelect: string,
    languageSelect: string,
    priceSelect: string,
    description: string,
}

export interface IPost{
    id: string,
    content: string,
    userId: string,
}
