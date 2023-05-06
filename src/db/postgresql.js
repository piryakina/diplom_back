import dotenv from "dotenv"
dotenv.config()

import {Pool} from "pg"

class Postgresql {
    #db = new Pool({
        host: String(process.env.DB_HOST),
        password: String(process.env.DB_PASSWORD),
        max: Number(process.env.DB_MAX_CONNECTIONS),
        user: String(process.env.DB_USER),
    })

    getDB(){
        return this.#db
    }
}

export default new Postgresql()
