import { Request, Response } from "express";
import { prisma } from "../../../utils/prismaInit.js";



export const findUserById = async(id: number) => {
    return await prisma.userDetails.findUnique({
        where: {id}
    })
}