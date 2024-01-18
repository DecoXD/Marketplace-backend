import { User } from "../models/User"


export interface UserAttributes {
    id: number,
    name: string,
    login: string,
    email: string,
    password: string,
    updatedAt: string,
    createdAt: string
}

export  interface RegisterData  {
  name:string , 
  email:string,
  login:string,
  password:string,
  confirmPassword:string
}

export interface LoginData{
  login:string,
  password:string,
}

export interface UserValidateProtocol<T>  {
  execute():Promise<void>,
  getUser(data:T):Promise< User| null>,
  userAlreadyExists():Promise<boolean | void>, 
}

export interface UserRegisterProtocol<T> extends UserValidateProtocol<RegisterData> {
  confirmPassword(data:T):boolean
}

export interface UserLoginProtocol<T> extends UserValidateProtocol<LoginData> {
  isValidPassword():Promise<boolean | void> 
}