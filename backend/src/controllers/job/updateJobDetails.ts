import { Request, Response } from "express"
import { findJobById } from "./findJobById.js"
import { prisma } from "../../utils/prismaInit.js"



export const updateJobDetail = async(req: Request, res: Response) => {
    const {id, jobTitle, jobDescription} = req.body
    if (!id || !jobTitle || !jobDescription){
        return res.status(400).json({message: "Invalid details"})
    }

    const jobExists = await findJobById(id)

    if (!jobExists){
        return res.status(404).json({message: "Job doesn't exist"})
    }

    try {
        const updatedUser = await prisma.jobDetail.update({
            where: {id: Number(id)},
            data: {
                jobTitle,
                jobDescription
            }
        })
        res.status(200).json(`Job ID:${id} has been updated!`)
    } catch (error){
        res.status(500).json({error: "Cannot update job"})
    }

}