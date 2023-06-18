
import ReportService from "../services/report.service.js";
import {template_14} from "../lib/docx/14.js";
import {template_13} from "../lib/docx/13.js";
import {template_1} from "../lib/docx/1.js";
import {template_15} from "../lib/docx/15.js";
import docx from "docx"
import {writeFile} from "fs/promises"
import {writeFileSync} from "fs"
import DocumentService from "../services/document.service.js";

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
            const buffer = await docx.Packer.toBuffer(template_1)
            const blob = await docx.Packer.toBlob(template_1)
            // res.send(blob)
            // await writeFile("test.docx", buffer, {flag: "w"})
            writeFileSync("test1.docx", blob)
            res.send(buffer)
        }catch (e){
            next(e)
        }
    }

    getGrantsReport = async (req, res, next) => {
        try{
            const buffer = await docx.Packer.toBuffer(template_13(await ReportService.getGrantsFromBd()))
            // res.send(blob)
            // await writeFile("test.docx", buffer, {flag: "w"})
            writeFileSync("test13.docx", buffer)
            res.send(buffer)
        }catch (e){
            next(e)
        }
    }
    getArticlesReport = async (req, res, next) => {
        try{
            const buffer = await docx.Packer.toBuffer(template_15(await DocumentService.getDocs(9)))
            const blob = await docx.Packer.toBlob(template_15(await DocumentService.getDocs(9)))
            writeFileSync("test15.docx", buffer)
            console.log(blob)
            res.send(buffer)
            // await writeFile("test.docx", buffer, {flag: "w"})
        }catch (e){
            next(e)
        }
    }
}

export default new ReportController()
