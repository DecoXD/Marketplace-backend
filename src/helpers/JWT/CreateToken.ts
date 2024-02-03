import jwt from 'jsonwebtoken';
import { HttpError } from '../../errors/HttpError';

export async function CreateToken(userId:number | null) {
  if(!userId) throw new HttpError(422,'something as be wrong')
  const secret = process.env.APP_JWT_SECRET || ''
  const payload = {id:userId}
  try {
    
    
    const token = jwt.sign(payload,secret)
    return token
  } catch (error) {
    throw new HttpError(500,'server error')
  }
}