import { SKKNProject } from '../types/skkn';
import { QualityAuditResult } from '../types/agent';

export const runQualityAudit = (project: SKKNProject): QualityAuditResult => {
  const issues: QualityAuditResult['issues'] = [];
  let totalLength = 0;

  project.sections.forEach((sec) => {
    sec.subSections.forEach((sub) => {
      totalLength += (sub.content || '').length;

      // Check for empty or very short content
      if (!sub.content || sub.content.length < 50) {
        issues.push({
          id: `issue-empty-${sub.id}`,
          type: 'structure',
          severity: 'high',
          message: `Mục "${sub.title}" có dung lượng quá ngắn hoặc chưa có nội dung.`,
          suggestedFix: `Sử dụng Writing Agent hoặc Innovation Agent để sinh đầy đủ văn bản học thuật cho mục này.`,
          sectionId: sec.id
        });
      }

      // Check for spelling patterns or unstandardized typography
      if (sub.content.includes('hoc sinh') || sub.content.includes('giao vien')) {
        issues.push({
          id: `issue-spell-${sub.id}`,
          type: 'spelling',
          severity: 'medium',
          message: `Phát hiện từ không có dấu Tiếng Việt trong mục "${sub.title}".`,
          suggestedFix: `Bổ sung dấu Tiếng Việt chuẩn mực sư phạm.`,
          sectionId: sec.id
        });
      }
    });
  });

  // Compliance rules
  if (project.solutions.length < 3) {
    issues.push({
      id: 'issue-sol-count',
      type: 'structure',
      severity: 'medium',
      message: 'Sáng kiến hiện có dưới 3 giải pháp.',
      suggestedFix: 'Hội đồng chấm khuyến nghị tối thiểu 3-5 giải pháp đột phá.'
    });
  }

  if (project.evidences.length === 0) {
    issues.push({
      id: 'issue-no-evidence',
      type: 'citation',
      severity: 'high',
      message: 'Chưa có bảng số liệu thực nghiệm hoặc biểu đồ đối chứng.',
      suggestedFix: 'Kích hoạt Evidence Agent để sinh dữ liệu khảo sát và biểu đồ đối chứng.'
    });
  }

  const overallScore = Math.max(60, Math.min(98, 100 - issues.length * 8));

  return {
    overallScore,
    spellingErrorsCount: issues.filter((i) => i.type === 'spelling').length,
    plagiarismRiskPercent: 3.8, // Low risk simulation
    formattingCompliancePercent: 96,
    issues
  };
};
