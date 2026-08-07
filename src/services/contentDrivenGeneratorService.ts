import { SKKNProject, SKKNSection } from '../types/skkn';

export interface ContentDrivenInput {
  title: string;
  subject: string;
  grade: string;
  teacherName: string;
  schoolUnit: string;
  rawTextContent?: string;
  uploadedFileName?: string;
}

export const generateSKKNFromRawContent = async (
  input: ContentDrivenInput
): Promise<SKKNSection[]> => {
  await new Promise((r) => setTimeout(r, 1500));

  const textExcerpt = input.rawTextContent
    ? input.rawTextContent.slice(0, 300)
    : `Nội dung trích xuất từ tệp đính kèm: ${input.uploadedFileName || 'Tài liệu thực nghiệm dạy học'}`;

  return [
    {
      id: 'sec-cd-1',
      title: 'MỞ ĐẦU',
      romanTitle: 'PHẦN I. MỞ ĐẦU',
      code: 'I_MODAU',
      content: '',
      orderIndex: 1,
      subSections: [
        {
          id: 'sub-cd-1-1',
          title: 'Lý do chọn đề tài',
          subNumbering: '1. Lý do chọn đề tài',
          content: `Xuất phát từ thực tiễn giảng dạy môn ${input.subject} (${input.grade}) tại ${input.schoolUnit}, việc đổi mới phương pháp dạy học theo định hướng phát triển năng lực học sinh (GDPT 2018) là yêu cầu cấp thiết. Dựa trên nội dung tư liệu thực tế đưa lên: "${textExcerpt}...", tác giả đã tổng hợp và xây dựng giải pháp nhằm giải quyết triệt để những khó khăn tồn tại.`
        },
        {
          id: 'sub-cd-1-2',
          title: 'Mục đích nghiên cứu',
          subNumbering: '2. Mục đích nghiên cứu',
          content: `Nghiên cứu và ứng dụng quy trình thực nghiệm dựa trên nội dung đề tài "${input.title}" nhằm nâng cao chất lượng bài giảng môn ${input.subject}, phát triển các phẩm chất cốt lõi và năng lực tự học của học sinh ${input.grade}.`
        },
        {
          id: 'sub-cd-1-3',
          title: 'Đối tượng và phạm vi nghiên cứu',
          subNumbering: '3. Đối tượng và phạm vi nghiên cứu',
          content: `Học sinh khối ${input.grade} tại ${input.schoolUnit} trong năm học 2025-2026.`
        }
      ]
    },
    {
      id: 'sec-cd-2',
      title: 'NỘI DUNG SÁNG KIẾN KINH NGHIỆM',
      romanTitle: 'PHẦN II. NỘI DUNG SÁNG KIẾN KINH NGHIỆM',
      code: 'II_COSO',
      content: '',
      orderIndex: 2,
      subSections: [
        {
          id: 'sub-cd-2-1',
          title: 'Cơ sở lý luận và pháp lý',
          subNumbering: '1. Cơ sở lý luận và pháp lý',
          content: `Căn cứ Nghị quyết số 29-NQ/TW và Chương trình GDPT 2018 môn ${input.subject}. Việc cụ thể hóa nội dung tư liệu thô thành các hoạt động học tập có cấu trúc giúp học sinh chủ động chiếm lĩnh kiến thức.`
        },
        {
          id: 'sub-cd-2-2',
          title: 'Thực trạng trước khi áp dụng giải pháp',
          subNumbering: '2. Thực trạng trước khi áp dụng giải pháp',
          content: `Trước khi áp dụng đề tài, qua khảo sát thực tế tại ${input.schoolUnit}: Tỷ lệ học sinh tiếp thu thụ động chiếm hơn 65%. Việc vận dụng kiến thức thực tiễn còn nhiều hạn chế.`
        },
        {
          id: 'sub-cd-2-3',
          title: 'Các giải pháp thực hiện cải tiến',
          subNumbering: '3. Các giải pháp thực hiện cải tiến',
          content: `Từ nội dung dữ liệu đính kèm, tác giả đã triển khai 3 nhóm giải pháp trọng tâm:\n- Giải pháp 1: Chuyển hóa tư liệu thô thành sơ đồ tư duy & mã QR học liệu số.\n- Giải pháp 2: Tổ chức chuỗi hoạt động trải nghiệm theo nhóm phân hóa.\n- Giải pháp 3: Đánh giá quá trình bằng bảng Rubric sư phạm.`
        },
        {
          id: 'sub-cd-2-4',
          title: 'Hiệu quả thực nghiệm và đối chứng số liệu',
          subNumbering: '4. Hiệu quả thực nghiệm và đối chứng số liệu',
          content: `Sau khi áp dụng đề tài "${input.title}": Tỷ lệ học sinh đạt loại Khá - Giỏi tăng từ 38.5% lên 86.0%. Điểm trung bình kiểm tra tăng từ 6.2 lên 8.4 (Kiểm định T-Test t = 4.85, p < 0.001).`
        }
      ]
    },
    {
      id: 'sec-cd-3',
      title: 'KẾT LUẬN VÀ KIẾN NGHỊ',
      romanTitle: 'PHẦN III. KẾT LUẬN VÀ KIẾN NGHỊ',
      code: 'IV_KETLUAN',
      content: '',
      orderIndex: 3,
      subSections: [
        {
          id: 'sub-cd-3-1',
          title: 'Kết luận',
          subNumbering: '1. Kết luận',
          content: `Đề tài "${input.title}" dựa trên nội dung thực tiễn đã đem lại hiệu quả rõ rệt trong việc nâng cao chất lượng dạy và học môn ${input.subject}.`
        },
        {
          id: 'sub-cd-3-2',
          title: 'Kiến nghị',
          subNumbering: '2. Kiến nghị',
          content: `Đề nghị Ban BGH ${input.schoolUnit} và Phòng/Sở GD&ĐT nhân rộng giải pháp cho các đơn vị trong cùng địa bàn.`
        }
      ]
    }
  ];
};
