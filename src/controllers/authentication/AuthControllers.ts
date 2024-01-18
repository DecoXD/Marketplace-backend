
import { NextFunction, Request, Response } from 'express';
import {LoginData, RegisterData} from '../../interfaces/AuthInterfaces'
import { User } from '../../models/User';
import {genSaltSync,hashSync} from 'bcrypt'
import { HttpError } from '../../errors/HttpError';
import { FormValidate, LoginValidate, RegisterValidate } from '../../auth';
import { CreateToken } from '../../helpers/JWT/CreateToken';



function genHashPassword(password:string):string{
  const salt = genSaltSync(10)
  const hashPassword = hashSync(password,salt)
  return hashPassword
}


export async function register(req: Request, res: Response, next: NextFunction) {
  const {
    name,
    login,
    email,
    password,
    confirmPassword
  }: RegisterData = req.body;
    
  const userData:RegisterData = {
    name,
    login,
    email,
    password,
    confirmPassword
  }

  try {
    const dataValidate = new RegisterValidate(userData) 
    const formValidate = new FormValidate(userData) 
    await formValidate.execute()
    await dataValidate.execute()

    const hashPassword = genHashPassword(password)
    const data = {
      
      name:userData.name,
      login:userData.login,
      email:userData.email,
      password:hashPassword
    }

    const newUser = await User.create(data)

    const token = await CreateToken(newUser.id)
    res.status(200).json({message:'Success! your account are created.',user:newUser,token})
    return
    
  } catch (error) {
      if(error instanceof HttpError){
        res.status(error.statusCode).json({message:error.message})
      } else{
        
        res.status(500).json({message:'internal server error'})
      }
  }
  

  

} 

export async function login(req:Request,res:Response,next:NextFunction){
  const {
    login,
    password,
   
  }: RegisterData = req.body;
    
  const userData:LoginData = {
    login,
    password
  }

  try {
    const dataValidate = new LoginValidate(userData)
    const formValidate = new FormValidate(userData)
    await formValidate.execute()
    await dataValidate.execute()

    //criar token
    const user = await  dataValidate.getUser(userData)

    const token = await CreateToken(user!.id )
    
    res.status(200).json({message:"Sucesso! você está logado",token})
    return

  } catch (error) {
    if(error instanceof HttpError){
      res.status(error.statusCode).json({message:error.message})
    } else{
      
      res.status(500).json({message:'internal server error'})
    }
  }


} 