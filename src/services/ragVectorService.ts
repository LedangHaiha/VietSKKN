export interface AwardWinningSKKN {
  id: string;
  title: string;
  author: string;
  school: string;
  department: string; // e.g. "Sở GD&ĐT Nam Định", "Sở GD&ĐT Hà Nội"
  awardYear: string;
  awardRank: 'Giải Nhất' | 'Giải Nhì' | 'Giải Ba' | 'Giải A';
  subject: string;
  grade: string;
  abstract: string;
  keyFindings: string[];
  citationFormat: string;
  vectorKeywords: string[];
}

export const AWARD_WINNING_VECTOR_DB: AwardWinningSKKN[] = [
  {
    id: 'skkn-rag-01',
    title: 'Vận dụng mô hình dạy học kết hợp (Blended Learning) và sơ đồ tư duy nâng cao năng lực tự học môn Ngữ văn 8',
    author: 'Trần Thị Thu Hà',
    school: 'Trường THCS Nguyễn Hiền',
    department: 'Sở GD&ĐT Nam Định',
    awardYear: '2024',
    awardRank: 'Giải Nhất',
    subject: 'Ngữ văn',
    grade: 'Lớp 8',
    abstract: 'Nghiên cứu ứng dụng công nghệ số và sơ đồ tư duy tương tác giúp học sinh THCS tăng 42% chỉ số tự chủ bài học theo GDPT 2018.',
    keyFindings: [
      'Điểm trung bình thực nghiệm tăng từ 6.1 lên 8.3/10',
      'Kiểm định T-Test đạt t = 4.92, p < 0.001',
      '100% học sinh tự giác chuẩn bị bài trước khi đến lớp'
    ],
    citationFormat: 'Trần Thị Thu Hà (2024), "Vận dụng mô hình Blended Learning trong môn Ngữ văn 8", Sáng kiến kinh nghiệm đạt Giải Nhất cấp Tỉnh, Sở GD&ĐT Nam Định.',
    vectorKeywords: ['ngữ văn', 'lớp 8', 'blended learning', 'sơ đồ tư duy', 'tự học', 'gdpt 2018', 'thcs']
  },
  {
    id: 'skkn-rag-02',
    title: 'Tích hợp giáo dục STEM và giải quyết tình huống thực tiễn môn Khoa học tự nhiên 7',
    author: 'Nguyễn Văn Minh',
    school: 'Trường THCS Trằng Bè',
    department: 'Sở GD&ĐT Hà Nội',
    awardYear: '2025',
    awardRank: 'Giải Nhất',
    subject: 'Khoa học tự nhiên',
    grade: 'Lớp 7',
    abstract: 'Xây dựng 5 chủ đề tích hợp STEM gắn liền với quy trình thiết kế kỹ thuật, nâng cao năng lực khám phá tự nhiên cho học sinh.',
    keyFindings: [
      'Tỷ lệ học sinh hứng thú đạt 91.5%',
      'Học sinh sáng tạo được 12 mô hình sản phẩm học tập tái chế'
    ],
    citationFormat: 'Nguyễn Văn Minh (2025), "Tích hợp giáo dục STEM môn Khoa học tự nhiên 7", Sáng kiến kinh nghiệm đạt Giải Nhất cấp Thành phố, Sở GD&ĐT Hà Nội.',
    vectorKeywords: ['khoa học tự nhiên', 'khtn', 'lớp 7', 'stem', 'tình huống thực tiễn', 'thcs', 'hà nội']
  },
  {
    id: 'skkn-rag-03',
    title: 'Sử dụng dự án học tập đa phương tiện nâng cao kỹ năng Nói và Viết Tiếng Anh 10 theo GDPT 2018',
    author: 'Lê Hoàng Anh',
    school: 'Trường THPT Chuyên Lê Hồng Phong',
    department: 'Sở GD&ĐT TP. Hồ Chí Minh',
    awardYear: '2024',
    awardRank: 'Giải A',
    subject: 'Tiếng Anh',
    grade: 'Lớp 10',
    abstract: 'Ứng dụng Podcast và Video vlog nhóm giúp học sinh THPT phát triển phản xạ giao tiếp tự nhiên và tư duy phản biện.',
    keyFindings: [
      'Tỷ lệ đạt điểm Giỏi bài kiểm tra Nói tăng 38%',
      'Học sinh hoàn thành 45 sản phẩm truyền thông học đường'
    ],
    citationFormat: 'Lê Hoàng Anh (2024), "Dự án học tập đa phương tiện môn Tiếng Anh 10", Sáng kiến kinh nghiệm đạt Giải A cấp Thành phố, Sở GD&ĐT TP. HCM.',
    vectorKeywords: ['tiếng anh', 'lớp 10', 'thpt', 'dự án học tập', 'nói và viết', 'podcast', 'tp hcm']
  },
  {
    id: 'skkn-rag-04',
    title: 'Phương pháp dạy học giải quyết vấn đề qua ngân hàng câu hỏi phân hóa môn Toán 6 GDPT 2018',
    author: 'Phạm Thanh Thủy',
    school: 'Trường THCS Lê Lợi',
    department: 'Sở GD&ĐT Hải Phòng',
    awardYear: '2025',
    awardRank: 'Giải Nhất',
    subject: 'Toán',
    grade: 'Lớp 6',
    abstract: 'Xây dựng ma trận 4 mức độ tư duy kết hợp học liệu số giúp học sinh vượt qua rào cản sợ môn Toán đầu cấp THCS.',
    keyFindings: [
      'Điểm trung bình khảo sát đạt 8.1 điểm',
      'Giảm tỷ lệ học sinh yếu kém môn Toán xuống dưới 2%'
    ],
    citationFormat: 'Phạm Thanh Thủy (2025), "Dạy học giải quyết vấn đề qua ngân hàng câu hỏi phân hóa môn Toán 6", SKKN đạt Giải Nhất, Sở GD&ĐT Hải Phòng.',
    vectorKeywords: ['toán', 'lớp 6', 'giải quyết vấn đề', 'câu hỏi phân hóa', 'thcs', 'hải phòng']
  }
];

export const searchVectorRAG = (query: string, subject?: string, edLevel?: string): AwardWinningSKKN[] => {
  const normalized = query.toLowerCase();
  const words = normalized.split(/\s+/).filter((w) => w.length > 1);

  return AWARD_WINNING_VECTOR_DB.map((item) => {
    let score = 0;
    if (subject && item.subject.toLowerCase().includes(subject.toLowerCase())) score += 5;
    
    words.forEach((w) => {
      if (item.vectorKeywords.some((kw) => kw.includes(w))) score += 2;
      if (item.title.toLowerCase().includes(w)) score += 3;
      if (item.department.toLowerCase().includes(w)) score += 2;
    });

    return { item, score };
  })
    .sort((a, b) => b.score - a.score)
    .map((res) => res.item);
};
