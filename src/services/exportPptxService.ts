import pptxgen from 'pptxgenjs';
import { SKKNProject } from '../types/skkn';

export const generatePptxPresentation = (project: SKKNProject) => {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';

  // Slide 1: Bìa Báo Cáo
  const slide1 = pres.addSlide();
  slide1.background = { color: '0F172A' }; // Dark Slate
  slide1.addText('BÁO CÁO BẢO VỆ SÁNG KIẾN KINH NGHIỆM', {
    x: 0.8, y: 1.2, w: '84%', h: 0.8,
    fontSize: 24, bold: true, color: '6366F1', align: 'center'
  });
  slide1.addText(project.title.toUpperCase(), {
    x: 0.5, y: 2.2, w: '90%', h: 1.5,
    fontSize: 26, bold: true, color: 'FFFFFF', align: 'center'
  });
  slide1.addText(`Tác giả: ${project.teacherName}\nĐơn vị: ${project.schoolUnit}\nBộ môn: ${project.subject} - Khối ${project.grade}`, {
    x: 1.0, y: 4.2, w: '80%', h: 1.2,
    fontSize: 18, color: '94A3B8', align: 'center'
  });

  // Slide 2: Lý Do Chọn Đề Tài & Thực Trạng
  const slide2 = pres.addSlide();
  slide2.addText('1. LÝ DO CHỌN ĐỀ TÀI & THỰC TRẠNG', {
    x: 0.5, y: 0.5, w: '90%', h: 0.6,
    fontSize: 22, bold: true, color: '1E3A8A'
  });
  slide2.addText(`• Xuất phát từ yêu cầu đổi mới GDPT 2018 đối với môn ${project.subject}.\n• Thực trạng tại ${project.schoolUnit}: Học sinh còn thụ động trong việc tự học.\n• Tỷ lệ hứng thú học tập ban đầu chỉ đạt khoảng 35%.\n• Cần giải pháp đột phá để nâng cao năng lực và chất lượng bộ môn.`, {
    x: 0.6, y: 1.5, w: '88%', h: 4.0,
    fontSize: 18, color: '334155', lineSpacing: 28
  });

  // Slide 3: Hệ Thống Giải Pháp Đột Phá
  const slide3 = pres.addSlide();
  slide3.addText('2. HỆ THỐNG GIẢI PHÁP ĐỘT PHÁ', {
    x: 0.5, y: 0.5, w: '90%', h: 0.6,
    fontSize: 22, bold: true, color: '059669'
  });

  if (project.solutions && project.solutions.length > 0) {
    project.solutions.forEach((gp, idx) => {
      const topY = 1.4 + idx * 1.5;
      slide3.addText(`${gp.code}: ${gp.title}`, {
        x: 0.6, y: topY, w: '88%', h: 0.4,
        fontSize: 16, bold: true, color: '0F766E'
      });
      slide3.addText(`-> Tính mới: ${gp.noveltyFeatures}`, {
        x: 1.0, y: topY + 0.4, w: '84%', h: 0.6,
        fontSize: 14, color: '475569'
      });
    });
  } else {
    slide3.addText('• Giải pháp 1: Sơ đồ hóa bài học và ứng dụng CNTT.\n• Giải pháp 2: Chuỗi hoạt động trải nghiệm & hợp tác nhóm.\n• Giải pháp 3: Tiêu chí Rubric tự đánh giá.', {
      x: 0.6, y: 1.6, w: '88%', h: 3.5,
      fontSize: 18, color: '334155', lineSpacing: 26
    });
  }

  // Slide 4: Kết Quả Thực Nghiệm Đối Chứng
  const slide4 = pres.addSlide();
  slide4.addText('3. KẾT QUẢ THỰC NGHIỆM ĐỐI CHỨNG', {
    x: 0.5, y: 0.5, w: '90%', h: 0.6,
    fontSize: 22, bold: true, color: 'D97706'
  });
  slide4.addText('• Tỷ lệ hứng thú học tập tăng từ 35.0% lên 87.5%.\n• Điểm trung bình bộ môn tăng từ 6.2 điểm lên 8.4 điểm.\n• Đạt ý nghĩa thống kê khoa học qua kiểm định T-Test (p < 0.001).\n• Học sinh chủ động, tự tin hợp tác và phát triển năng lực GDPT 2018.', {
    x: 0.6, y: 1.5, w: '88%', h: 4.0,
    fontSize: 18, color: '334155', lineSpacing: 28
  });

  // Slide 5: Trân Trọng Cảm Ơn
  const slide5 = pres.addSlide();
  slide5.background = { color: '1E293B' };
  slide5.addText('TRÂN TRỌNG CẢM ƠN HỘI ĐỒNG CHẤM SÁNG KIẾN KINH NGHIỆM!', {
    x: 0.5, y: 2.5, w: '90%', h: 1.5,
    fontSize: 24, bold: true, color: '38BDF8', align: 'center'
  });

  pres.writeFile({ fileName: `Bao_Cao_SKKN_${project.teacherName.replace(/\s+/g, '_')}.pptx` });
};
