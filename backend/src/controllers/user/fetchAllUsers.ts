import { Request, Response } from "express";
import { prisma } from "../../utils/prismaInit.js"




export const fetchAllUsers = async(req: Request, res: Response)=> {
    console.log("fetch endpoint hit")
    try{
        const fetchedUsers = await prisma.userDetails.findMany()
        if (fetchedUsers.length === 0){
            return res.status(404).json({message: "User list is empty"})
        }
        res.status(200).json(fetchedUsers)
    } catch (error){
        console.error(error.message)
        res.status(500).json({error: "Cannot fetch users"})
    }
}