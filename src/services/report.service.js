import ApiException from "../lib/api.exception.js";
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

    getGrantsFromBd = async () => {
        return await ReportProvider.getGrants()
    }

}

export default new ReportService()
