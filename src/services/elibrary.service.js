import {getAuthor, getArticles, getUserArticle} from "../lib/parser.js";
import ApiException from "../lib/api.exception.js";
import ElibraryProvider from "../db/providers/elibrary.provider.js";
import ELibRequester from "../lib/ELibRequester.js";


class ELibraryService {
    getELibAuthorById = async (id) => {
        if (!id) {
            throw ApiException.BadRequest("invalid data")
        }
        return await getAuthor(id)
    }

    getELibArticles = async (id) => {
        if (!id) {
            throw ApiException.BadRequest("invalid data")
        }
        return await getArticles(id)
    }

    getELibArticleInfo = async (id) => {
        if (!id) {
            throw ApiException.BadRequest("invalid data")
        }
        return await getUserArticle(id)
    }

    addELibArticles = async (id) => {
        if (!id) {
            throw ApiException.BadRequest("invalid data")
        }
        const articles = await getArticles(id)
        console.log(articles)
        for (let i = 0; i < articles.length; i++) {
            await ElibraryProvider.addArticlesById(articles[i].title, articles[i].source, articles[i].id)
        }
        return articles

        // const articlesInfo = new Array(articles.length)
        // for (let i = 0; i < articles.length; i++) {
        //     articlesInfo.push({
        //         param: await getUserArticle(articles[i].id),
        //         ...articles[i]
        //     })
        // }
        // console.log(articlesInfo)
        // return articlesInfo
        // if (!id) {
        //     throw ApiException.BadRequest("invalid data")
        // }
        // return await getArticles(id)
    }
    addArticleInfo = async (id) => {
        if (!id) {
            throw ApiException.BadRequest("invalid data")
        }
        const res =  await getUserArticle(id)
        console.log(res)
        return await ElibraryProvider.addArticleInfoById(res.year,res.pages, res.udk, id)
    }
}

export default new ELibraryService()
