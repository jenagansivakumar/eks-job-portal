import {z} from "zod"




 export const JobSchema = z.object({
    id: z.number().optional(),
    jobTitle : z.string(),
    jobDescription: z.string()
})


export type Job = z.infer<typeof JobSchema>