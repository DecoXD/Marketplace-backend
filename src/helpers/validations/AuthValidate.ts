import { Op } from "sequelize"
import { User } from "../../models/User"
import { LoginData, UserLoginProtocol, RegisterData, UserRegisterProtocol} from "../../interfaces/AuthInterfaces"
import { HttpError } from "../../errors/HttpError"
import { compareSync } from "bcrypt"


//I MUST HAVE A GETTOKEN AND CHECKTOKEN METHODS IN BOTH, BECAUSE I NEED TO KNOW IF USER  ALREADY AUTHENTICATED 

export  class RegisterValidate implements UserRegisterProtocol<RegisterData> {
  constructor(private userData:RegisterData){
    
  }

  async execute(){  
    await this.userAlreadyExists()
    this.confirmPassword(this.userData)
  }

  async getUser({login,email}:RegisterData): Promise<User | null> {
   try {
    const user = await User.findOne(
      {where:{
      [Op.or]:[
        {login:login},
        {email:email}
      ]
    }})
    return user
   } catch (error) {
    throw new HttpError(500,'server error')
   }

   
  }

  async userAlreadyExists ():Promise<void>{
    const user = await this.getUser(this.userData)
    if(!user){
      return
    }
    throw new HttpError(409,'Login or Email is Invalid or Already Taken')
    
  } 

  
  //initially i dont need this, but if i want to implement a new funcionality to check the password, i dont need to change all code , i only need to change this functionality.
  confirmPassword ({password,confirmPassword}:RegisterData):boolean{
    if(password !== confirmPassword){
      throw new HttpError(422,'please, confirm your password correctly.')
    }
    return true
  } 

}

export class LoginValidate implements UserLoginProtocol<LoginData> {
  constructor(private userData:LoginData){
  }

  async execute(){  
    await this.userAlreadyExists()
    await this.isValidPassword()
  }

  async getUser({login}:LoginData): Promise<User| null> {
    try {
     const user = await User.findOne({raw:true,where:{
       [Op.or]:[
         {login:login},
       ]
     }})
     if(!user) throw new HttpError(422,'incorrect data.')
     return user
    } catch (error) {
     
     throw new HttpError(500,'server error')
    }
 
    
   }


  async userAlreadyExists ():Promise<boolean | void>{

    const user = await this.getUser(this.userData)

    if(user){
      return true
    }
    throw new HttpError(422,'incorrect data.')
   
    
  } 
  
  //initially i dont need this, but if i want to implement a new funcionality to check the password, i dont need to change all code , i only need to change this functionality.
  async isValidPassword(): Promise<boolean | void> {
    const user = await this.getUser(this.userData)

    const comparedPassword = compareSync(this.userData.password,user!.password)

    if(comparedPassword) return true
    
    throw new HttpError(422,'incorrect data.')
   
  }

}

