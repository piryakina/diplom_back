import UserService from "../services/user.service.js";
import ElibraryService from "../services/elibrary.service.js";

class UserController {
    login = async (req, res, next) => {
        try{
            res.json(await UserService.loginUser(req.body))
        }catch (e){
            next(e)
        }
    }

    registration = async (req,res,next) => {
        try{
            await UserService.registrationUser(req.body)
            res.json(await UserService.loginUser(req.body))
        }catch (e){
            next(e)
        }
    }
    getELibAuthor = async (req,res,next)=>{
        try {
            res.json(await ElibraryService.getELibAuthorById(req.query?.id))
        }catch (e){
            next(e)
        }
    }
    getAllId = async (req,res,next) =>{
        try {
            res.json(await  UserService.getUsersId())
        }catch (e){
            next(e)
        }
    }

}

export default new UserController()
