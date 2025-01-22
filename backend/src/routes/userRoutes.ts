import { Router } from "express";
import { fetchAllUsers } from "../controllers/user/fetchAllUsers.js";
import { createUser } from "../controllers/auth/signUp.js";
import { deleteUser } from "../controllers/user/deleteUser.js";
import { updateUser } from "../controllers/user/updateUserDetails.js";




export const userRouter = Router()

userRouter.get("/users", fetchAllUsers)
userRouter.post("/users", createUser)
userRouter.delete("/users", deleteUser)
userRouter.put("/users", updateUser )