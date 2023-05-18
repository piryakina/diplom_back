import Postgresql from "../postgresql.js"

class ElibraryProvider {
    #connection = Postgresql.getDB()
    addArticlesById = async (title, source, article_id) => {
        return (await this.#connection.query(`
            insert into "doc" (title,source,article_id) values ($1, $2, $3) returning id
        `, [title, source, article_id])).rows[0]
    }
    addArticleInfoById = async (year, pages, udk, article_id) => {
        return (await this.#connection.query(`
        update "doc" set year=$1, pages=$2, udk=$3 where article_id=$4`, [year, pages, udk, article_id])).rows[0]
    }
}

export default new ElibraryProvider()
