export interface User{
    email:string;
    password:string;
    repeatPassword?:string;
}

export interface LoginUser{
    uid:string;
    email:string;
}