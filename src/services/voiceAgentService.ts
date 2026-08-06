export interface VoiceSpeechResult {
  rawTranscript: string;
  academicText: string;
  suggestedSection: 'I_MODAU' | 'II_COSO' | 'III_NOIDUNG' | 'IV_KETLUAN';
}

export const convertSpokenWordToAcademic = async (rawTranscript: string, subject: string): Promise<VoiceSpeechResult> => {
  // Simulate AI transformation delay
  await new Promise((r) => setTimeout(r, 1000));

  const text = rawTranscript.trim();

  let academicText = `Qua thực tiễn giảng dạy môn ${subject}, tác giả nhận thấy: ${text}. Nhằm nâng cao hiệu quả tiết học theo Chương trình GDPT 2018, tác giả đã áp dụng các biện pháp sư phạm tương tác, kích thích tư duy chủ động cho học sinh.`;

  if (text.toLowerCase().includes('thực trạng') || text.toLowerCase().includes('thụ động') || text.toLowerCase().includes('khó khăn')) {
    academicText = `Nghiên cứu thực trạng tại đơn vị cho thấy: ${text}. Điều này đòi hỏi giáo viên phải thay đổi phương pháp truyền thụ một chiều sang tổ chức hoạt động trải nghiệm giúp học sinh tự chiếm lĩnh tri thức môn ${subject}.`;
    return { rawTranscript, academicText, suggestedSection: 'II_COSO' };
  }

  if (text.toLowerCase().includes('giải pháp') || text.toLowerCase().includes('nhóm') || text.toLowerCase().includes('sơ đồ')) {
    academicText = `Tác giả đã triển khai giải pháp cụ thể: ${text}. Việc kết hợp hoạt động nhóm và công nghệ trực quan đã tạo chuyển biến tích cực trong thái độ và kết quả học tập của học sinh.`;
    return { rawTranscript, academicText, suggestedSection: 'III_NOIDUNG' };
  }

  return { rawTranscript, academicText, suggestedSection: 'I_MODAU' };
};
