import { Request, Response } from "express";
import { findJobById } from "./findJobById.js";




export const fetchJobById = async (req: Request, res: Response) => {
    const{id} = req.params
    if (!id){
        return res.status(400).json({message: "ID is empty"})
    }

    const idInt = parseInt(id)
    
    const jobIdExists = await findJobById(idInt)
    
    if (!jobIdExists){
        return res.status(404).json({message: "Job cannot be found"})
    }
    
    try {
        res.status(200).json(jobIdExists)
    } catch (error){
        res.status(500).json({message: "An Internal Error Has Occurred"})
    }



}