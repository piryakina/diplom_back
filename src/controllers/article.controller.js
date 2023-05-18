import ElibraryService from "../services/elibrary.service.js";
import UserService from "../services/user.service.js";

class ArticleController {
    getELibArticles = async (req, res, next) => {
        try{
            res.json(await ElibraryService.getELibArticles(req.query?.id))
        }catch (e) {
            next(e)
        }
    }

    getELibArticleInfo = async (req, res, next) => {
        try{
            res.json(await ElibraryService.getELibArticleInfo(req.query?.id))
        }catch (e) {
            next(e)
        }
    }

    addArticles = async (req,res,next)=>{
        try {
            res.json(await ElibraryService.addElibArticles(req.query?.id))
        }catch (e){
            next(e)
        }
    }
    addArticleInfoId = async (req,res,next)=>{
        try {
            res.json(await ElibraryService.addArticleInfo(req.query?.id))
        } catch (e){
            next(e)
        }
    }
    // addDocumentByHands = async (req,res,next)=>{
    //     try {
    //         res.json(await UserService.addDocument(req.body))
    //     }catch (e){
    //         next(e)
    //     }
    // }
}
export default new ArticleController()
