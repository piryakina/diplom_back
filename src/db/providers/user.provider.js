import Postgresql from "../postgresql.js"
import ApiException from "../../lib/api.exception.js"

class UserProvider{
    #connection = Postgresql.getDB()
    findByEmail = async (email) => {
        return (await this.#connection.query(`
            select * from user where email = $1
        `, [email])).rows[0]
    }

    addNewUser = async (email, password, fio) => {
        return (await this.#connection.query(`
            insert into user (email, password, fio) values ($1, $2, $3) returning id
        `, [email, password, fio])).rows[0]
    }
}

export default new UserProvider()
