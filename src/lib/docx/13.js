import docx from "docx"
import ApiException from "../api.exception.js";

export function template_13(grants) {
    if (!grants || !Array.isArray(grants)){
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
                                                        text: "Участие студентов в конкурсах, грантах",
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
                                        children: [
                                            new docx.Paragraph("Название конкурса научных работ, гранта")
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph("Количество поданных работ, проектов"),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph("Кто выиграл"),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                ]
                            }),
                            ...(grants.map(grant=>{
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
                                                new docx.Paragraph(String(grant.count_reports)),
                                            ],
                                            verticalAlign: docx.VerticalAlign.CENTER,
                                            width: {size: 200, type: docx.WidthType.AUTO}
                                        }),
                                        new docx.TableCell({
                                            children: [
                                                new docx.Paragraph(String(grant.winner)),
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
