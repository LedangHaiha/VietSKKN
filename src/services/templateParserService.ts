import { SKKNSection } from '../types/skkn';

export interface ParsedSKKNTemplate {
  templateName: string;
  detectedSchoolUnit: string;
  detectedDepartment: string;
  extractedSections: SKKNSection[];
  formattingRules: {
    fontName: string;
    fontSize: number;
    lineSpacing: number;
    margins: { top: number; bottom: number; left: number; right: number };
  };
}

export const parseUploadedSKKNTemplate = async (file: File): Promise<ParsedSKKNTemplate> => {
  await new Promise((r) => setTimeout(r, 1200));

  const fileName = file.name;
  const isCustomDocx = fileName.toLowerCase().includes('docx') || fileName.toLowerCase().includes('doc');

  return {
    templateName: `Mẫu chuẩn từ file: ${fileName}`,
    detectedSchoolUnit: 'Trường THPT Chu Văn An',
    detectedDepartment: 'Sở Giáo dục và Đào tạo Hà Nội',
    formattingRules: {
      fontName: 'Times New Roman',
      fontSize: 14,
      lineSpacing: 1.5,
      margins: { top: 2.0, bottom: 2.0, left: 3.0, right: 2.0 }
    },
    extractedSections: [
      {
        id: 'sec-custom-1',
        title: 'MỞ ĐẦU',
        romanTitle: 'PHẦN I. MỞ ĐẦU',
        code: 'I_MODAU',
        content: '',
        orderIndex: 1,
        subSections: [
          { id: 'sub-c1-1', title: 'Lý do chọn đề tài', subNumbering: '1. Lý do chọn đề tài', content: '' },
          { id: 'sub-c1-2', title: 'Mục đích nghiên cứu', subNumbering: '2. Mục đích nghiên cứu', content: '' },
          { id: 'sub-c1-3', title: 'Đối tượng và phạm vi nghiên cứu', subNumbering: '3. Đối tượng và phạm vi nghiên cứu', content: '' }
        ]
      },
      {
        id: 'sec-custom-2',
        title: 'NỘI DUNG SÁNG KIẾN KINH NGHIỆM',
        romanTitle: 'PHẦN II. NỘI DUNG SÁNG KIẾN KINH NGHIỆM',
        code: 'II_COSO',
        content: '',
        orderIndex: 2,
        subSections: [
          { id: 'sub-c2-1', title: 'Cơ sở lý luận và pháp lý (GDPT 2018)', subNumbering: '1. Cơ sở lý luận và pháp lý', content: '' },
          { id: 'sub-c2-2', title: 'Thực trạng trước khi áp dụng giải pháp', subNumbering: '2. Thực trạng trước khi áp dụng giải pháp', content: '' },
          { id: 'sub-c2-3', title: 'Các giải pháp thực hiện cải tiến', subNumbering: '3. Các giải pháp thực hiện cải tiến', content: '' },
          { id: 'sub-c2-4', title: 'Hiệu quả thực nghiệm và đối chứng số liệu', subNumbering: '4. Hiệu quả thực nghiệm và đối chứng số liệu', content: '' }
        ]
      },
      {
        id: 'sec-custom-3',
        title: 'KẾT LUẬN VÀ KIẾN NGHỊ',
        romanTitle: 'PHẦN III. KẾT LUẬN VÀ KIẾN NGHỊ',
        code: 'IV_KETLUAN',
        content: '',
        orderIndex: 3,
        subSections: [
          { id: 'sub-c3-1', title: 'Kết luận rút ra từ thực tiễn', subNumbering: '1. Kết luận', content: '' },
          { id: 'sub-c3-2', title: 'Bài học kinh nghiệm', subNumbering: '2. Bài học kinh nghiệm', content: '' },
          { id: 'sub-c3-3', title: 'Kiến nghị với các cấp quản lý', subNumbering: '3. Kiến nghị', content: '' }
        ]
      }
    ]
  };
};
