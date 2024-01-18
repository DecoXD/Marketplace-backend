import { NextFunction,Response,Request} from "express";
import { HttpError } from "../../errors/HttpError";
import {JsonWebTokenError, decode,verify} from "jsonwebtoken";
import { getToken as getToken } from "./GetToken";

export async function VerifyToken(req:Request,res:Response,next:NextFunction){

const token = await  getToken(req)
const secret = process.env.APP_JWT_SECRET || ''
let decodedToken;
try {
  decodedToken = await verify(token,secret)
  next()

} catch (error) {
throw new JsonWebTokenError('invalid token')
  
}

}