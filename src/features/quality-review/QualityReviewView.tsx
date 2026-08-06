import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw, FileCheck } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';
import { runQualityAudit } from '../../services/qualityReviewService';
import { QualityAuditResult } from '../../types/agent';
import { TemplateComplianceAuditCard } from './TemplateComplianceAuditCard';

interface QualityReviewViewProps {
  project: SKKNProject;
  onUpdateProject?: (p: SKKNProject) => void;
}

export const QualityReviewView: React.FC<QualityReviewViewProps> = ({ project, onUpdateProject }) => {
  const [auditResult, setAuditResult] = useState<QualityAuditResult>(() => runQualityAudit(project));
  const [isAuditing, setIsAuditing] = useState<boolean>(false);

  const handleReAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setAuditResult(runQualityAudit(project));
      setIsAuditing(false);
    }, 800);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-violet-400" />
            <span>Thẩm Định Thể Thức, So Sánh Tệp Mẫu & Đạo Văn</span>
          </h2>
          <p className="text-xs text-slate-400">Kiểm tra tính tuân thủ quy định SKKN của Bộ/Sở GD&ĐT và Nghị định 30/2020/NĐ-CP</p>
        </div>
        <button
          onClick={handleReAudit}
          disabled={isAuditing}
          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-violet-600/30"
        >
          <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>{isAuditing ? 'Đang thẩm định...' : 'Thẩm Định Phân Tích Lại'}</span>
        </button>
      </div>

      {/* Template Compliance Audit Card */}
      <TemplateComplianceAuditCard project={project} />

      {/* Audit Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400">Điểm Thẩm Định Tổng Thể</span>
          <div className="text-3xl font-extrabold text-indigo-400">{auditResult.overallScore}/100</div>
          <p className="text-[11px] text-slate-500">Được đánh giá bởi Review Agent</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400">Tỷ Lệ Trùng Lặp (Đạo Văn)</span>
          <div className="text-3xl font-extrabold text-emerald-400">{auditResult.plagiarismRiskPercent}%</div>
          <p className="text-[11px] text-emerald-400 font-medium">An toàn (&lt; 15%)</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400">Chuẩn Thể Thức NĐ 30/2020</span>
          <div className="text-3xl font-extrabold text-purple-400">{auditResult.formattingCompliancePercent}%</div>
          <p className="text-[11px] text-slate-500">Times New Roman 14pt, Lề 2-2-3-2</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400">Lỗi Cần Bổ Sung</span>
          <div className="text-3xl font-extrabold text-amber-400">{auditResult.issues.length}</div>
          <p className="text-[11px] text-slate-500">Khuyến nghị điều chỉnh</p>
        </div>
      </div>

      {/* Issues Detailed List */}
      <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <FileCheck className="w-4 h-4 text-violet-400" />
          <span>Danh Sách Khuyến Nghị & Cần Hoàn Thiện</span>
        </h3>

        {auditResult.issues.length === 0 ? (
          <div className="p-6 text-center text-xs text-emerald-400 space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto" />
            <p>Tuyệt vời! Sáng kiến kinh nghiệm của Thầy/Cô đã đạt chuẩn 100%.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {auditResult.issues.map((iss) => (
              <div key={iss.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-100">{iss.message}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {iss.severity}
                    </span>
                  </div>
                  <p className="text-slate-400">💡 <strong>Gợi ý khắc phục:</strong> {iss.suggestedFix}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
