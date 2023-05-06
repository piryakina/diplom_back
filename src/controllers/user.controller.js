import UserService from "../services/user.service.js";

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

}

export default new UserController()
