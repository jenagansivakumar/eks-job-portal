import { Request, Response } from "express";
import {prisma} from "../../utils/prismaInit.js"
import bcrypt from "bcryptjs"
import { findUserById } from "../user/userServices/findUserById.js";
import { findUserByEmail } from "../user/userServices/findUserByEmail.js";
import { endpointHit } from "../../utils/endpointHit.js";
import { findUserByUsername } from "./authService/findUserByUsername.js";




export const createUser = async (req: Request, res: Response) => {
    endpointHit()
    const {email, name, username, password} = req.body
    if (!email || !name || !username || !password){
        return res.status(400).json({message: "All fields are required to create an account"})
    }

    const userExists = await findUserByUsername(username)

    if (userExists){
        return res.status(400).json({message: "User already exists"})
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    try {
        const createdUser = await prisma.userDetails.create({
            data: {
                email,
                name,
                username,
                password: hashedPassword
            }
        })
        res.status(200).json(`${username} has been successfully created`)
    } catch (error){
        console.error(error.message)
        res.status(500).json({error: "Cannot create user"})
    }
}