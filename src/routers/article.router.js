import {Router} from "express"
import ArticleController from "../controllers/article.controller.js";

const articleRouter = new Router()

articleRouter.get("/articles", ArticleController.addArticles)
articleRouter.get("/article/add", ArticleController.addArticleInfoId)
articleRouter.get("/article/info", ArticleController.getELibArticleInfo)
articleRouter.get("/article/all", ArticleController.getELibArticles)
articleRouter.get("/document/add", ArticleController.addArticleInfoId)

export default articleRouter
