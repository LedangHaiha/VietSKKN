import { EducationLevel } from '../types/skkn';

export interface WorkflowStepInfo {
  step: number;
  title: string;
  desc: string;
  agentId: 'research' | 'outline' | 'writing' | 'innovation' | 'evidence' | 'review' | 'export';
}

export const WORKFLOW_STEPS: WorkflowStepInfo[] = [
  { step: 1, title: 'Khởi tạo dự án', desc: 'Đặt tên dự án và xác định mục tiêu ban đầu', agentId: 'research' },
  { step: 2, title: 'Thông tin giáo viên', desc: 'Nhập họ tên, chức danh, chuyên môn tác giả', agentId: 'research' },
  { step: 3, title: 'Thông tin đơn vị', desc: 'Nhập Trường, Phòng GD&ĐT, Sở GD&ĐT', agentId: 'research' },
  { step: 4, title: 'Chọn cấp học', desc: 'Tiểu học, THCS, THPT hoặc Mầm non', agentId: 'research' },
  { step: 5, title: 'Chọn môn học', desc: 'Theo chương trình khung GDPT 2018', agentId: 'research' },
  { step: 6, title: 'Chọn khối lớp', desc: 'Khối lớp thực nghiệm và giảng dạy', agentId: 'research' },
  { step: 7, title: 'Nhập tên đề tài', desc: 'Đặt tên sáng kiến kinh nghiệm chuẩn sư phạm', agentId: 'research' },
  { step: 8, title: 'Phân tích đề tài', desc: 'AI phân tích tính mới, phạm vi và tính khả thi', agentId: 'research' },
  { step: 9, title: 'Đề xuất cải tiến', desc: 'Gợi ý mở rộng tên đề tài và phạm vi ứng dụng', agentId: 'research' },
  { step: 10, title: 'Xây dựng đề cương', desc: 'Tạo cấu trúc 4 Phần chuẩn theo quy định', agentId: 'outline' },
  { step: 11, title: 'Viết từng chương', desc: 'Sinh nội dung chi tiết cho từng mục và tiểu mục', agentId: 'writing' },
  { step: 12, title: 'Tạo giải pháp', desc: 'Đề xuất 3-6 giải pháp đột phá gắn với GDPT 2018', agentId: 'innovation' },
  { step: 13, title: 'Tạo minh chứng', desc: 'Sinh phiếu khảo sát, số liệu thực nghiệm & biểu đồ', agentId: 'evidence' },
  { step: 14, title: 'Kiểm tra chất lượng', desc: 'Soát chính tả, thể thức Nghị định 30 & trùng lặp', agentId: 'review' },
  { step: 15, title: 'Xuất tài liệu', desc: 'Tải về file Word (.docx), PDF và Slide (.pptx)', agentId: 'export' },
];

export const EDUCATION_SUBJECTS: Record<EducationLevel, string[]> = {
  'Tiểu học': ['Toán', 'Tiếng Việt', 'Tiếng Anh', 'Tự nhiên và Xã hội', 'Lịch sử và Địa lý', 'Khoa học', 'Tin học và Công nghệ', 'Đạo đức', 'Âm nhạc', 'Mỹ thuật', 'Giáo dục thể chất', 'Hoạt động trải nghiệm'],
  'THCS': ['Toán', 'Ngữ văn', 'Tiếng Anh', 'Khoa học tự nhiên', 'Lịch sử và Địa lý', 'GDCD', 'Tin học', 'Công nghệ', 'Âm nhạc', 'Mỹ thuật', 'Giáo dục thể chất', 'Hoạt động trải nghiệm, hướng nghiệp'],
  'THPT': ['Toán', 'Ngữ văn', 'Tiếng Anh', 'Vật lý', 'Hóa học', 'Sinh học', 'Lịch sử', 'Địa lý', 'Giáo dục kinh tế và pháp luật', 'Tin học', 'Công nghệ', 'Âm nhạc', 'Mỹ thuật', 'Giáo dục thể chất', 'Giáo dục quốc phòng và an ninh', 'Hoạt động trải nghiệm, hướng nghiệp'],
  'Mầm nông': ['Phát triển thể chất', 'Phát triển nhận thức', 'Phát triển ngôn ngữ', 'Phát triển tình cảm và kỹ năng xã hội', 'Phát triển thẩm mỹ'],
  'GDTX': ['Toán', 'Ngữ văn', 'Tiếng Anh', 'Vật lý', 'Hóa học', 'Sinh học', 'Lịch sử', 'Địa lý']
};

export const SAMPLE_SKKN_TOPICS = [
  'Biện pháp nâng cao năng lực tự học cho học sinh thông qua ứng dụng sơ đồ tư duy và công nghệ thông tin trong môn Ngữ văn GDPT 2018',
  'Một số giải pháp tích hợp giáo dục STEM vào giảng dạy môn Khoa học tự nhiên nhằm phát triển năng lực giải quyết vấn đề cho học sinh THCS',
  'Sử dụng các trò chơi học tập đa tương tác nhằm nâng cao hiệu quả dạy học môn Tiếng Anh khối lớp 4 theo Chương trình GDPT 2018',
  'Giải pháp tổ chức hoạt động trải nghiệm sáng tạo nhằm giáo dục phẩm chất yêu nước và trách nhiệm cho học sinh THPT',
  'Xây dựng ngân hàng câu hỏi định hướng phát triển năng lực tư duy logic trong môn Toán lớp 8 theo chuẩn GDPT 2018'
];

export const GDPT_COMPETENCIES = [
  'Năng lực Tự chủ và Tự học',
  'Năng lực Giao tiếp và Hợp tác',
  'Năng lực Giải quyết vấn đề và Sáng tạo',
  'Năng lực Ngôn ngữ',
  'Năng lực Tính toán',
  'Năng lực Khoa học',
  'Năng lực Công nghệ',
  'Năng lực Tin học',
  'Năng lực Thẩm mỹ',
  'Năng lực Thể chất'
];

export const GDPT_VIRTUES = [
  'Yêu nước',
  'Nhân ái',
  'Chăm chỉ',
  'Trung thực',
  'Trách nhiệm'
];
