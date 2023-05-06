import ApiException from "../lib/api.exception.js";
import UserProvider from "../db/providers/user.provider.js";
import bcrypt from "bcrypt"
import {generateAccessToken} from "../lib/jwt.js";
import e from "express";

class UserService {
    loginUser = async ({email, password}) => {
        if (!email || !password){
            throw ApiException.BadRequest("invalid data")
        }
        const user = await UserProvider.findByEmail(email)
        if (!user){
            throw ApiException.BadRequest("invalid data")
        }
        if (!bcrypt.compare(password, user.password)){
            throw ApiException.BadRequest("invalid data")
        }
        return generateAccessToken({userId: user.id})
    }

    registrationUser = async ({email, password, fio}) => {
        if (!email || password || fio){
            throw ApiException.BadRequest("invalid data")
        }
        const hash = await bcrypt.hash(password, 10)
        try{
            const userId = await UserProvider.addNewUser(email, password, fio)
            return userId
        }catch (e){
            if (e.code === 23505){
                throw ApiException.BadRequest("email is already taken")
            }
            throw e
        }
    }
}

export default new UserService()
