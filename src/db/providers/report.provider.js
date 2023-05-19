import Postgresql from "../postgresql.js";

class ReportProvider {
    #connection = Postgresql.getDB()
    getAllReports = async () => {
        return (await this.#connection.query(`
            select * from "report" 
        `)).rows
    }
    getReportById = async (id) => {
        return (await this.#connection.query(`
            select * from "report" where id=$1
        `,[id])).rows
    }
}

export default new ReportProvider()
