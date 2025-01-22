import { Request, Response } from "express";
import { findJobById } from "./findJobById.js";
import { prisma } from "../../utils/prismaInit.js";





export const deleteJob = async (req: Request, res: Response) => {
    console.info("Hit endpoint")
    const {id} = req.body
    if (!id){
        return res.status(400).json({message: "ID is required"})
    }

    const jobExists = await findJobById(id)
    if (!jobExists){
        return res.status(404).json({message: "Job doesn't exist"})
    }

    try {
        const deletedJob = await prisma.jobDetail.delete({
            where: {id: Number(id)}
        })
        res.status(200).json(`Deleted job id: ${id}`)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: "Cannot delete user"})
    }
}