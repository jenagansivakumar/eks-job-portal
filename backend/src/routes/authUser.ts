import { Router } from "express";
import { createUser } from "../controllers/auth/signUp.js";
import { userLogin } from "../controllers/auth/signIn.js";



export const authRouter = Router()

authRouter.post("/signup", createUser)
authRouter.post("/login", userLogin )