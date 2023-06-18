import docx from "docx"

export function template_1({}) {
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
                                                        text: "Монографии:",
                                                        bold: true
                                                    }),
                                                    new docx.TextRun({
                                                        text: "- всего, в т.ч. изданные:"
                                                    })
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
                                            new docx.Paragraph("Ф.И.О. автора,\n Ф.И.О. соавторов\n (если есть)")
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph("Описание монографий\n" +
                                                "(название, издательство,\n год издания, кол-во стр.)\n"),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph("Гриф\n" +
                                                "(УМО, НМС и др., номер документа)\n"),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph("Объем, п.л."),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    }),
                                    new docx.TableCell({
                                        children: [
                                            new docx.Paragraph("Тираж, экз."),
                                        ],
                                        verticalAlign: docx.VerticalAlign.CENTER,
                                        width: {size: 200, type: docx.WidthType.AUTO}
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }
        ]
    })
}
