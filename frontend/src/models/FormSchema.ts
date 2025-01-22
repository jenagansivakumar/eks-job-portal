import {z} from "zod"



export const FormSchema = z.object({
    username: z.string().min(2, {message: "Username must be at least 2 characters long"}).max(50, {message: "Username has to be less than 50 characters"}),
    password: z.string().min(5, {message: "Password must be at least 5 characters long"}).max(50, {message: "Password must be less than 50 characters"}),
    email: z.string().email(),
    name: z.string().min(2).max(50)
})
export const LoginSchema = z.object({
    username: z.string().min(2, {message: "Username must be at least 2 characters long"}).max(50, {message: "Username has to be less than 50 characters"}),
    password: z.string().min(5, {message: "Password must be at least 5 characters long"}).max(50, {message: "Password must be less than 50 characters"}),
})