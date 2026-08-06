import { Document, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, Packer } from 'docx';
import { SKKNProject } from '../types/skkn';

export const generateDocxBlob = async (project: SKKNProject): Promise<Blob> => {
  const children: any[] = [];

  // BÌA SÁNG KIẾN KINH NGHIỆM
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO / PHÒNG GIÁO DỤC VÀ ĐÀO TẠO', bold: true, size: 24, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: project.schoolUnit.toUpperCase(), bold: true, size: 26, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 400 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'SÁNG KIẾN KINH NGHIỆM', bold: true, size: 40, color: '1A365D', font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 300 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'ĐỀ TÀI:', bold: true, size: 28, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `"${project.title.toUpperCase()}"`, bold: true, size: 30, color: '0D9488', font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 800 } }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `Lĩnh vực/Môn học: `, bold: true, size: 28, font: 'Times New Roman' }),
        new TextRun({ text: `${project.subject} (${project.educationLevel})`, size: 28, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `Tác giả: `, bold: true, size: 28, font: 'Times New Roman' }),
        new TextRun({ text: project.teacherName, size: 28, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `Chức vụ: `, bold: true, size: 28, font: 'Times New Roman' }),
        new TextRun({ text: `Giáo viên bộ môn ${project.subject}`, size: 28, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `Năm học: `, bold: true, size: 28, font: 'Times New Roman' }),
        new TextRun({ text: project.academicYear, size: 28, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 1200 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `Năm ${new Date().getFullYear()}`, italics: true, size: 26, font: 'Times New Roman' }),
      ],
    }),
    // Page break after cover
    new Paragraph({ text: '', pageBreakBefore: true })
  );

  // MỤC LỤC & DANH MỤC
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'MỤC LỤC SÁNG KIẾN KINH NGHIỆM', bold: true, size: 28, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 200 } })
  );

  project.sections.forEach((sec) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: sec.romanTitle, bold: true, size: 26, font: 'Times New Roman' }),
        ],
      })
    );
    sec.subSections.forEach((sub) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `   ${sub.subNumbering}`, size: 24, font: 'Times New Roman' }),
          ],
        })
      );
    });
  });

  children.push(new Paragraph({ text: '', pageBreakBefore: true }));

  // NỘI DUNG 4 PHẦN CHÍNH
  project.sections.forEach((sec) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: sec.romanTitle, bold: true, size: 30, color: '1E3A8A', font: 'Times New Roman' }),
        ],
      })
    );

    sec.subSections.forEach((sub) => {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({ text: sub.subNumbering, bold: true, size: 26, font: 'Times New Roman' }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.BOTH,
          spacing: { line: 360, after: 200 }, // 1.5 line spacing
          children: [
            new TextRun({
              text: sub.content || `(Nội dung tiểu mục "${sub.title}" đang tiếp tục hoàn thiện...)`,
              size: 28, // 14pt
              font: 'Times New Roman'
            }),
          ],
        })
      );
    });
  });

  // BẢNG GIẢI PHÁP NẾU CÓ
  if (project.solutions && project.solutions.length > 0) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: 'BẢNG TỔNG HỢP CÁC GIẢI PHÁP ĐỘT PHÁ', bold: true, size: 26, font: 'Times New Roman' }),
        ],
      })
    );

    const rows: TableRow[] = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Mã GP', bold: true, font: 'Times New Roman' })] })], width: { size: 15, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Tên Giải Pháp', bold: true, font: 'Times New Roman' })] })], width: { size: 35, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Tính Mới & Điểm Đột Phá', bold: true, font: 'Times New Roman' })] })], width: { size: 50, type: WidthType.PERCENTAGE } }),
        ]
      })
    ];

    project.solutions.forEach((gp) => {
      rows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: gp.code, bold: true, font: 'Times New Roman' })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: gp.title, font: 'Times New Roman' })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: gp.noveltyFeatures, font: 'Times New Roman' })] })] }),
          ]
        })
      );
    });

    children.push(new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } }));
  }

  // PHỤ LỤC MÃ QR CODE KẾT NỐI HỌC LIỆU VÀ MINH CHỨNG
  if (project.qrAppendixItems && project.qrAppendixItems.length > 0) {
    children.push(
      new Paragraph({ text: '', pageBreakBefore: true }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'PHỤ LỤC: DANH MỤC MÃ QR CODE MINH CHỨNG ĐA PHƯƠNG TIỆN', bold: true, size: 28, color: '0D9488', font: 'Times New Roman' }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.BOTH,
        spacing: { line: 360, after: 200 },
        children: [
          new TextRun({
            text: 'Hội đồng thẩm định có thể dùng ứng dụng Quét mã QR (Zalo/Camera) trên thiết bị di động để trực tiếp xem Kế hoạch bài dạy (Giáo án 5512), Video tiết dạy thực nghiệm và kho ảnh học sinh:',
            italics: true,
            size: 26,
            font: 'Times New Roman'
          }),
        ],
      })
    );

    const qrRows: TableRow[] = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'STT', bold: true, font: 'Times New Roman' })] })], width: { size: 10, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Tên Học Liệu / Minh Chứng', bold: true, font: 'Times New Roman' })] })], width: { size: 40, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Đường Dẫn Truy Cập', bold: true, font: 'Times New Roman' })] })], width: { size: 50, type: WidthType.PERCENTAGE } }),
        ]
      })
    ];

    project.qrAppendixItems.forEach((qr, idx) => {
      qrRows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${idx + 1}`, bold: true, font: 'Times New Roman' })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: qr.title, bold: true, font: 'Times New Roman' }), new TextRun({ text: `\n(${qr.note || ''})`, italics: true, size: 22, font: 'Times New Roman' })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: qr.url, font: 'Times New Roman' })] })] }),
          ]
        })
      );
    });

    children.push(new Table({ rows: qrRows, width: { size: 100, type: WidthType.PERCENTAGE } }));
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134,    // 2cm
              bottom: 1134, // 2cm
              left: 1701,   // 3cm
              right: 1134   // 2cm
            }
          }
        },
        children
      }
    ]
  });

  return await Packer.toBlob(doc);
};

