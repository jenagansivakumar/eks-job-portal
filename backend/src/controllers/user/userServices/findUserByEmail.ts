import { prisma } from "../../../utils/prismaInit.js"



export const findUserByEmail = async (email: string) => {
    return await prisma.userDetails.findUnique({
        where: {email}
    })
}