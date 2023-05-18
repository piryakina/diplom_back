import express from "express"
import morgan from "morgan"
import cors from "cors"
import userRouter from "./routers/user.router.js";
import articleRouter from "./routers/article.router.js";
import reportRouter from "./routers/report.router.js";

const server = express()

server.use(cors({origin:"http://localhost:4200", credentials:true}))
server.use(express.json())
server.use(morgan("dev"))
server.use(userRouter)
server.use(articleRouter)
server.use(reportRouter)

export default server
