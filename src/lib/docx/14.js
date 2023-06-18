import docx from "docx";

export const template_14 = new docx.Document({
    sections: [
        {
            children: [
                new docx.Table({
                    rows: [
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({children: [new docx.Paragraph("hello1")]}),
                                new docx.TableCell({children: [new docx.Paragraph("hello2")]}),
                                new docx.TableCell({children: [new docx.Paragraph("hello3")]}),
                                new docx.TableCell({children: [new docx.Paragraph("hello4")]}),
                            ]
                        }),
                        new docx.TableRow({
                            children: [
                                new docx.TableCell({children: [new docx.Paragraph("hello5")]}),
                                new docx.TableCell({children: [new docx.Paragraph("hello6")]}),
                                new docx.TableCell({children: [new docx.Paragraph("hello7")]}),
                                new docx.TableCell({children: [new docx.Paragraph("hello8")]}),
                            ]
                        })
                    ]
                })
            ]
        }
    ]
})
