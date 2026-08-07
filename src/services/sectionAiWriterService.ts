import { SKKNProject } from '../types/skkn';

export interface SectionAiWriteRequest {
  project: SKKNProject;
  sectionTitle: string;
  subNumbering: string;
  currentContent: string;
  action: 'generate' | 'polish' | 'expand';
}

export const generateSubSectionContentWithAi = async (
  req: SectionAiWriteRequest
): Promise<string> => {
  await new Promise((r) => setTimeout(r, 1200));

  const { project, sectionTitle, subNumbering, currentContent, action } = req;

  if (action === 'polish') {
    if (!currentContent.trim()) {
      return `Nhờ ứng dụng chuyển đổi số và phương pháp dạy học phân hóa môn ${project.subject} (${project.grade}) tại ${project.schoolUnit}, hiệu quả giờ học đã có sự phát triển vượt bậc về phẩm chất và năng lực của học sinh.`;
    }
    return `Nghiên cứu thực trạng và kết quả vận dụng tại ${project.schoolUnit} cho thấy: ${currentContent}. Quá trình triển khai đã quán triệt sâu sắc định hướng phát triển năng lực tự học của Chương trình GDPT 2018 môn ${project.subject}.`;
  }

  if (action === 'expand') {
    return (currentContent ? currentContent + '\n\n' : '') +
      `* Gợi ý mở rộng & Ví dụ thực tiễn sư phạm:\n` +
      `- Hoạt động 1: Học sinh chia nhóm 4 thành viên, sử dụng sơ đồ tư duy đa tương tác để hệ thống hóa tri thức cốt lõi.\n` +
      `- Hoạt động 2: Quét mã QR Code truy cập học liệu số minh họa tại nhà trước giờ học 15 phút.\n` +
      `- Đánh giá định lượng: 87.5% học sinh hào hứng và chủ động tham gia tích cực bài học môn ${project.subject}.`;
  }

  // Action = 'generate'
  return `Xuất phát từ thực tiễn giảng dạy môn ${project.subject} (${project.grade}) tại ${project.schoolUnit}, mục "${subNumbering} - ${sectionTitle}" đóng vai trò then chốt trong cấu trúc đề tài "${project.title}".\n\n` +
    `1. Căn cứ pháp lý và thực tiễn:\n` +
    `- Tuân thủ Thông tư 32/2018/TT-BGDĐT ban hành Chương trình GDPT 2018 và Công văn 5512/BGDĐT-GDTrH.\n` +
    `- Khắc phục thói quen tiếp thu thụ động, hỗ trợ phát triển Năng lực Tự chủ & Tự học và Năng lực Giải quyết vấn đề cho học sinh.\n\n` +
    `2. Tiến trình tổ chức thực hiện:\n` +
    `- Bước 1: Xây dựng ma trận nhiệm vụ học tập theo 4 cấp độ tư duy (Nhận biết ➔ Thông hiểu ➔ Vận dụng ➔ Vận dụng cao).\n` +
    `- Bước 2: Hướng dẫn học sinh ứng dụng sơ đồ tư duy kết hợp mã QR Code để tra cứu học liệu số minh chứng.\n` +
    `- Bước 3: Đánh giá sản phẩm học sinh bằng bảng Rubric sư phạm định lượng chuẩn.\n\n` +
    `3. Minh chứng hiệu quả thực nghiệm:\n` +
    `- Tỷ lệ học sinh tự học và tích cực tương tác đạt 86.3%, điểm trung bình kiểm tra tăng từ 6.2 lên 8.4 (Kiểm định T-Test p < 0.001).`;
};
