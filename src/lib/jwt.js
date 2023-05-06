import JWT from "jsonwebtoken"

export async function generateAccessToken(payload){
    return await JWT.sign(payload, String(process.env.JWT_ACCESS_SECRET), {
        expiresIn: String(process.env.JWT_ACCESS_TIME)
    })
}

export async function generateRefreshToken(payload){
    return await JWT.sign(payload, String(process.env.JWT_REFRESH_SECRET), {
        expiresIn: String(process.env.JWT_REFRESH_TIME)
    })
}

export async function verifyAccessToken(token){
    return await new Promise((resolve, reject)=>{
        JWT.verify(token, String(process.env.JWT_ACCESS_SECRET), (err, payload)=>{
            if (err){
                return reject(err)
            }
            resolve(payload)
        })
    })
}

export async function verifyRefreshToken(token){
    return await new Promise((resolve, reject)=>{
        JWT.verify(token, String(process.env.JWT_REFRESH_SECRET), (err, payload)=>{
            if (err){
                return reject(err)
            }
            resolve(payload)
        })
    })
}
