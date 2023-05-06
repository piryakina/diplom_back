import {Router} from "express"
import errorHandlerMiddleware from "../middlewares/errorHandler.middleware.js"

const userRouter = new Router()

userRouter.post("/login", null)
userRouter.post("/registration", null)

userRouter.use(errorHandlerMiddleware)
