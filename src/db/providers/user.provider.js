import Postgresql from "../postgresql.js"
import ApiException from "../../lib/api.exception.js"

class UserProvider {
    #connection = Postgresql.getDB()
    findByEmail = async (login) => {
        return (await this.#connection.query(`
            select * from "user" where login = $1
        `, [login])).rows[0]
    }

    addNewUser = async (login, elibraryId, email, password, fio) => {
        return (await this.#connection.query(`
            insert into "user" (email, password, fio, elibrary_id, login) values ($1, $2, $3, $4,$5) returning id
        `, [email, password, fio, elibraryId, login])).rows[0]
    }
    getUsersIdAll = async ()=>{
        return (await this.#connection.query(`
        select elibrary_id from "user"`)).rows
    }
}

export default new UserProvider()
