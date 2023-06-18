import ApiException from "../lib/api.exception.js";
import {verifyAccessToken} from "../lib/jwt.js";

function authMiddleware(whiteList){
    return function (req, res, next){
        if (!whiteList.includes(req.url)){
            next(throw ApiException.BadRequest("unauthorization"))
        }
        const token = req.headers?.access?.split(" ")[1]
        req.body = verifyAccessToken(token)
        next()
    }
}
