export interface UserInput{
    name: string;
    email: string;
    password: string;
    cellphone: number;
    adress: string;
}

export interface UserLogInResponse{
    user: {
        name: string;
        email: string;
        adress: string;
        token: string;
        role: string;
    }
}

export interface UserLogin{
    email: string;
    password: string;
}