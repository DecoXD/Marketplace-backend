import { Router } from "express";
import { login, register } from "../controllers";
import { VerifyToken } from "../helpers/JWT/VerifyToken";

export const router = Router()


router.post("/register",register)
router.post("/login",login)




