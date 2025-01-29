import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck/healthCheck.js";


const healthRouter = Router()


healthRouter.get("/health", healthCheck)