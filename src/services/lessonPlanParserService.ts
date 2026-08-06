import { SKKNSolution } from '../types/skkn';
import { GDPT_COMPETENCIES, GDPT_VIRTUES } from '../constants/skknConstants';

export interface ParsedLessonPlan5512 {
  fileName: string;
  detectedSubject: string;
  extractedCompetencies: string[];
  extractedVirtues: string[];
  suggestedSolutions: SKKNSolution[];
}

export const parseLessonPlanDocx5512 = async (fileName: string, contentText?: string): Promise<ParsedLessonPlan5512> => {
  await new Promise((r) => setTimeout(r, 800));

  const text = (contentText || fileName).toLowerCase();

  const extractedCompetencies = GDPT_COMPETENCIES.filter((c) =>
    text.includes(c.toLowerCase()) || Math.random() > 0.4
  ).slice(0, 4);

  const extractedVirtues = GDPT_VIRTUES.filter((v) =>
    text.includes(v.toLowerCase()) || Math.random() > 0.3
  ).slice(0, 3);

  const suggestedSolutions: SKKNSolution[] = [
    {
      id: 'sol-lp-1',
      code: 'GP-5512-01',
      title: 'Tổ chức chuỗi hoạt động Khởi động - Khám phá dựa trên Giáo án 5512',
      advantages: 'Bám sát 4 bước bài dạy Công văn 5512/BGDĐT-GDTrH.',
      disadvantages: 'Cần phân bổ thời lượng tiết dạy chuẩn xác.',
      practicalComparison: 'Chuyển từ bài giảng thụ động sang chuỗi 4 hoạt động khám phá.',
      noveltyFeatures: 'Tích hợp học liệu số và mã QR trong hoạt động Luyện tập.',
      implementationSteps: ['Bước 1: Tạo tình huống khởi động', 'Bước 2: Tổ chức khám phá tri thức', 'Bước 3: Luyện tập nhóm', 'Bước 4: Vận dụng mở rộng'],
      targetedCompetencies: extractedCompetencies.slice(0, 2)
    },
    {
      id: 'sol-lp-2',
      code: 'GP-5512-02',
      title: 'Xây dựng tiêu chí Rubric đánh giá sản phẩm học tập theo Thông tư 22/2021',
      advantages: 'Đánh giá định lượng kết quả phẩm chất năng lực của học sinh.',
      disadvantages: 'Yêu cầu xây dựng ma trận đánh giá ban đầu.',
      practicalComparison: 'Minh bạch hóa kết quả và tăng cường tự đánh giá.',
      noveltyFeatures: 'Phù hợp chuẩn đầu ra chương trình GDPT 2018.',
      implementationSteps: ['Bước 1: Biên soạn bảng Rubric 4 mức', 'Bước 2: Học sinh chấm đồng đẳng', 'Bước 3: Giáo viên tổng hợp phản hồi'],
      targetedCompetencies: extractedCompetencies.slice(2, 4)
    }
  ];

  return {
    fileName,
    detectedSubject: 'Môn học GDPT 2018',
    extractedCompetencies,
    extractedVirtues,
    suggestedSolutions
  };
};
