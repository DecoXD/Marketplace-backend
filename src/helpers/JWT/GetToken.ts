import { Request } from "express";
import { HttpError } from "../../errors/HttpError";

export async function getToken(req:Request){
  const authorization = req.headers.authorization

  if(!authorization) throw new HttpError(500,'server error token')
  
  const token = authorization.split(' ')[1]

  return token
  
}