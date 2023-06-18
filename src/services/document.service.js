import ApiException from "../lib/api.exception.js";
import DocumentProvider from "../db/providers/document.provider.js";

class DocumentService {
    addNewDocument = async (doc, user_id) => {
        if (!doc || !doc.type){
            throw ApiException.BadRequest("invalid doc")
        }
        switch (doc.type){
            case "grant": {
                const grant_id = await DocumentProvider.addNewGrant(doc.fields)
                return {grant_id}
            }
            case "article":{
                const article_id = await DocumentProvider.addNewArticle(doc.fields)
                return {article_id}
            }
            default:{
                throw ApiException.BadRequest("invalid doc type")
            }
        }
    }
    getDocs = async (id)=>{
        if (!id){
            throw ApiException.BadRequest("invalid doc")
        }
        return (await DocumentProvider.getAllDocsByUserId(id)).rows
    }
}

export default new DocumentService()
