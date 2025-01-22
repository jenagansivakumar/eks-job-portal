import { Request, Response } from "express";
import { findJobById } from "./findJobById.js";
import { prisma } from "../../utils/prismaInit.js";
import { endpointHit } from "../../utils/endpointHit.js"



export const createJob = async(req: Request, res: Response) => {
    endpointHit()
    const {jobTitle, jobDescription} = req.body
    if (!jobTitle || !jobDescription){
        return res.status(400).json({message: "Title and description are required"})
    }

    try {
        const createdJob = await prisma.jobDetail.create({
            data: {

               jobTitle: jobTitle,
               jobDescription: jobDescription
            }
        })
    res.status(201).json(`${jobTitle} has been created!`)
    } catch (error){
        console.error(error.message)
        res.status(500).json({error: "Cannot create job"})
    }
    
}