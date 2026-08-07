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
    { section: 'I_MODAU', requiredSub: ['Lý do chọn sáng kiến', 'Mục tiêu nghiên cứu', 'Phạm vi nghiên cứu'] },
    { section: 'II_COSO', requiredSub: ['Cơ sở lý luận', 'Cơ sở thực tiễn'] },
    { section: 'III_NOIDUNG', requiredSub: ['Nội dung và kết quả nghiên cứu', 'Thảo luận kết quả'] },
    { section: 'IV_KETLUAN', requiredSub: ['Kết luận', 'Kiến nghị và đề xuất'] }
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
          importanceLevel: subName.includes('Nội dung') || subName.includes('Cơ sở') ? 'CRITICAL' : 'WARNING',
          recommendation: `Bổ sung ngay mục "${subName}" để đảm bảo tuân thủ 100% Phụ lục II.1 - Công văn 3330/SGDĐT-GDTrH và Nghị định 30/2020/NĐ-CP.`
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
