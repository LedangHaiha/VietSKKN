import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Sparkles, FileSearch, Wrench } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';
import { auditTemplateCompliance, TemplateComplianceAuditResult } from '../../services/templateComplianceService';

interface TemplateComplianceAuditCardProps {
  project: SKKNProject;
  onAutoFixMissingSections?: () => void;
}

export const TemplateComplianceAuditCard: React.FC<TemplateComplianceAuditCardProps> = ({
  project,
  onAutoFixMissingSections,
}) => {
  const auditResult: TemplateComplianceAuditResult = auditTemplateCompliance(project);

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-indigo-400">
          <FileSearch className="w-5 h-5" />
          <h3 className="text-sm font-bold text-white">Thẩm Định Tuân Thủ Mẫu Khung SKKN (Template Compliance Audit)</h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
            auditResult.overallStatus === 'PASS'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : auditResult.overallStatus === 'WARNING'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}
        >
          {auditResult.overallStatus === 'PASS' ? 'Chuẩn Mẫu 100%' : `Thiếu ${auditResult.missingItems.length} Mục Khung Mẫu`}
        </span>
      </div>

      {/* Score Progress Bar */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-300">Độ Tương Thích Với Mẫu Sở GD&ĐT:</span>
          <span
            className={
              auditResult.complianceScore >= 90
                ? 'text-emerald-400'
                : auditResult.complianceScore >= 70
                ? 'text-amber-400'
                : 'text-rose-400'
            }
          >
            {auditResult.complianceScore}% ({auditResult.matchedSectionsCount}/{auditResult.totalRequiredSections} Mục)
          </span>
        </div>

        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              auditResult.complianceScore >= 90
                ? 'bg-emerald-500'
                : auditResult.complianceScore >= 70
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
            style={{ width: `${auditResult.complianceScore}%` }}
          />
        </div>
      </div>

      {/* Missing items list */}
      {auditResult.missingItems.length > 0 ? (
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 block">Danh mục tiêu đề mục còn thiếu so với file mẫu:</span>
          <div className="space-y-2">
            {auditResult.missingItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between space-x-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`w-3.5 h-3.5 ${item.importanceLevel === 'CRITICAL' ? 'text-rose-400' : 'text-amber-400'}`} />
                    <span className="font-bold text-xs text-white">{item.missingSubTitle}</span>
                    <span className="text-[10px] text-indigo-400">({item.sectionTitle})</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{item.recommendation}</p>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                    item.importanceLevel === 'CRITICAL'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {item.importanceLevel}
                </span>
              </div>
            ))}
          </div>

          {onAutoFixMissingSections && (
            <button
              onClick={onAutoFixMissingSections}
              className="w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 transition"
            >
              <Wrench className="w-4 h-4" />
              <span>AI Tự Động Bổ Sung Các Mục Còn Thiếu Cho SKKN</span>
            </button>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>Sáng kiến kinh nghiệm đã tuân thủ hoàn toàn 100% cấu trúc tệp mẫu quy định!</span>
        </div>
      )}
    </div>
  );
};
