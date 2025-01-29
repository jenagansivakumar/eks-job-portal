import express from "express"
import cors from "cors"
import { userRouter } from "./routes/userRoutes.js"
import { jobRouter } from "./routes/jobRoutes.js"
import { authRouter } from "./routes/authUser.js"
import { healthCheck } from "./controllers/healthCheck/healthCheck.js"



const app = express()
const port = 4000


app.use(express.json())
app.use(cors())
app.use("/users", userRouter)
app.use("/jobs", jobRouter)
app.use("/auth", authRouter )
app.use("/", healthCheck)





app.listen(port, ()=>{
    return console.log(`Server is running on port ${port}`)
})