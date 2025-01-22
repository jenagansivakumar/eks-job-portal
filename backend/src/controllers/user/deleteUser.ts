import { Request, Response } from "express";
import { prisma } from "../../utils/prismaInit.js";
import { findUserById } from "./userServices/findUserById.js";



export const deleteUser = async(req: Request, res: Response) => {
    const {id} = req.body
    if (!id){
        return res.status(400).json({message: "ID is required"})
    }

    const userExists = await findUserById(id)

    if (!userExists){
        return res.status(404).json({message: "User does not exist"})
    }

    try {
        const deletedUser = await prisma.userDetails.delete({
            where: {id: Number(id)}
        })
        res.status(200).json(`User with ID ${id} has been deleted`)
    } catch (error){
        console.error(error.message)
        res.status(500).json({error: "Cannot delete user"})
    }
}