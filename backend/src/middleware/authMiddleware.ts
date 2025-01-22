import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const SECRET_KEY = process.env.JWT_SECRET

    if (!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({message: "Unauthorised token"})
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, SECRET_KEY );
        (req as any).user = decoded
        next()
    } catch (error){
        res.status(403).json({message: "Invalid token"})
    }
}