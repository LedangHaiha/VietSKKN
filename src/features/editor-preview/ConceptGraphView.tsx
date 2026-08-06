import React from 'react';
import { GitFork, Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';

interface ConceptGraphViewProps {
  project: SKKNProject;
  onApplyGraphToSectionTwo?: () => void;
}

export const ConceptGraphView: React.FC<ConceptGraphViewProps> = ({ project, onApplyGraphToSectionTwo }) => {
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleCopyMermaidCode = () => {
    const code = `graph TD
    A["Nghị quyết 29-NQ/TW & GDPT 2018"] --> B["Dạy học phát triển Phẩm chất & Năng lực"]
    B --> C["Học sinh làm trung tâm - Môn ${project.subject}"]
    C --> D["Giải pháp 1: Sơ đồ tư duy & Mã QR"]
    C --> E["Giải pháp 2: Chuỗi hoạt động trải nghiệm"]
    C --> F["Giải pháp 3: Đánh giá Rubric 5512"]
    D --> G["Năng lực Tự chủ & Tự học"]
    E --> H["Năng lực Giao tiếp & Hợp tác"]
    F --> I["Kết quả Học tập Đạt T-Test p < 0.001"]`;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-indigo-400">
          <GitFork className="w-5 h-5" />
          <h3 className="text-sm font-bold text-white">Đồ Thị Mạng Lưới Khái Niệm & Cơ Sở Lý Luận</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyMermaidCode}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs font-semibold flex items-center space-x-1 transition"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Đã Sao Chép Code!' : 'Sao Chép Sơ Đồ'}</span>
          </button>
        </div>
      </div>

      {/* Visual SVG Knowledge Graph Simulation */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-6">
        <div className="px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold text-center shadow-md">
          📜 GDPT 2018 & Thông tư 32/2018/TT-BGDĐT
        </div>

        <div className="w-0.5 h-6 bg-indigo-500/40" />

        <div className="px-4 py-2 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/40 text-xs font-bold text-center">
          🎯 Dạy Học Phát Triển Năng Lực Môn {project.subject} ({project.grade})
        </div>

        <div className="w-0.5 h-6 bg-purple-500/40" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl text-center">
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-300 font-semibold space-y-1">
            <span className="block text-white font-bold">Giải Pháp 1</span>
            <span>Sơ đồ tư duy & Mã QR Code</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/30 text-[11px] text-amber-300 font-semibold space-y-1">
            <span className="block text-white font-bold">Giải Pháp 2</span>
            <span>Chuỗi hoạt động nhập vai</span>
          </div>
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-[11px] text-rose-300 font-semibold space-y-1">
            <span className="block text-white font-bold">Giải Pháp 3</span>
            <span>Bảng Rubric tự đánh giá</span>
          </div>
        </div>

        <div className="w-0.5 h-6 bg-emerald-500/40" />

        <div className="px-5 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold text-center shadow-lg">
          🏆 Đạt Ý Nghĩa Thống Kê Toán Học (T-Test t=4.85, p &lt; 0.001)
        </div>
      </div>
    </div>
  );
};
