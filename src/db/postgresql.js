import dotenv from "dotenv"
dotenv.config()

import pg from "pg"

class Postgresql {
    #db = new pg.Pool({
        host: String(process.env.DB_HOST),
        password: String(process.env.DB_PASSWORD),
        max: Number(process.env.DB_MAX_CONNECTIONS),
        user: String(process.env.DB_USER),
        database: String(process.env.DB_BASE)
    })

    getDB(){
        return this.#db
    }
}

export default new Postgresql()
