import ApiException from "../lib/api.exception.js";
import UserProvider from "../db/providers/user.provider.js";
import bcrypt from "bcrypt"
import {generateAccessToken, generateRefreshToken} from "../lib/jwt.js";
// import {postgresMd5PasswordHash} from "pg/lib/utils.js";

class UserService {
    loginUser = async ({login, password}) => {
        if (!login || !password){
            throw ApiException.BadRequest("invalid data")
        }
        const user = await UserProvider.findByEmail(login)
        if (!user){
            throw ApiException.BadRequest("invalid data")
        }
        if (!bcrypt.compare(password, user.password)){
            throw ApiException.BadRequest("invalid data")
        }
        return {
            access: await generateAccessToken({userId: user.id, elibraryId:user.elibrary_id}),
            refresh: await generateRefreshToken({userId: user.id}),
        }
    }

    registrationUser = async ({login, elibraryId,email, password, fio}) => {
        if (!email || !password || !fio){
            throw ApiException.BadRequest("invalid data")
        }
        const hash = await bcrypt.hash(password, 10)
        try{
            const userId = await UserProvider.addNewUser(login, elibraryId, email, password, fio)
            return userId
        }catch (e){
            if (e.code === 23505){
                throw ApiException.BadRequest("email is already taken")
            }
            throw e
        }
    }
    getUsersId = async ()=>{
        try{
            return await UserProvider.getUsersIdAll()
        }catch (e)
        {
            throw e
        }
    }
    // addDocument = async ()=>{
    //
    // }
}

export default new UserService()
