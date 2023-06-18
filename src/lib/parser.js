import superagent from 'superagent'
import {load} from 'cheerio'
import _ from 'lodash'
import ApiException from "./api.exception.js";
import ELibRequester from "./ELibRequester.js";
import DocumentService from "../services/document.service.js";

const baseUrl = 'https://www.elibrary.ru'

function sendReq(url) {
    return async function () {
        return await superagent
            .agent()
            .get(url)
            .redirects(10)
            .send()
    }
}

export const getAuthor = async id => {
    try {
        const authorUrl = `${baseUrl}/author_profile.asp?authorid=${id}`

        const {text} = await ELibRequester.send(sendReq(authorUrl))


        const author = {}
        const $ = load(text)

        const fullName = $('form[name="results"] table td[align="left"] *[color="#F26C4F"] > b').text()
        const fragments = fullName.split(/\s+/)

        if (fragments[0]) author.lastName = _.capitalize(fragments[0].trim())
        if (fragments[1]) author.firstName = _.capitalize(fragments[1].trim())
        if (fragments[2]) author.extraName = _.capitalize(fragments[2].trim())

        const organozationEl = $('form[name="results"] table td[width="100%"] a')
        if (organozationEl.length) author.organization = organozationEl.text()

        const resume = [];
        $('.form-panel tr:not(:first-child)').each(function (index, element) {
            const itemOrgEl = $('td:nth-child(2)', element);
            if (!itemOrgEl.length) {
                return;
            }
            const item = {organization: itemOrgEl.text()}
            const itemYearsEl = $('td:nth-child(3)', element);
            if (itemYearsEl.length) {
                item.years = itemYearsEl.text();
            }
            resume.push(item);
        });
        if (resume.length) {
            author.resume = resume;
        }

        return author

    } catch (err) {
        throw ApiException.BadGateway('Ошибка при парсинге', err)
    }
}

const parseArticle = $ => {
    let articles = []

    $('tr[id^="arw"],tr[id^="brw"]').each((index, element) => {
        const article = {}
        const idAttr = $(element).attr('id')

        article.id = parseInt(idAttr.replace('brw', '').replace('arw', ''), 10)

        const $title = $('td:nth-child(2) b', element)

        if ($title.length) article.title = $title.text().trim()


        const $source = $('font[color="#00008f"]:last-child', element)
        if ($source.length) article.source = $source.text().trim().replace(/\r?\n/g, '')

        const $authors = $('font[color="#00008f"]:nth-child(3)', element)

        if ($authors.length) {
            article.authors = $authors.text().split(', ').map((str) => {
                return str.trim()
            })
        }

        if (article.id || article.title) articles.push(article)
    })

    return articles
}

// const getPostQuery = async (pageNum, url) => {
//     const {text} = await superagent
//         .agent()
//         .get(`${url}&pagenum=${pageNum.toString()}`)
//         .redirects(10)
//         .send()
//     return text
// }


export const getArticles = async id => {
    try {
        const articlesUrl = `${baseUrl}/author_items.asp?pubrole=100&show_refs=1&authorid=${id}&pagenum=1`

        const {text} = await ELibRequester.send(sendReq(articlesUrl))
        // const text = await getPostQuery(1, articlesUrl)


        const $ = load(text)


        const articles = []

        articles.push(...parseArticle($))

        if (!articles.length) throw ApiException.BadGateway('Ошибка при парсинге')
        let pages = []
        $('.mouse-hovergr[bgcolor="#f5f5f5"] a').each((index, element) => {
            pages.push($(element).text())
        })
        if (pages.length) {
            let queries = []
            for (let pageNum of pages) {
                const pageData = await getPostQuery(pageNum, articlesUrl)
                queries.push(pageData)
            }
            for (let page of queries) articles.push(...parseArticle(load(page)))
        }
        return articles
    } catch (err) {
        throw ApiException.BadGateway('Ошибка при парсинге', err)
    }
}

export const getUserArticle = async (id) => {
    try {
        console.time("parse")
        console.time("fetch")
        console.log("fetching")
        const url = `${baseUrl}/item.asp?id=${id}`
        const {text} = await ELibRequester.send(sendReq(url))
        const $ = load(text)

        console.timeEnd("fetch")
        const content = {authors: [], title: $("title").text()}

        console.log(`Парсинг авторов`)
        $("div[style='display: inline-block; white-space: nowrap'] b").each(function (index, element) {
            const title = $(element).text();
            const author = {title: title};
            const authorElements = title.split(/\s+|\./);
            author.lastName = authorElements[0].split('-').map(_.capitalize).join('-');
            if (authorElements.length > 1) {
                author.firstName = _.capitalize(authorElements[1]);
                author.firstNameInitial = authorElements[1][0];
                if (authorElements.length > 2) {
                    author.extraName = _.capitalize(authorElements[2]);
                    author.extraNameInitial = authorElements[2][0];
                }
            }
            content.authors.push(author);
        })
        console.log(`Парсинг чего-то там`)
        $('table[width="550"] td[valign="middle"] a').each(function (index, element) {
            if (index === 1) {
                content.source = $(element).contents().map(function (index, element) {
                    return $(element).text()
                }).toArray().filter(function (e) {
                    return !!e
                }).map(function (e) {
                    return e.trim()
                }).join(' ').trim();
            }
        });
        console.log(`Сборник Элементов`)
        let sourceParamsContent = '';
        $('td[width="574"]').each(function (index, element) {
            sourceParamsContent += $(element).text();
        });
        console.log(`Парсинг на количество страниц`)
        let pagesRe = /Страницы\:\s*(\d+(\-\d+)?)/m;
        let pagesResult = pagesRe.exec(sourceParamsContent);
        if (pagesResult && pagesResult.length > 1) {
            content.pages = pagesResult[1];
        }
        console.log(`Парсинг на количество вопросов`)
        let issueRe = /Номер:\s*(.*)\n\n/m;
        let issueResult = issueRe.exec(sourceParamsContent);
        if (issueResult && issueResult.length > 1) {
            content.issue = issueResult[1];
        }
        console.log(`Парсинг на год издания`)
        let yearRe = /(Годы|Год издания|Год):\s*(.*)\n\n/m;
        let yearResult = yearRe.exec(sourceParamsContent);
        if (yearResult && yearResult.length > 1) {
            content.year = yearResult[2];
            console.log(content.year)
        }
        console.log(`Парсинг удк`)
        let udk = /(УДК):\s?\d+\.\d+\.\d+\.\d+/m
        // let udk = /(УДК):/m
        let udkResult = udk.exec(sourceParamsContent)
        // console.log(udkResult)
        if (udkResult && udkResult.length > 1) {
            content.udk = udkResult[0].split(":")[1];
            console.log(content.udk)
        }
        // $('').each((i, el)=>{
        //     console.log(el)
        // })
        // const temp = $('body')
        //     .children('table')
        //     .children("tbody")
        //     .children("tr")
        //     .children("td")
        //     .children("table")
        //     .children("tbody")
        //     .children("tr")
        //     .children("td")
        //     .children("table")
        //     .children("tbody")
        //     .children("tr")
        //     .children("td")
        //     .children("div")
        //     .children("table")
        //     .children("tbody")
        //     .children("tr")
        //     .children("td")
        // console.log(temp)
        const pageDOM = 'body > table > tbody > tr > td > table:first > tbody > tr > td > table > tbody > tr > td > '
        const headDom = pageDOM + 'div[style="width:580px; margin:0; border:0; padding:0; "] > table[width="580"] > tbody >'
        // const titleValue = $(pageDOM + 'table > tbody > tr > td[width="534"]').text()
        // const temp = $(headDom)
        const typeValue = $(headDom + 'tr > td[width="574"] > font[color="#00008f"]:first').text()
        console.log(typeValue)
        console.log(`Парсинг закончен`)
        console.timeEnd("parse")
        switch (typeValue) {
            case "грант": {
                console.log('грант')
            }
            break;
            case "статья в журнале - научная статья":{
                console.log("статья в журнале")
                const obj = {
                    fields: {
                        ...content,
                        authors: content.authors.join(", "),
                    },
                    type: "article",
                }
                content.id = await DocumentService.addNewDocument(obj, 9)
            }
            break;
            default: {
                console.warn(`${typeValue} не принимается!`)
            }
        }
        return content
    } catch (err) {
        throw ApiException.BadGateway('Ошибка при парсинге', err)
    }
}
