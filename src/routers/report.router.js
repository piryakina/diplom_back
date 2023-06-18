import {Router} from "express";
import errorHandlerMiddleware from "../middlewares/errorHandler.middleware.js";
import ReportController from "../controllers/report.controller.js";

const reportRouter = new Router()

reportRouter.get("/report/all", ReportController.getReportAll)
reportRouter.get("/report", ReportController.getReportById)
reportRouter.get("/report/test", ReportController.getTestReport)
reportRouter.get("/report/grants", ReportController.getGrantsReport)
reportRouter.get("/report/article", ReportController.getArticlesReport)
reportRouter.use(errorHandlerMiddleware)

export default reportRouter
