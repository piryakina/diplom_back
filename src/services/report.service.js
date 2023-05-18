import ApiException from "../lib/api.exception.js";
import {getUserArticle} from "../lib/parser.js";
import ElibraryProvider from "../db/providers/elibrary.provider.js";
import ReportProvider from "../db/providers/report.provider.js";

class ReportService {
    getReportsAllDb = async () => {
        return await ReportProvider.getAllReports()
    }
    getReportByIdDb = async (id)=>{
        if (!id){
            throw ApiException.BadRequest("invalid data")

        }
        return await ReportProvider.getReportById(id)
    }

}

export default new ReportService()
