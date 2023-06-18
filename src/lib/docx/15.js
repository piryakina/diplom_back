import docx from "docx"
import ApiException from "../api.exception.js";

export function template_15(articles) {
    if (!articles || !Array.isArray(articles)){
        throw ApiException.BadRequest()
    }
    return new docx.Document({
        sections: [
            {
                children: [
                    new docx.Table({
                        rows: [
                            new docx.TableRow({
                                children: [
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph({children: [
                                                    new docx.TextRun({
                                                        text: "Статьи",
                                                        bold: true
                                                    }),
                                                ]
                                            })
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    })
                                ]
                            }),
                            new docx.TableRow({
                                children: [
                                    new docx.TableCell({
                                        children:[
                                            new docx.Paragraph("Год"),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                    new docx.TableCell({
                                        children:[
                                            new docx.Paragraph("Авторы"),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph("Название статьи")
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph("Наименование журнала"),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph("№ журнала"),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph("Страницы от и до"),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                ]
                            }),
                            ...(articles.map(grant=>{
                                return new docx.TableRow({
                                    //заполняем тут
                                    children: [
                                        new docx.TableCell({
                                            children:[
                                                new docx.Paragraph(String(grant.year)),
                                            ],
                                            verticalAlign: docx.VerticalAlign.CENTER,
                                            width: {size: 200, type: docx.WidthType.AUTO}
                                        }),
                                        new docx.TableCell({
                                            children: [
                                                new docx.Paragraph(String(grant.title))
                                            ],
                                            verticalAlign: docx.VerticalAlign.CENTER,
                                            width: {size: 200, type: docx.WidthType.AUTO}
                                        }),
                                        new docx.TableCell({
                                            children: [
                                                new docx.Paragraph(String(grant.authors)),
                                            ],
                                            verticalAlign: docx.VerticalAlign.CENTER,
                                            width: {size: 200, type: docx.WidthType.AUTO}
                                        }),
                                        new docx.TableCell({
                                            children: [
                                                new docx.Paragraph(String(grant.source)),
                                            ],
                                            verticalAlign: docx.VerticalAlign.CENTER,
                                            width: {size: 200, type: docx.WidthType.AUTO}
                                        }),
                                        new docx.TableCell({
                                            children: [
                                                new docx.Paragraph(String(grant.number_source)),
                                            ],
                                            verticalAlign: docx.VerticalAlign.CENTER,
                                            width: {size: 200, type: docx.WidthType.AUTO}
                                        }),
                                        new docx.TableCell({
                                            children: [
                                                new docx.Paragraph(String(grant.pages)),
                                            ],
                                            verticalAlign: docx.VerticalAlign.CENTER,
                                            width: {size: 200, type: docx.WidthType.AUTO}
                                        }),
                                    ]
                                })
                            }))
                        ]
                    })
                ]
            }
        ]
    })
}
