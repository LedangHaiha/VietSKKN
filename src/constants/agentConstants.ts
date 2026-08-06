import { AgentInfo, AgentType } from '../types/agent';

export const AGENT_REGISTRY: Record<AgentType, AgentInfo> = {
  research: {
    id: 'research',
    name: 'Research Agent',
    roleTitle: 'Chuyên gia Pháp lý & Cơ sở Lý luận',
    avatarIcon: 'Search',
    color: 'from-blue-500 to-cyan-500',
    description: 'Phân tích đề tài, tra cứu văn bản quy phạm GDPT 2018, Nghị định 13/2012/NĐ-CP và tổng hợp tài liệu tham khảo khoa học.',
    capabilities: [
      'Tra cứu văn bản pháp lý GDPT 2018',
      'Đề xuất tài liệu tham khảo chính thống',
      'Phân tích cơ sở lý luận & thực tiễn',
      'Xác định mục tiêu & đối tượng nghiên cứu'
    ]
  },
  outline: {
    id: 'outline',
    name: 'Outline Agent',
    roleTitle: 'Kiến trúc sư Đề cương SKKN',
    avatarIcon: 'FileText',
    color: 'from-indigo-500 to-purple-500',
    description: 'Tạo dàn ý 4 Phần chuẩn quy định của Bộ/Sở GD&ĐT, phân bổ số trang phù hợp và kiểm tra tính logic toàn văn.',
    capabilities: [
      'Xây dựng cấu trúc 4 Phần chuẩn',
      'Đánh số tiểu mục tự động (1.1, 1.2...)',
      'Phân bổ dung lượng trang hợp lý',
      'Cân đối tỷ trọng giữa các chương'
    ]
  },
  writing: {
    id: 'writing',
    name: 'Writing Agent',
    roleTitle: 'Chuyên gia Bien soạn Văn bản Học thuật',
    avatarIcon: 'PenTool',
    color: 'from-emerald-500 to-teal-500',
    description: 'Biên soạn nội dung từng chương mục với văn phong sư phạm chuẩn mực, liên kết mạch lạc và tạo bảng biểu minh họa.',
    capabilities: [
      'Viết văn phong sư phạm học thuật',
      'Tự động chèn bảng biểu, sơ đồ',
      'Liên kết mạch lạc giữa các phần',
      'Tái cấu trúc câu chữ sinh động'
    ]
  },
  innovation: {
    id: 'innovation',
    name: 'Innovation Agent',
    roleTitle: 'Chuyên gia Giải pháp Sáng tạo & Tính mới',
    avatarIcon: 'Sparkles',
    color: 'from-amber-500 to-orange-500',
    description: 'Đề xuất 3-6 giải pháp giáo dục đột phá, tích hợp ma trận 5 phẩm chất & 10 năng lực GDPT 2018, so sánh ưu/nhược điểm.',
    capabilities: [
      'Sinh 3-6 giải pháp thiết thực',
      'Phân tích ưu điểm & hạn chế',
      'Làm nổi bật tính mới & điểm đột phá',
      'Gán ma trận năng lực GDPT 2018'
    ]
  },
  evidence: {
    id: 'evidence',
    name: 'Evidence Agent',
    roleTitle: 'Chuyên gia Thực nghiệm & Thống kê Dữ liệu',
    avatarIcon: 'BarChart3',
    color: 'from-rose-500 to-pink-500',
    description: 'Tạo phiếu khảo sát 5 mức độ Likert, tính toán chỉ số thống kê toán học (Mean, SD, T-Test) và sinh biểu đồ đối chứng.',
    capabilities: [
      'Thiết kế phiếu khảo sát thực nghiệm',
      'Tính toán số liệu toán thống kê',
      'Tạo biểu đồ đối chứng Trước/Sau',
      'Sinh phụ lục & hình ảnh minh họa'
    ]
  },
  review: {
    id: 'review',
    name: 'Review Agent',
    roleTitle: 'Thẩm định viên Thể thức & Chất lượng',
    avatarIcon: 'ShieldCheck',
    color: 'from-violet-500 to-fuchsia-500',
    description: 'Kiểm tra lỗi chính tả tiếng Việt, kiểm tra thể thức văn bản hành chính (Nghị định 30/2020), phát hiện nguy cơ trùng lặp.',
    capabilities: [
      'Rà soát lỗi chính tả & ngữ pháp',
      'Kiểm tra định dạng căn lề, font',
      'Đánh giá chỉ số trùng lặp đạo văn',
      'Đối chiếu tiêu chí Hội đồng chấm'
    ]
  },
  export: {
    id: 'export',
    name: 'Export Agent',
    roleTitle: 'Chuyên gia Xuất bản Đa định dạng',
    avatarIcon: 'Download',
    color: 'from-sky-500 to-blue-600',
    description: 'Đóng gói toàn bộ SKKN thành file Word (.docx), PDF chuẩn in ấn và Slide PowerPoint (.pptx) phục vụ báo cáo bảo vệ.',
    capabilities: [
      'Xuất file Word (.docx) chuẩn căn lề 2-2-3-2',
      'Xuất file PDF chất lượng cao',
      'Tự động tạo Slide báo cáo (.pptx)',
      'Tạo danh mục hình/bảng/viết tắt'
    ]
  }
};
