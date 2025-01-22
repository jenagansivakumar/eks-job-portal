import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient


const createPrismaClient = async()=> {
    const primaryUrl = process.env.DATABASE_URL
    const fallbackUrl = process.env.DATABASE_URL_FALLBACK
    try {
        prisma = new PrismaClient({
            datasources: { db: { url: primaryUrl } }
        });
        await prisma.$connect()
        console.log("Connected to primary database")
    } catch (error) {
        console.log("Primary database connection failed, trying fallback...");
        prisma = new PrismaClient({
            datasources: { db: { url: fallbackUrl  } }
        });
        await prisma.$connect()
        console.log(fallbackUrl)
        console.log("Connected to fallback database")
    }

}

createPrismaClient()


export {prisma}