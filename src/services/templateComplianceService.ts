import { SKKNProject } from '../types/skkn';

export interface MissingSubSectionItem {
  sectionTitle: string;
  missingSubTitle: string;
  importanceLevel: 'CRITICAL' | 'WARNING' | 'INFO';
  recommendation: string;
}

export interface TemplateComplianceAuditResult {
  complianceScore: number;
  totalRequiredSections: number;
  matchedSectionsCount: number;
  missingItems: MissingSubSectionItem[];
  overallStatus: 'PASS' | 'WARNING' | 'FAIL';
}

export const auditTemplateCompliance = (project: SKKNProject): TemplateComplianceAuditResult => {
  const missingItems: MissingSubSectionItem[] = [];

  const requiredStructure = [
    { section: 'I_MODAU', requiredSub: ['Lý do chọn đề tài', 'Mục đích nghiên cứu', 'Đối tượng và phạm vi nghiên cứu'] },
    { section: 'II_COSO', requiredSub: ['Cơ sở lý luận và pháp lý (GDPT 2018)', 'Thực trạng trước khi áp dụng giải pháp', 'Các giải pháp thực hiện cải tiến', 'Hiệu quả thực nghiệm và đối chứng số liệu'] },
    { section: 'IV_KETLUAN', requiredSub: ['Kết luận rút ra từ thực tiễn', 'Bài học kinh nghiệm', 'Kiến nghị với các cấp quản lý'] }
  ];

  let totalRequired = 0;
  let matchedCount = 0;

  requiredStructure.forEach((req) => {
    const projSec = project.sections.find((s) => s.code === req.section);
    req.requiredSub.forEach((subName) => {
      totalRequired++;
      if (projSec && projSec.subSections.some((s) => s.title.toLowerCase().includes(subName.toLowerCase().slice(0, 10)))) {
        matchedCount++;
      } else {
        missingItems.push({
          sectionTitle: projSec ? projSec.romanTitle : req.section,
          missingSubTitle: subName,
          importanceLevel: subName.includes('Giải pháp') || subName.includes('Thực trạng') ? 'CRITICAL' : 'WARNING',
          recommendation: `Bổ sung ngay mục ${subName} để đảm bảo tính hợp lệ theo Nghị định 30/2020/NĐ-CP và mẫu của Sở GD&ĐT.`
        });
      }
    });
  });

  const complianceScore = Math.round((matchedCount / (totalRequired || 1)) * 100);

  return {
    complianceScore,
    totalRequiredSections: totalRequired,
    matchedSectionsCount: matchedCount,
    missingItems,
    overallStatus: complianceScore >= 90 ? 'PASS' : complianceScore >= 70 ? 'WARNING' : 'FAIL'
  };
};
