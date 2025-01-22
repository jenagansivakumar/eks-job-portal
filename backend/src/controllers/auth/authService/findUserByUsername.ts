import { prisma } from "../../../utils/prismaInit.js"




export const findUserByUsername = async (username: string) => {
    return await prisma.userDetails.findUnique({
        where: {username: username}
    })
}