
import ReportService from "../services/report.service.js";
import template_14 from "../lib/docx/14.js";
import docx from "docx"

class ReportController{
    getReportAll = async (req,res,next) =>{
        try {
            res.json(await ReportService.getReportsAllDb())
        }catch (e){
            next(e)
        }
    }
    getReportById = async (req,res,next) =>{
        try {
            res.json(await ReportService.getReportByIdDb(req.query?.id))
        }catch (e){
            next(e)
        }
    }
    getTestReport = async (req,res,next)=>{
        try{
            const blob = docx.Packer.toBlob(template_14)
            res.send(blob)
        }catch (e){
            next(e)
        }
    }
}

export default new ReportController()
