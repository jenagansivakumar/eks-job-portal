import { Request, Response } from "express";
import { prisma } from "../../utils/prismaInit.js";




export const fetchAllJobs = async(req: Request, res: Response) => {
    try {
        const fetchedJobs = await prisma.jobDetail.findMany()
        res.status(200).json(fetchedJobs)
    } catch (error){
        res.status(500).json({error: "Cannot fetch jobs"})
    }
}