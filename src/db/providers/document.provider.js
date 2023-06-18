import Postgresql from "../postgresql.js";

class DocumentProvider {
    #connection = Postgresql.getDB()
    addNewGrant({title, year, count_reports, winner, user_id}){
        return this.#connection.query(`
            insert into grants (year, title, count_reports, winner, user_id) values ($1, $2, $3, $4, $5) returning id
        `, [year, title, count_reports, winner, user_id])
    }

    addNewArticle({authors, title, source, pages, year}, is_elib = false){
        return this.#connection.query(`
            insert into article (year, authors, title, source, pages, is_elib) values ($1, $2, $3, $4, $5, $6) returning id
        `, [year, authors, title, source, pages, is_elib])
    }
    getAllDocsByUserId(id){
        return this.#connection.query(`
        select * from article where user_id=$1`,[id])
    }
}

export default new DocumentProvider()
