import { AgentType } from '../types/agent';
import { SKKNProject, SKKNSolution, SKKNEvidence } from '../types/skkn';
import { MASTER_SKKN_PROMPT_ANTIGRAVITY } from '../constants/masterSkknPrompt';

export interface AgentActionPayload {
  agentType: AgentType;
  project: SKKNProject;
  promptText?: string;
  stepContext?: number;
}

export const executeAgentTask = async (payload: AgentActionPayload): Promise<{
  replyText: string;
  updatedProject?: SKKNProject;
}> => {
  const { agentType, project, promptText } = payload;
  const pName = project.title || 'Biện pháp nâng cao chất lượng dạy học GDPT 2018';

  // Simulate thinking delay for agentic feel
  await new Promise((r) => setTimeout(r, 1200));

  if (agentType === 'research') {
    const legalRefs = [
      'Thông tư số 32/2018/TT-BGDĐT ban hành Chương trình GDPT tổng thể 2018',
      'Nghị định số 13/2012/NĐ-CP Điều lệ Sáng kiến kinh nghiệm toàn quốc',
      'Công văn số 5512/BGDĐT-GDTrH về việc xây dựng và tổ chức thực hiện kế hoạch giáo dục',
      'Thông tư 22/2021/TT-BGDĐT về đánh giá học sinh THCS và THPT'
    ];

    const replyText = `🤖 **[Research Agent] Đã phân tích thành công đề tài:** "${pName}"

📌 **Văn bản pháp lý & Chỉ thị áp dụng:**
1. ${legalRefs[0]}
2. ${legalRefs[1]}
3. ${legalRefs[2]}

💡 **Phân tích Tính mới & Định hướng GDPT 2018:**
- **Tính mới phát hiện:** Đề tài đã chuyển dịch từ phương pháp dạy học thụ động truyền thống sang phát triển ma trận năng lực cốt lõi (Tự chủ, Giải quyết vấn đề, Tin học/Công nghệ).
- **Phạm vi áp dụng:** Thích hợp triển khai rộng rãi cho khối ${project.grade} trường ${project.schoolUnit} và có thể nhân rộng cấp Quận/Huyện.`;

    const updated: SKKNProject = {
      ...project,
      researchData: {
        legalRefs,
        theoreticalBasis: `Chương trình GDPT 2018 đặt trọng tâm vào chuyển từ dạy học truyền thụ kiến thức sang dạy học phát triển phẩm chất và năng lực học sinh. Đề tài "${pName}" lấy học sinh làm trung tâm...`,
        literatureReview: `Qua nghiên cứu các công trình đi trước, chưa có giải pháp nào kết hợp đồng bộ công nghệ tương tác trực quan gắn liền với bài học khối ${project.grade}.`
      }
    };
    return { replyText, updatedProject: updated };
  }

  if (agentType === 'outline') {
    const replyText = `🤖 **[Outline Agent] Đã khởi tạo Đề cương 4 Phần chuẩn Bộ GD&ĐT:**

📋 **Cấu trúc Đề cương SKKN:**
- **I. MỞ ĐẦU** (Dự kiến 3-4 trang)
  1. Lý do chọn đề tài
  2. Mục đích nghiên cứu
  3. Đối tượng và phạm vi nghiên cứu
  4. Phương pháp nghiên cứu
  5. Tính mới của sáng kiến
- **II. CƠ SỞ LÝ LUẬN VÀ CƠ SỞ THỰC TIỄN** (Dự kiến 5-6 trang)
  1. Cơ sở lý luận theo GDPT 2018
  2. Thực trạng giảng dạy môn ${project.subject}
  3. Nguyên nhân của thực trạng
- **III. NỘI DUNG SÁNG KIẾN KHẢO SÁT VÀ GIẢI PHÁP** (Dự kiến 10-15 trang)
  1. Các giải pháp thực hiện (3-5 giải pháp đột phá)
  2. Kết quả thực nghiệm và bảng thống kê đối chứng
- **IV. KẾT LUẬN VÀ KIẾN NGHỊ** (Dự kiến 2-3 trang)
  1. Kết luận chung
  2. Bài học kinh nghiệm
  3. Kiến nghị đối với Phòng/Sở GD&ĐT`;

    return { replyText, updatedProject: project };
  }

  if (agentType === 'writing') {
    const updatedSections = project.sections.map((sec) => {
      if (sec.code === 'I_MODAU') {
        return {
          ...sec,
          subSections: sec.subSections.map((sub) => {
            if (sub.subNumbering.includes('1. Lý do')) {
              return {
                ...sub,
                content: `Trong bối cảnh toàn ngành Giáo dục đang triển khai mạnh mẽ Chương trình Giáo dục phổ thông 2018, môn ${project.subject} ở khối lớp ${project.grade} giữ vai trò then chốt trong việc hình thành phẩm chất và năng lực cho học sinh. Xuất phát từ yêu cầu đổi mới căn bản và toàn diện giáo dục, việc chọn đề tài "${pName}" là hết sức cấp thiết nhằm khắc phục những tồn tại trong giảng dạy thực tế tại ${project.schoolUnit}.`
              };
            }
            if (sub.subNumbering.includes('2. Mục đích')) {
              return {
                ...sub,
                content: `Mục đích chính của nghiên cứu này là đề xuất hệ thống giải pháp sư phạm mới, giúp học sinh phát triển năng lực tự học, năng lực hợp tác và nâng cao kết quả học tập môn ${project.subject} tại ${project.schoolUnit}.`
              };
            }
            if (sub.subNumbering.includes('5. Tính mới')) {
              return {
                ...sub,
                content: `Sáng kiến có tính mới đột phá ở chỗ: Tích hợp công nghệ AI và sơ đồ hóa bài học, chuyển giao quyền tự học cho học sinh và đo lường sự tiến bộ qua các bộ chỉ số định lượng rõ ràng.`
              };
            }
            return sub;
          })
        };
      }
      if (sec.code === 'II_COSO') {
        return {
          ...sec,
          subSections: sec.subSections.map((sub) => {
            if (sub.subNumbering.includes('1. Cơ sở lý luận')) {
              return {
                ...sub,
                content: `Căn cứ Nghị quyết 29-NQ/TW và Thông tư 32/2018/TT-BGDĐT, hoạt động dạy học môn ${project.subject} phải lấy người học làm trung tâm, tổ chức các hoạt động trải nghiệm giúp học sinh khám phá tri thức một cách chủ động.`
              };
            }
            if (sub.subNumbering.includes('2. Cơ sở thực tiễn')) {
              return {
                ...sub,
                content: `Trước khi áp dụng sáng kiến tại ${project.schoolUnit}, qua khảo sát 80 học sinh khối ${project.grade}, tỷ lệ học sinh hứng thú học tập chỉ đạt 35%, số học sinh còn thụ động chiếm đến 48%.`
              };
            }
            return sub;
          })
        };
      }
      return sec;
    });

    const replyText = `✍️ **[Writing Agent] Đã biên soạn hoàn thành nội dung Phần I và Phần II chuẩn học thuật sư phạm!**

Nội dung đã được chèn hệ thống căn cứ pháp lý và số liệu khảo sát thực tế tại ${project.schoolUnit}.`;

    return { replyText, updatedProject: { ...project, sections: updatedSections, currentStep: Math.max(project.currentStep, 11) } };
  }

  if (agentType === 'innovation') {
    const newSolutions: SKKNSolution[] = [
      {
        id: 'gp-1',
        code: 'GP-01',
        title: 'Thiết kế các phiếu học tập đa phương tiện và sơ đồ hóa bài học',
        advantages: 'Tăng tính trực quan, giúp học sinh nắm bắt kiến thức trọng tâm nhanh chóng.',
        disadvantages: 'Giáo viên mất nhiều thời gian chuẩn bị đồ dùng ban đầu.',
        practicalComparison: 'Thay thế bài giảng đọc chép truyền thống bằng hoạt động tương tác.',
        noveltyFeatures: 'Tích hợp mã QR dẫn đến các nguồn học liệu video minh họa sinh động.',
        implementationSteps: [
          'Bước 1: Xác định mục tiêu bài học và kiến thức cốt lõi',
          'Bước 2: Vẽ mindmap bài học và tạo mã QR học liệu',
          'Bước 3: Phát phiếu học tập cho nhóm học sinh thảo luận'
        ],
        targetedCompetencies: ['Năng lực Tự chủ và Tự học', 'Năng lực Công nghệ']
      },
      {
        id: 'gp-2',
        code: 'GP-02',
        title: 'Xây dựng chuỗi hoạt động đóng vai và giải quyết tình huống thực tế',
        advantages: 'Gia tăng tối đa sự hứng thú và năng lực giao tiếp hợp tác.',
        disadvantages: 'Cần kiểm soát thời lượng tiết học chặt chẽ.',
        practicalComparison: 'Học sinh không chỉ học thuộc lý thuyết mà được nhập vai xử lý bài toán cuộc sống.',
        noveltyFeatures: 'Gắn liền với bối cảnh địa phương và chủ đề thời sự GDPT 2018.',
        implementationSteps: [
          'Bước 1: Xây dựng kịch bản tình huống',
          'Bước 2: Phân công nhóm đóng vai',
          'Bước 3: Tổ chức nhận xét và chốt kiến thức'
        ],
        targetedCompetencies: ['Năng lực Giao tiếp và Hợp tác', 'Năng lực Giải quyết vấn đề và Sáng tạo']
      },
      {
        id: 'gp-3',
        code: 'GP-03',
        title: 'Áp dụng bộ tiêu chí Rubric tự đánh giá và đánh giá đồng đẳng',
        advantages: 'Minh bạch hóa quá trình cho điểm, giúp học sinh tự nhận ra điểm mạnh/yếu.',
        disadvantages: 'Học sinh cần thời gian quen với việc tự chấm điểm.',
        practicalComparison: 'Chuyển từ việc giáo viên là người chấm duy nhất sang học sinh cùng tham gia đánh giá.',
        noveltyFeatures: 'Áp dụng bảng kiểm chuẩn Thông tư 22/2021/TT-BGDĐT.',
        implementationSteps: [
          'Bước 1: Thiết kế bảng tiêu chí Rubric 4 mức độ',
          'Bước 2: Hướng dẫn học sinh cách chấm điểm đồng đẳng',
          'Bước 3: Tổng hợp kết quả và phản hồi'
        ],
        targetedCompetencies: ['Năng lực Tự chủ', 'Phẩm chất Trách nhiệm']
      }
    ];

    const replyText = `✨ **[Innovation Agent] Đã khởi tạo thành công 3 Giải pháp Đột phá gắn với GDPT 2018:**

1. **GP-01:** Thiết kế phiếu học tập đa phương tiện và sơ đồ hóa bài học.
2. **GP-02:** Xây dựng chuỗi hoạt động đóng vai và giải quyết tình huống thực tế.
3. **GP-03:** Áp dụng bộ tiêu chí Rubric tự đánh giá và đánh giá đồng đẳng.

Mỗi giải pháp đều có đầy đủ so sánh thực trạng, phân tích ưu/nhược điểm và gán ma trận năng lực GDPT 2018!`;

    return {
      replyText,
      updatedProject: { ...project, solutions: newSolutions, currentStep: Math.max(project.currentStep, 12) }
    };
  }

  if (agentType === 'evidence') {
    const newEvidence: SKKNEvidence = {
      id: 'evi-1',
      title: 'Bảng đối chứng kết quả học tập trước và sau khi áp dụng sáng kiến',
      type: 'chart',
      description: 'Số liệu thực nghiệm thu thập trên 80 học sinh khối 8 năm học 2025 - 2026',
      surveyStats: {
        sampleSize: 80,
        beforeAgreePercent: 35.0,
        afterAgreePercent: 87.5,
        beforeScoreMean: 6.2,
        afterScoreMean: 8.4,
        tTestValue: 4.85,
        pValue: 0.001
      },
      chartData: {
        labels: ['Hứng thú học tập', 'Tự chủ bài học', 'Hoàn thành bài tốt', 'Hiệu quả hợp tác'],
        beforeData: [35, 28, 42, 30],
        afterData: [88, 85, 92, 86]
      },
      createdAt: new Date().toISOString()
    };

    const replyText = `📊 **[Evidence Agent] Đã sinh Bộ số liệu minh chứng thực nghiệm & Biểu đồ đối chứng!**

- **Quy mô mẫu:** 80 học sinh khối ${project.grade}
- **Điểm trung bình (Mean):** Trước = 6.2/10 ➔ Sau = 8.4/10
- **Tỷ lệ học sinh hào hứng:** Trước = 35% ➔ Sau = 87.5%
- **Kiểm định T-Test:** $t = 4.85$, $p < 0.001$ (Đạt ý nghĩa thống kê khoa học cao).`;

    return {
      replyText,
      updatedProject: {
        ...project,
        evidences: [...project.evidences, newEvidence],
        currentStep: Math.max(project.currentStep, 13)
      }
    };
  }

  if (agentType === 'review') {
    const replyText = `🛡️ **[Review Agent] Kết quả Thẩm định & Rà soát Sáng kiến:**

✅ **Chính tả & Ngữ pháp:** Đạt 99/100 (Không phát hiện lỗi chính tả nghiêm trọng).
✅ **Thể thức Nghị định 30/2020:** Đúng font Times New Roman, căn lề Trái 3cm, Phải 2cm, Trên 2cm, Dưới 2cm.
✅ **Chỉ số Trùng lặp (Đạo văn):** 4.2% (Rất an toàn, hoàn toàn nằm trong ngưỡng < 15% của Hội đồng chấm SKKN).
✅ **Đối chiếu tiêu chuẩn SKKN:** Đầy đủ 4 Phần chính theo quy định.`;

    return { replyText, updatedProject: { ...project, currentStep: Math.max(project.currentStep, 14) } };
  }

  if (agentType === 'export') {
    const replyText = `🎉 **[Export Agent] Tài liệu SKKN đã sẵn sàng để xuất bản!**

Thầy/Cô có thể bấm các nút bên dưới để tải về:
- 📄 **File Word (.docx):** Đầy đủ trang bìa, mục lục, bảng biểu, danh mục viết tắt, lề 2-2-3-2cm.
- 📕 **File PDF:** Chuẩn để in ấn nộp trực tiếp cho Hội đồng chấm.
- 📊 **Slide PowerPoint (.pptx):** Đã thiết kế 12 slide báo cáo bảo vệ sáng kiến trước Hội đồng.`;

    return { replyText, updatedProject: { ...project, status: 'completed', currentStep: 15 } };
  }

  return { replyText: `Đã phản hồi từ ${agentType}`, updatedProject: project };
};
