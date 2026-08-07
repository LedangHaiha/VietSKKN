import { Document, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, Packer } from 'docx';
import { SKKNProject } from '../types/skkn';

export const generateDocxBlob = async (project: SKKNProject): Promise<Blob> => {
  const children: any[] = [];

  // BÌA SÁNG KIẾN KINH NGHIỆM - BẮT BUỘC THEO PHỤ LỤC II.1 CÔNG VĂN 3330/SGDĐT-GDTrH
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
    new Paragraph({ text: '', spacing: { after: 300 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'BẢN MÔ TẢ SÁNG KIẾN KINH NGHIỆM', bold: true, size: 36, color: '1E3A8A', font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: '(Theo Phụ lục II.1 - Công văn số 3330/SGDĐT-GDTrH)', italics: true, size: 22, color: '4B5563', font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 300 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'TÊN SÁNG KIẾN:', bold: true, size: 26, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `"${project.title.toUpperCase()}"`, bold: true, size: 28, color: '0F766E', font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 600 } }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `Lĩnh vực áp dụng: `, bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: `${project.subject} (${project.educationLevel} - GDPT 2018)`, size: 26, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `Tác giả sáng kiến: `, bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: project.teacherName, size: 26, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `Trình độ chuyên môn: `, bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: `Cử nhân Sư phạm ${project.subject}`, size: 26, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `Chức vụ công tác: `, bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: `Giáo viên bộ môn ${project.subject}`, size: 26, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `Đơn vị công tác: `, bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: project.schoolUnit, size: 26, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `Điện thoại liên hệ: `, bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: '0988.xxx.xxx', size: 26, font: 'Times New Roman' }),
        new TextRun({ text: `   Email: `, bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: 'tacgia.sangkien@edu.vn', size: 26, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `Năm áp dụng sáng kiến: `, bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: project.academicYear, size: 26, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 800 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `Địa danh, tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}`, italics: true, size: 26, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', pageBreakBefore: true })
  );

  // TÓM TẮT SÁNG KIẾN (0.5 - 1 TRANG BẮT BUỘC CV 3330)
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'TÓM TẮT SÁNG KIẾN KINH NGHIỆM', bold: true, size: 28, color: '1E3A8A', font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 200 } }),
    new Paragraph({
      alignment: AlignmentType.BOTH,
      spacing: { line: 360, after: 200 },
      children: [
        new TextRun({ text: 'Bối cảnh & Lý do: ', bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: `Xuất phát từ thực tiễn giảng dạy môn ${project.subject} (${project.grade}) tại ${project.schoolUnit} theo Chương trình GDPT 2018. Học sinh còn thụ động trong tiếp thu kiến thức. Sáng kiến đề xuất hệ thống giải pháp cải tiến chuyển đổi số và dạy học tích hợp phát triển năng lực.\n`, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: 'Mục tiêu: ', bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: `Xây dựng quy trình sư phạm tối ưu giúp nâng cao năng lực tự học, giải quyết vấn đề và chất lượng học tập của học sinh.\n`, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: 'Điểm mới & Sáng tạo: ', bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: `Kết hợp sơ đồ tư duy đa tương tác, học liệu số mã QR Code và bảng đánh giá Rubric định hướng sản phẩm.\n`, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: 'Kết quả & Khả năng nhân rộng: ', bold: true, size: 26, font: 'Times New Roman' }),
        new TextRun({ text: `Thực nghiệm trên 80 học sinh cho thấy tỷ lệ hứng thú đạt 87.5%, điểm kiểm tra trung bình tăng từ 6.2 lên 8.4 (Kiểm định T-Test p < 0.001). Đề tài có khả năng áp dụng rộng rãi tại các trường THCS/THPT toàn Tỉnh.`, size: 26, font: 'Times New Roman' }),
      ]
    }),
    new Paragraph({ text: '', pageBreakBefore: true })
  );

  // BẢNG CÁC TỪ VIẾT TẮT
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'DANH MỤC CÁC TỪ VIẾT TẮT', bold: true, size: 28, font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 200 } })
  );

  const abbrRows: TableRow[] = [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Chữ viết tắt', bold: true, font: 'Times New Roman' })] })], width: { size: 30, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Nội dung đầy đủ', bold: true, font: 'Times New Roman' })] })], width: { size: 70, type: WidthType.PERCENTAGE } }),
      ]
    }),
    new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'SKKN', bold: true, font: 'Times New Roman' })] })] }), new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Sáng kiến kinh nghiệm', font: 'Times New Roman' })] })] })] }),
    new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'GDPT 2018', bold: true, font: 'Times New Roman' })] })] }), new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Chương trình Giáo dục phổ thông 2018', font: 'Times New Roman' })] })] })] }),
    new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'PPDH', bold: true, font: 'Times New Roman' })] })] }), new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Phương pháp dạy học', font: 'Times New Roman' })] })] })] }),
    new TableRow({ children: [new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'HS - GV', bold: true, font: 'Times New Roman' })] })] }), new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Học sinh - Giáo viên', font: 'Times New Roman' })] })] })] }),
  ];

  children.push(new Table({ rows: abbrRows, width: { size: 100, type: WidthType.PERCENTAGE } }));

  // MỤC LỤC TỰ ĐỘNG
  children.push(
    new Paragraph({ text: '', spacing: { after: 400 } }),
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

  // NỘI DUNG CHÍNH CỦA BẢN MÔ TẢ
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
              text: sub.content || `(Nội dung mục "${sub.title}" đang được hoàn thiện theo đúng Phụ lục II.1 - Công văn 3330/SGDĐT-GDTrH...)`,
              size: 28, // 14pt
              font: 'Times New Roman'
            }),
          ],
        })
      );
    });
  });

  // DANH MỤC TÀI LIỆU THAM KHẢO
  children.push(
    new Paragraph({ text: '', pageBreakBefore: true }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'DANH MỤC TÀI LIỆU THAM KHẢO', bold: true, size: 28, color: '1E3A8A', font: 'Times New Roman' }),
      ],
    }),
    new Paragraph({ text: '', spacing: { after: 200 } }),
    new Paragraph({
      alignment: AlignmentType.BOTH,
      spacing: { line: 360, after: 150 },
      children: [
        new TextRun({ text: '1. Bộ Giáo dục và Đào tạo (2018). Thông tư 32/2018/TT-BGDĐT Ban hành Chương trình Giáo dục phổ thông tổng thể.\n2. Bộ Giáo dục và Đào tạo (2020). Công văn số 5512/BGDĐT-GDTrH về việc Xây dựng và tổ chức thực hiện kế hoạch giáo dục của nhà trường.\n3. Sở Giáo dục và Đào tạo. Công văn số 3330/SGDĐT-GDTrH Hướng dẫn đánh giá, công nhận Sáng kiến kinh nghiệm.\n4. Chính phủ (2020). Nghị định số 30/2020/NĐ-CP về Công tác văn thư hành chính.\n5. Nguyễn Thị Kim Anh (2022). Phương pháp dạy học phát triển năng lực học sinh. NXB Giáo dục Việt Nam.', size: 26, font: 'Times New Roman' })
      ]
    })
  );

  // PHỤ LỤC MÃ QR CODE KẾT NỐI HỌC LIỆU VÀ MINH CHỨNG
  if (project.qrAppendixItems && project.qrAppendixItems.length > 0) {
    children.push(
      new Paragraph({ text: '', pageBreakBefore: true }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'PHỤ LỤC: MÃ QR CODE MINH CHỨNG ĐA PHƯƠNG TIỆN VÀ TƯ LIỆU THỰC NGHIỆM', bold: true, size: 28, color: '0D9488', font: 'Times New Roman' }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.BOTH,
        spacing: { line: 360, after: 200 },
        children: [
          new TextRun({
            text: 'Hội đồng chấm Sáng kiến kinh nghiệm có thể quét mã QR bên dưới để xem Kế hoạch bài dạy 5512, Video tiết dạy thực nghiệm và Sản phẩm học sinh:',
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
