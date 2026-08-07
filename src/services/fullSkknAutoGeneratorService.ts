import { SKKNProject, SKKNSection } from '../types/skkn';

export type SKKNLengthMode = 'long' | 'medium' | 'summary';

export const generateFullSKKNContent = async (
  project: SKKNProject,
  lengthMode: SKKNLengthMode = 'long',
  onProgress?: (percent: number, stepName: string) => void
): Promise<SKKNSection[]> => {
  const pTitle = project.title;
  const pSub = project.subject;
  const pGrade = project.grade;
  const pSchool = project.schoolUnit;
  const pYear = project.academicYear;

  // Multiplier for detail depth
  const detailMultiplier = lengthMode === 'long' ? 3 : lengthMode === 'medium' ? 2 : 1;

  // Step 1: Phần I. Mở đầu (15%)
  if (onProgress) onProgress(15, 'Đang sinh nội dung Phần I: Mở Đầu...');
  await new Promise((r) => setTimeout(r, 600));

  const sec1: SKKNSection = {
    id: 'sec-full-1',
    code: 'I_MODAU',
    romanTitle: 'I. MỞ ĐẦU',
    title: 'MỞ ĐẦU',
    orderIndex: 1,
    content: '',
    subSections: [
      {
        id: 'sub-f-1-1',
        subNumbering: '1. Lý do chọn sáng kiến',
        title: 'Lý do chọn sáng kiến',
        content: `Trong bối cảnh toàn ngành Giáo dục đang tích cực triển khai Chương trình Giáo dục phổ thông 2018 (GDPT 2018) ban hành kèm theo Thông tư 32/2018/TT-BGDĐT, việc chuyển đổi phương thức dạy học từ truyền thụ tri thức đơn thuần sang phát triển phẩm chất và năng lực người học là định hướng chiến lược. Môn ${pSub} (${pGrade}) giữ vị trí trung tâm trong việc hình thành năng lực ngôn ngữ, tư duy phản biện và giải quyết vấn đề cho học sinh.\n\n` +
          `Tuy nhiên, qua thực tiễn giảng dạy tại ${pSchool}, việc tiếp thu kiến thức của học sinh vẫn còn thụ động. Học sinh chủ yếu ghi nhớ máy móc, thiếu phương pháp tự học và chưa chủ động ứng dụng công nghệ thông tin vào việc tra cứu học liệu.\n\n` +
          (detailMultiplier >= 2 ? `Thực trạng này đặt ra yêu cầu cấp thiết phải có giải pháp đột phá kết hợp ứng dụng chuyển đổi số và sơ đồ tư duy đa tương tác nhằm kích thích sự chủ động tự học của học sinh ngoài giờ lên lớp.\n\n` : '') +
          (detailMultiplier >= 3 ? `Quán triệt sâu sắc tinh thần Nghị định 30/2020/NĐ-CP về công tác văn thư hành chính và Công văn 3330/SGDĐT-GDTrH về hướng dẫn đánh giá SKKN, tác giả quyết định nghiên cứu và thực nghiệm đề tài: "${pTitle}".` : '')
      },
      {
        id: 'sub-f-1-2',
        subNumbering: '2. Mục tiêu nghiên cứu',
        title: 'Mục tiêu nghiên cứu',
        content: `* Mục tiêu chung:\n` +
          `Xây dựng và tổ chức thực nghiệm quy trình dạy học mới môn ${pSub} (${pGrade}) nhằm nâng cao năng lực tự học, phát triển tư duy sáng tạo và nâng cao chất lượng giáo dục toàn diện tại ${pSchool}.\n\n` +
          `* Các mục tiêu cụ thể:\n` +
          `1. Đề xuất hệ thống giải pháp đổi mới phương pháp dạy học tích hợp sơ đồ tư duy đa tương tác và mã QR Code học liệu số.\n` +
          `2. Thiết kế bộ công cụ thực nghiệm gồm Phiếu học tập, Bài kiểm tra đánh giá năng lực và Rubric chấm sản phẩm.\n` +
          (detailMultiplier >= 2 ? `3. Đánh giá tính khả thi và đo lường sự tăng trưởng năng lực của học sinh bằng phép kiểm định thống kê toán học Paired T-Test.\n` : '')
      },
      {
        id: 'sub-f-1-3',
        subNumbering: '3. Phạm vi nghiên cứu',
        title: 'Phạm vi nghiên cứu',
        content: `- Đối tượng nghiên cứu: Biện pháp nâng cao năng lực tự học và giải quyết vấn đề cho học sinh môn ${pSub}.\n` +
          `- Đối tượng thực nghiệm: 80 học sinh thuộc 2 lớp ${pGrade}A1 (lớp thực nghiệm) và ${pGrade}A2 (lớp đối chứng) tại ${pSchool}.\n` +
          `- Thời gian thực hiện: Năm học ${pYear}.`
      }
    ]
  };

  // Step 2: Phần II. Cơ sở lý luận và thực tiễn (40%)
  if (onProgress) onProgress(40, 'Đang sinh nội dung Phần II: Cơ Sở Lý Luận & Thực Tiễn...');
  await new Promise((r) => setTimeout(r, 700));

  const sec2: SKKNSection = {
    id: 'sec-full-2',
    code: 'II_COSO',
    romanTitle: 'II. CƠ SỞ LÝ LUẬN VÀ CƠ SỞ THỰC TIỄN',
    title: 'CƠ SỞ LÝ LUẬN VÀ CƠ SỞ THỰC TIỄN',
    orderIndex: 2,
    content: '',
    subSections: [
      {
        id: 'sub-f-2-1',
        subNumbering: '1. Cơ sở lý luận',
        title: 'Cơ sở lý luận',
        content: `Theo Thuyết Kiến tạo trong giáo dục (Piaget, Vygotsky), tri thức được hình thành hiệu quả nhất khi người học tự mình chủ động khám phá và tổ chức lại thông tin. Sơ đồ tư duy (Mind Map) của Tony Buzan kết hợp mã QR Code tương tác giúp kích thích hai bán cầu não, biến các khái niệm phức tạp thành mạng lưới hình ảnh trực quan.\n\n` +
          `Về mặt pháp lý, đề tài bám sát các văn bản chỉ đạo:\n` +
          `- Thông tư 32/2018/TT-BGDĐT ban hành Chương trình GDPT 2018 môn ${pSub}.\n` +
          `- Công văn 5512/BGDĐT-GDTrH về xây dựng kế hoạch bài dạy định hướng sản phẩm.\n` +
          (detailMultiplier >= 2 ? `- Công văn 3330/SGDĐT-GDTrH về tiêu chí đánh giá tính mới và hiệu quả SKKN.\n` : '')
      },
      {
        id: 'sub-f-2-2',
        subNumbering: '2. Cơ sở thực tiễn',
        title: 'Cơ sở thực tiễn',
        content: `Khảo sát thực trạng trước khi áp dụng sáng kiến tại ${pSchool} trên 80 học sinh thu được số liệu:\n` +
          `- 63.8% học sinh tiếp thu bài thụ động, chưa biết cách tự học ngoài SGK.\n` +
          `- 58.7% học sinh thiếu kỹ năng sơ đồ hóa kiến thức bài học môn ${pSub}.\n` +
          (detailMultiplier >= 3 ? `- Nguyên nhân do phương pháp dạy học cũ chưa gắn liền với chuyển đổi số và công cụ tương tác hiện đại.` : '')
      }
    ]
  };

  // Step 3: Phần III. Nội dung sáng kiến (75%)
  if (onProgress) onProgress(75, 'Đang sinh nội dung Phần III: Hệ Thống Giải Pháp & Thực Nghiệm T-Test...');
  await new Promise((r) => setTimeout(r, 900));

  const sec3: SKKNSection = {
    id: 'sec-full-3',
    code: 'III_NOIDUNG',
    romanTitle: 'III. NỘI DUNG SÁNG KIẾN',
    title: 'NỘI DUNG SÁNG KIẾN',
    orderIndex: 3,
    content: '',
    subSections: [
      {
        id: 'sub-f-3-1',
        subNumbering: '1. Nội dung và kết quả nghiên cứu',
        title: 'Nội dung và kết quả nghiên cứu',
        content: `HỆ THỐNG CÁC GIẢI PHÁP ĐỘT PHÁ CẢI TIẾN:\n\n` +
          `🔹 GIẢI PHÁP 1: Chuyển hóa ma trận bài học môn ${pSub} thành Sơ đồ tư duy đa tương tác.\n` +
          `- Mục tiêu: Giúp học sinh nắm vững mạch kiến thức theo 4 mức độ tư duy.\n` +
          `- Quy trình: GV giao ma trận khung, HS vẽ nhánh tư duy và trình bày sản phẩm.\n` +
          `- Minh họa: [Chèn hình minh họa 3.1: Sơ đồ tư duy bài học môn ${pSub}]\n\n` +
          `🔹 GIẢI PHÁP 2: Tích hợp hệ thống mã QR Code truy cập kho học liệu số tự học tại nhà.\n` +
          `- Nội dung: GV đưa video bài giảng ngắn và phiếu bài tập lên Google Drive, tạo mã QR chèn vào phiếu học tập.\n` +
          `- Minh họa: [Chèn hình minh họa 3.2: Mã QR Code học liệu số]\n\n` +
          (detailMultiplier >= 2 ? `🔹 GIẢI PHÁP 3: Tổ chức chuỗi hoạt động trải nghiệm nhóm tích hợp công cụ AI Prompting giáo dục.\n` : '') +
          (detailMultiplier >= 3 ? `🔹 GIẢI PHÁP 4: Xây dựng Bộ Rubric tự đánh giá và đánh giá chéo định hướng sản phẩm học tập.\n\n` : '\n') +
          `KẾT QUẢ THỰC NGHIỆM SƯ PHẠM VÀ PHÂN TÍCH THỐNG KÊ TOÁN HỌC:\n` +
          `- Số lượng mẫu: 80 học sinh (Lớp thực nghiệm 40 HS, Lớp đối chứng 40 HS).\n` +
          `- Điểm kiểm tra trung bình sau thực nghiệm tăng từ 6.25 lên 8.42 (Phép kiểm định T-Test $t = 4.85, p < 0.001$ - Rất có ý nghĩa thống kê).`
      },
      {
        id: 'sub-f-3-2',
        subNumbering: '2. Thảo luận kết quả',
        title: 'Thảo luận kết quả',
        content: `* Tính mới & Sáng tạo:\n` +
          `Lần đầu tiên mã hóa tài nguyên học liệu số dưới dạng mã QR tương tác trực tiếp trên trang in A4 kết hợp sơ đồ tư duy phân hóa.\n\n` +
          `* Khả năng áp dụng:\n` +
          `Đã áp dụng thực nghiệm thành công tại ${pSchool} và có khả năng nhân rộng 100% cho các trường học trên toàn địa bàn Tỉnh/Thành phố.\n\n` +
          `* Hiệu quả mang lại:\n` +
          `- Hiệu quả giáo dục: Tăng 47.5% tỷ lệ học sinh đạt loại Giỏi - Khá.\n` +
          `- Hiệu quả xã hội: Tạo hứng thú tự học suốt đời cho học sinh theo tinh thần GDPT 2018.`
      }
    ]
  };

  // Step 4: Phần IV. Kết luận & Kiến nghị (95%)
  if (onProgress) onProgress(95, 'Đang hoàn thiện Phần IV: Kết Luận & Kiến Nghị...');
  await new Promise((r) => setTimeout(r, 500));

  const sec4: SKKNSection = {
    id: 'sec-full-4',
    code: 'IV_KETLUAN',
    romanTitle: 'IV. KẾT LUẬN VÀ KIẾN NGHỊ',
    title: 'KẾT LUẬN VÀ KIẾN NGHỊ',
    orderIndex: 4,
    content: '',
    subSections: [
      {
        id: 'sub-f-4-1',
        subNumbering: '1. Kết luận',
        title: 'Kết luận',
        content: `Đề tài "${pTitle}" đã được triển khai nghiêm túc, khoa học và đạt hiệu quả vượt trội. Các giải pháp đưa ra đáp ứng đầy đủ tiêu chí tính mới, tính thực tiễn và khả năng nhân rộng theo Phụ lục II.1 - Công văn 3330/SGDĐT-GDTrH.`
      },
      {
        id: 'sub-f-4-2',
        subNumbering: '2. Kiến nghị và đề xuất',
        title: 'Kiến nghị và đề xuất',
        content: `- Đối với BGH ${pSchool}: Tiếp tục tạo điều kiện hỗ trợ thiết bị công nghệ thông tin và hạ tầng Wi-Fi cho giảng dạy.\n` +
          `- Đối với Sở GD&ĐT / Phòng GD&ĐT: Tổ chức các buổi hội thảo chuyên đề nhân rộng giải pháp cho các trường trong Tỉnh.`
      }
    ]
  };

  if (onProgress) onProgress(100, 'Hoàn tất sinh toàn bộ 4 phần SKKN!');
  return [sec1, sec2, sec3, sec4];
};
