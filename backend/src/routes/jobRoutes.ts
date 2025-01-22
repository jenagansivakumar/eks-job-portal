import { Router } from "express";
import { createJob } from "../controllers/job/createJob.js";
import { fetchAllJobs } from "../controllers/job/getAllJobs.js";
import { updateJobDetail } from "../controllers/job/updateJobDetails.js";
import { deleteJob } from "../controllers/job/deleteJob.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { fetchJobById } from "../controllers/job/fetchJobById.js";



export const jobRouter = Router()


jobRouter.post("/create", createJob)
jobRouter.get("/fetch", fetchAllJobs)
jobRouter.put("/update", updateJobDetail)
jobRouter.delete("/delete", deleteJob)
jobRouter.get("/fetch/:id", fetchJobById)