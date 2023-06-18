import ElibraryService from "../services/elibrary.service.js";
import UserService from "../services/user.service.js";
import DocumentService from "../services/document.service.js";

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
            res.json(await ElibraryService.addELibArticles(req.query?.id))
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
    getDocumentsByUserId = async (req,res,next)=>{
        try {
            const t = await DocumentService.getDocs(req.query?.id)
            res.json(t)
        }catch (e){
            next(e)
        }
    }

    addNewDocument = async (req, res, next) => {
        try{
            res.json(await DocumentService.addNewDocument(req.body?.doc, 9))
        }catch (e){
            next(e)
        }
    }
}
export default new ArticleController()
