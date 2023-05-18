import {Router} from "express"
import errorHandlerMiddleware from "../middlewares/errorHandler.middleware.js"
import UserController from "../controllers/user.controller.js";

const userRouter = new Router()

userRouter.post("/login", UserController.login)
userRouter.post("/registration", UserController.registration)
userRouter.get("/authors/all", UserController.getAllId)
userRouter.get("/author/info", UserController.getELibAuthor)
userRouter.use(errorHandlerMiddleware)

export default userRouter
