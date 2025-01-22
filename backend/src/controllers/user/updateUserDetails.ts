import { Request, Response } from "express";
import {prisma} from "../../utils/prismaInit.js"
import { findUserById } from "./userServices/findUserById.js";



export const updateUser = async(req: Request, res: Response) => {
    console.log("Endpoint hit")
    const {id, email, name} = req.body
    if (!id || !email || !name){
        return res.status(400).json({message: "ID, Email and Name are required to update details"})
    }

    const userExists = await findUserById(id)

    if (!userExists){
        return res.status(404).json({message: "User does not exist"})
    }

    try {
        const updatedUser = await prisma.userDetails.update({
            where: {id: Number(id)},
            data: {
                name,
                email
            }
        })
        res.status(200).json(`Name has been updated to ${name} and email has been updated ${email}`)
    } catch (error){
        console.error(error.message)
        res.status(500).json({error: "Cannot update user details "})
    }
}