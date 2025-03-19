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
        cellphone: number;
        adress: string;
        token: string;
        role: string;
    }
}