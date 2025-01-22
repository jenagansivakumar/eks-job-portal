import { prisma } from "../../utils/prismaInit.js"



export const findJobById = async(id: number)=>{
    return prisma.jobDetail.findUnique({
        where: {id: Number(id) }
    })
}