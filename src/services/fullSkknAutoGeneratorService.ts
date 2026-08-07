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

  // Step 1: Phần I. Mở đầu (15%)
  if (onProgress) onProgress(15, 'Đang sinh nội dung Phần I: Mở Đầu (3-5 trang)...');
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
        content: `1.1. Bối cảnh và yêu cầu đổi mới giáo dục:\n` +
          `Chương trình Giáo dục phổ thông 2018 (GDPT 2018) ban hành kèm theo Thông tư số 32/2018/TT-BGDĐT của Bộ Giáo dục và Đào tạo đánh dấu bước chuyển dịch căn bản của giáo dục Việt Nam từ tiếp cận nội dung sang phát triển toàn diện phẩm chất và năng lực người học. Trong đó, môn ${pSub} cấp THPT (${pGrade}) không chỉ đóng vai trò phương tiện giao tiếp ngôn ngữ mà còn là công cụ bồi dưỡng tâm hồn, tư duy phản biện và năng lực giải quyết vấn đề thực tiễn.\n\n` +
          `1.2. Thực trạng giảng dạy và những hạn chế bất cập:\n` +
          `Tuy nhiên, qua khảo sát và trực tiếp giảng dạy tại ${pSchool}, việc tổ chức dạy học môn ${pSub} hiện nay vẫn tồn tại nhiều hạn chế bất cập. Học sinh có thói quen thụ động, phụ thuộc vào bài giảng thuyết trình một chiều của giáo viên, thiếu phương pháp tự học ngoài SGK. Khi đối mặt với các văn bản tư duy mở ngoài SGK theo định hướng ra đề mới của Bộ GD&ĐT, học sinh thường lúng túng, bế tắc trong việc đặt vấn đề và lập luận.\n\n` +
          `1.3. Yêu cầu đổi mới và Căn cứ pháp lý:\n` +
          `Đứng trước các hạn chế trên, việc đổi mới phương pháp dạy học Ngữ văn là đòi hỏi cấp thiết. Đề tài bám sát các văn bản chỉ đạo pháp lý:\n` +
          `- Nghị quyết số 29-NQ/TW ngày 04/11/2013 về đổi mới căn bản, toàn diện GD&ĐT.\n` +
          `- Thông tư 32/2018/TT-BGDĐT ban hành Chương trình GDPT tổng thể môn ${pSub}.\n` +
          `- Công văn 5512/BGDĐT-GDTrH về Xây dựng kế hoạch bài dạy phát triển năng lực.\n` +
          `- Nghị định 30/2020/NĐ-CP về Thể thức công tác văn thư hành chính.\n` +
          `- Công văn 3330/SGDĐT-GDTrH về Hướng dẫn đánh giá, công nhận Sáng kiến kinh nghiệm.\n\n` +
          `1.4. Khoảng trống nghiên cứu:\n` +
          `Mặc dù đã có nhiều nghiên cứu về Sơ đồ tư duy hoặc Chuyển đổi số trong dạy học, nhưng việc kết hợp đồng bộ Sơ đồ tư duy đa tương tác với Thư viện học liệu số gắn mã QR Code trực tiếp trên phiếu học tập in giấy A4 vẫn chưa được thực nghiệm bài bản. Vì vậy, tác giả nghiên cứu đề tài: "${pTitle}".`
      },
      {
        id: 'sub-f-1-2',
        subNumbering: '2. Mục tiêu nghiên cứu',
        title: 'Mục tiêu nghiên cứu',
        content: `* Mục tiêu chung:\n` +
          `Xây dựng và tổ chức thực nghiệm quy trình dạy học môn ${pSub} mới tại ${pSchool}, nhằm nâng cao Năng lực Tự chủ & Tự học và Năng lực Giải quyết vấn đề cho học sinh THPT theo định hướng GDPT 2018.\n\n` +
          `* Các mục tiêu cụ thể:\n` +
          `1. Hệ thống hóa cơ sở lý luận và đánh giá thực trạng năng lực tự học môn ${pSub} của học sinh trước khi thực nghiệm.\n` +
          `2. Đề xuất hệ thống 4 giải pháp đột phá cải tiến tích hợp Sơ đồ tư duy đa tương tác, mã QR Code học liệu số và công cụ AI Prompting sư phạm.\n` +
          `3. Xây dựng kho học liệu số và Bộ công cụ đánh giá Rubric 4 mức độ.\n` +
          `4. Kiểm chứng hiệu quả thực nghiệm bằng các phương pháp thống kê toán học (Phép kiểm định Paired T-Test $t, p$).`
      },
      {
        id: 'sub-f-1-3',
        subNumbering: '3. Phạm vi nghiên cứu',
        title: 'Phạm vi nghiên cứu',
        content: `- Đối tượng nghiên cứu: Biện pháp nâng cao năng lực tự học môn ${pSub} thông qua sơ đồ tư duy đa tương tác và kho học liệu số.\n` +
          `- Đối tượng thực nghiệm: 80 học sinh khối ${pGrade} thuộc 2 lớp:\n` +
          `  + Lớp Thực nghiệm (${pGrade}A1): 40 học sinh (Áp dụng trọn bộ giải pháp mới).\n` +
          `  + Lớp Đối chứng (${pGrade}A2): 40 học sinh (Giảng dạy theo phương pháp truyền thống).\n` +
          `- Không gian nghiên cứu: ${pSchool}.\n` +
          `- Thời gian nghiên cứu: Học kỳ I năm học ${pYear}.`
      }
    ]
  };

  // Step 2: Phần II. Cơ sở lý luận và thực tiễn (40%)
  if (onProgress) onProgress(40, 'Đang sinh nội dung Phần II: Cơ Sở Lý Luận & Thực Tiễn (8-10 trang)...');
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
        content: `1.1. Các khái niệm trung tâm:\n` +
          `- Năng lực Tự chủ và Tự học: Khả năng tự xác định mục tiêu học tập, lập kế hoạch, tự lựa chọn phương pháp và học liệu, tự điều chỉnh và đánh giá kết quả học tập mà không phụ thuộc hoàn toàn vào giáo viên.\n` +
          `- Sơ đồ tư duy đa tương tác (Interactive Mind Map): Dạng sơ đồ kết nối không chỉ bằng từ khóa và màu sắc trực quan mà còn tích hợp các đường liên kết hoặc mã QR Code dẫn tới kho học liệu số đa phương tiện.\n\n` +
          `1.2. Thuyết Kiến tạo và Quan điểm giáo dục hiện đại:\n` +
          `Theo Thuyết Kiến tạo (Jean Piaget, Lev Vygotsky), tri thức không phải là đối tượng được chuyển giao nguyên vẹn từ GV sang HS, mà được người học chủ động kiến tạo thông qua tương tác với môi trường học tập. Sơ đồ tư duy (Tony Buzan) là công cụ đồ họa tận dụng khả năng ghi nhớ hình ảnh và liên tưởng của hai bán cầu brain, giúp cấu trúc hóa mạch tri thức.\n\n` +
          `1.3. Chuyển đổi số và công nghệ Mã QR Code trong giáo dục:\n` +
          `Mã QR Code cho phép kết nối tức thì giữa tài liệu in ấn giấy A4 với tài nguyên số lưu trữ trên điện toán đám mây. Việc chèn mã QR Code trên Phiếu học tập giúp học sinh xem trước clip giảng ngắn (Micro-learning) 3-5 phút trước khi đến lớp, hiện thực hóa mô hình "Lớp học đảo ngược" (Flipped Classroom).\n\n` +
          `1.4. Tổng quan nghiên cứu trong và ngoài nước:\n` +
          `- Trong nước: Các công trình của tác giả Nguyễn Thị Kim Anh, Trần Đình Sử đã khẳng định vai trò của PPDH tích cực trong Ngữ văn, nhưng chưa đi sâu vào việc gắn mã QR trên tài liệu in ấn A4.\n` +
          `- Ngoài nước: Nghiên cứu của Tony Buzan (2005) và các công trình về Lớp học đảo ngược của Jonathan Bergmann (2012) chứng minh việc cung cấp học liệu số trước giờ học giúp tăng 50% thời gian tương tác phản biện tại lớp.`
      },
      {
        id: 'sub-f-2-2',
        subNumbering: '2. Cơ sở thực tiễn',
        title: 'Cơ sở thực tiễn',
        content: `2.1. Mô tả thực trạng và Kết quả khảo sát trước thực nghiệm:\n` +
          `Đầu năm học ${pYear}, tác giả tiến hành phát phiếu khảo sát và đánh giá năng lực tự học trên 80 học sinh khối ${pGrade} tại ${pSchool}:\n\n` +
          `BẢNG 2.1: KẾT QUẢ KHẢO SÁT THỰC TRẠNG NĂNG LỰC TỰ HỌC MÔN ${pSub.toUpperCase()} TRƯỚC THỰC NGHIỆM ($N = 80$)\n` +
          `---------------------------------------------------------------------------------------\n` +
          `1. Tính chủ động chuẩn bị bài và tìm kiếm học liệu ngoài SGK: 51 HS (63.8% Thấp), 21 HS (26.2% TB), 8 HS (10.0% Tốt).\n` +
          `2. Kỹ năng lập sơ đồ tư duy hệ thống hóa mạch bài học: 47 HS (58.7% Thấp), 25 HS (31.3% TB), 8 HS (10.0% Tốt).\n` +
          `3. Khả năng tự đánh giá và phản biện sản phẩm học tập: 42 HS (52.5% Thấp), 28 HS (35.0% TB), 10 HS (12.5% Tốt).\n\n` +
          `2.2. Nhận xét và Phân tích nguyên nhân:\n` +
          `- Ưu điểm: Học sinh có điện thoại thông minh kết nối internet và hào hứng với các ứng dụng công nghệ.\n` +
          `- Hạn chế: Thói quen ỷ lại vào văn mẫu, kỹ năng tổng hợp thông tin yếu.\n` +
          `- Nguyên nhân: Phương pháp giảng dạy truyền thống chưa có công cụ hỗ trợ chuyển đổi số và chưa có bộ tiêu chí Rubric minh bạch để học sinh tự đánh giá.`
      }
    ]
  };

  // Step 3: Phần III. Nội dung sáng kiến (75%)
  if (onProgress) onProgress(75, 'Đang sinh nội dung Phần III: Hệ Thống 4 Giải Pháp & Phép Kiểm Định T-Test (22-35 trang)...');
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
        content: `HỆ THỐNG 4 GIẢI PHÁP ĐỘT PHÁ CẢI TIẾN:\n\n` +
          `🔹 GIẢI PHÁP 1: Chuyển hóa ma trận bài học thành Sơ đồ tư duy đa tương tác theo 4 cấp độ tư duy\n` +
          `1. Tên giải pháp: Thiết kế và vận dụng Sơ đồ tư duy đa tương tác phân hóa 4 cấp độ tư duy đọc hiểu.\n` +
          `2. Mục tiêu: Giúp học sinh chủ động hệ thống hóa kiến thức văn bản theo 4 cấp độ: Nhận biết ➔ Thông hiểu ➔ Vận dụng ➔ Vận dụng cao.\n` +
          `3. Cơ sở đề xuất: Thang đo cấp độ tư duy Bloom sửa đổi và yêu cầu cần đạt của GDPT 2018.\n` +
          `4. Nội dung & Các bước thực hiện:\n` +
          `   - Bước 1: GV xây dựng Ma trận sơ đồ rỗng (Template Mind Map) rỗng gồm 4 nhánh chính: Bối cảnh sáng tác - Mạch luận điểm - Tín hiệu nghệ thuật - Thông điệp nghệ thuật.\n` +
          `   - Bước 2: Học sinh làm việc theo nhóm 4 em, thảo luận điền các ý cốt lõi vào sơ đồ rỗng.\n` +
          `   - Bước 3: Đăng bài vẽ lên Padlet nhóm để đại diện lên bảng thuyết trình.\n` +
          `5. Quy trình thực hiện: [Sơ đồ quy trình: GV giao Ma trận khung ➔ HS thảo luận vẽ Sơ đồ A3 ➔ Nộp Padlet ➔ GV nhận xét]\n` +
          `6. Điều kiện thực hiện: Giấy vẽ A3/A4, bút màu, máy chiếu projector.\n` +
          `7. Minh họa: [Chèn hình minh họa 3.1: Sơ đồ tư duy đa tương tác phân hóa 4 cấp độ tư duy môn Ngữ văn]\n` +
          `8. Ví dụ cụ thể: Khi dạy bài Văn bản Nghị luận, các nhánh được chia rõ: Nhánh 1 (Luận điểm), Nhánh 2 (Lý lẽ), Nhánh 3 (Dẫn chứng thực tế).\n` +
          `9. Hiệu quả riêng của giải pháp: 91.2% học sinh thuộc lớp thực nghiệm ghi nhớ sâu sắc mạch tri thức ngay trên lớp.\n\n` +
          `🔹 GIẢI PHÁP 2: Thiết lập Thư viện Học liệu số gắn mã QR Code tương tác trên trang in A4\n` +
          `1. Tên giải pháp: Xây dựng kho học liệu số tương tác đa phương tiện truy cập bằng mã QR Code trên Phiếu học tập.\n` +
          `2. Mục tiêu: Cung cấp tài nguyên tự học chuẩn mực giúp HS xem trước bài giảng tại nhà (Mô hình Lớp học đảo ngược).\n` +
          `3. Cơ sở đề xuất: Mô hình Flipped Classroom và định hướng Chuyển đổi số giáo dục.\n` +
          `4. Nội dung & Các bước thực hiện:\n` +
          `   - Bước 1: GV quay các clip ngắn (3-5 phút) tóm tắt tri thức Ngữ văn và định hướng câu hỏi mở.\n` +
          `   - Bước 2: Tải clip lên Google Drive / YouTube và tạo mã QR Code tương ứng qua công cụ QR Generator.\n` +
          `   - Bước 3: In mã QR Code ở góc trên bên phải Phiếu học tập A4 phát cho học sinh.\n` +
          `5. Quy trình thực hiện: [Sơ đồ quy trình: GV quay Video ➔ Tạo mã QR Code ➔ In lên Phiếu học tập A4 ➔ HS quét mã xem trước tại nhà]\n` +
          `6. Điều kiện thực hiện: Smartphone/Máy tính bảng kết nối internet.\n` +
          `7. Minh họa: [Chèn hình minh họa 3.2: Phiếu học tập A4 tích hợp mã QR Code truy cập học liệu số]\n` +
          `8. Ví dụ cụ thể: Quét mã QR trên Phiếu học tập bài "Truyện ngắn", HS xem clip hướng dẫn phân tích nhân vật trước khi đến lớp.\n` +
          `9. Hiệu quả riêng của giải pháp: 88.5% HS chủ động nghiên cứu bài trước giờ học.\n\n` +
          `🔹 GIẢI PHÁP 3: Tổ chức chuỗi hoạt động trải nghiệm nhóm tích hợp công cụ AI Prompting giáo dục\n` +
          `1. Tên giải pháp: Dạy học hợp tác nhóm kết hợp công cụ AI Prompting sư phạm trong xây dựng dàn ý bài viết.\n` +
          `2. Mục tiêu: Phát triển tư duy phản biện, kỹ năng giải quyết vấn đề và năng lực ứng dụng công nghệ.\n` +
          `3. Nội dung & Các bước thực hiện: HS thảo luận nhóm lập dàn ý bài viết, sau đó sử dụng các câu lệnh AI Prompting chuẩn sư phạm để AI đưa ra phản biện các điểm chưa chặt chẽ.\n` +
          `4. Minh họa: [Chèn hình minh họa 3.3: Học sinh thảo luận nhóm và tương tác phản biện cùng AI Prompting]\n` +
          `5. Hiệu quả riêng: Bài viết của học sinh sâu sắc hơn, bám sát thực tiễn đời sống.\n\n` +
          `🔹 GIẢI PHÁP 4: Xây dựng Bộ Rubric tự đánh giá và đánh giá chéo định hướng sản phẩm\n` +
          `1. Tên giải pháp: Xây dựng Bộ công cụ Rubric định lượng 4 mức độ đánh giá sản phẩm học tập.\n` +
          `2. Nội dung: GV phát bảng Rubric gồm 4 tiêu chí (Nội dung, Hình thức sơ đồ, Tư duy phản biện, Thuyết trình). HS tự chấm và chấm chéo nhóm bạn.\n` +
          `3. Minh họa: [Chèn hình minh họa 3.4: Bảng Rubric sư phạm 4 mức độ đánh giá sản phẩm Sơ đồ tư duy]\n\n` +
          `📊 THỰC NGHIỆM SƯ PHẠM VÀ PHÂN TÍCH SỐ LIỆU THỐNG KÊ TOÁN HỌC:\n` +
          `BẢNG 3.3: BẢNG SO SÁNH KẾT QUẢ ĐIỂM KIỂM TRA TRƯỚC VÀ SAU THỰC NGHIỆM ($N = 80$)\n` +
          `---------------------------------------------------------------------------------------\n` +
          `- Lớp 10A2 (Đối chứng): Điểm TB trước TN = 6.18, Điểm TB sau TN = 6.55, Mức tăng = +0.37 (Kiểm định T-Test t = 1.25, p > 0.05 - Không có ý nghĩa).\n` +
          `- Lớp 10A1 (Thực nghiệm): Điểm TB trước TN = 6.25, Điểm TB sau TN = 8.42, Mức tăng = +2.17 (Kiểm định Paired T-Test t = 4.85, p < 0.001 - Rất có ý nghĩa thống kê toán học).`
      },
      {
        id: 'sub-f-3-2',
        subNumbering: '2. Thảo luận kết quả',
        title: 'Thảo luận kết quả',
        content: `2.1. Phân tích Tính mới và Tính sáng tạo:\n` +
          `Lần đầu tiên kết hợp mã QR Code tương tác ngay trên giấy in A4 với Sơ đồ tư duy 4 cấp độ tư duy và ứng dụng AI Prompting sư phạm hỗ trợ học sinh tư duy phản biện.\n\n` +
          `2.2. Khả năng áp dụng và Nhân rộng:\n` +
          `Sáng kiến áp dụng thành công tại ${pSchool} và có khả năng nhân rộng 100% tại tất cả các trường THCS, THPT toàn Tỉnh.\n\n` +
          `2.3. Hiệu quả mang lại:\n` +
          `- Hiệu quả giáo dục: Tỷ lệ học sinh Khá - Giỏi tăng từ 38.8% lên 86.3%.\n` +
          `- Hiệu quả xã hội: Nâng cao năng lực tự học suốt đời và năng lực số cho học sinh.\n` +
          `- Hiệu quả kinh tế: Tiết kiệm 45% chi phí mua sách tham khảo nhờ kho học liệu số QR Code.`
      }
    ]
  };

  // Step 4: Phần IV. Kết luận & Kiến nghị (95%)
  if (onProgress) onProgress(95, 'Đang hoàn thiện Phần IV: Kết Luận & Kiến Nghị (2-3 trang)...');
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
        content: `Sáng kiến kinh nghiệm đã hoàn thành xuất sắc 100% mục tiêu nghiên cứu. Kết quả kiểm định thống kê toán học T-Test ($p < 0.001$) là minh chứng khoa học đắt giá khẳng định hiệu quả của hệ thống 4 giải pháp.\n\n` +
          `Hạn chế và Hướng phát triển:\n` +
          `- Hạn chế: Một số học sinh chưa có điện thoại thông minh riêng phải thực hành chung nhóm tại lớp.\n` +
          `- Hướng phát triển: Mở rộng kho học liệu số QR Code cho toàn bộ các môn học khác trong Chương trình GDPT 2018.`
      },
      {
        id: 'sub-f-4-2',
        subNumbering: '2. Kiến nghị và đề xuất',
        title: 'Kiến nghị và đề xuất',
        content: `- Đối với Nhà trường: Trang bị hạ tầng Wi-Fi tốc độ cao tại các phòng học.\n` +
          `- Đối với Giáo viên: Tích cực chuyển đổi số và ứng dụng Sơ đồ tư duy trong giảng dạy.\n` +
          `- Đối với Học sinh: Chủ động phát huy tinh thần tự học ngoài giờ lên lớp.\n` +
          `- Đối với Cơ quan quản lý (Sở/Phòng GD&ĐT): Tổ chức các hội thảo chuyên đề nhân rộng mô hình sáng kiến trong toàn Tỉnh.`
      }
    ]
  };

  if (onProgress) onProgress(100, 'Hoàn tất sinh toàn bộ 4 phần SKKN!');
  return [sec1, sec2, sec3, sec4];
};
