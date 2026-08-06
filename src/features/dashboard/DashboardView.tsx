import React from 'react';
import { Sparkles, FileText, CheckCircle2, ArrowRight, BookOpen, Clock, PlusCircle } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';
import { SAMPLE_SKKN_TOPICS } from '../../constants/skknConstants';

interface DashboardViewProps {
  projects: SKKNProject[];
  onSelectProject: (id: string) => void;
  onCreateNew: () => void;
  onUseTopicTemplate: (topic: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  onSelectProject,
  onCreateNew,
  onUseTopicTemplate,
}) => {
  const completedCount = projects.filter((p) => p.status === 'completed').length;
  const inProgressCount = projects.filter((p) => p.status === 'in_progress').length;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-8 border border-indigo-500/30 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Agent Workstation thế hệ mới</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Xây dựng Sáng kiến kinh nghiệm GDPT 2018 Hoàn chỉnh & Khoa học
          </h2>
          <p className="text-sm text-indigo-200 leading-relaxed">
            Hỗ trợ Thầy/Cô tự động hóa từ phân tích đề tài, lập đề cương 4 Phần, sáng tạo 3-5 giải pháp đột phá đến tính toán số liệu thống kê T-Test và xuất file Word, PDF, Slide.
          </p>
          <div className="pt-2 flex items-center space-x-4">
            <button
              onClick={onCreateNew}
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs hover:bg-indigo-50 transition shadow-lg flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4 text-indigo-700" />
              <span>Khởi Tạo SKKN Mới Ngay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Tổng Số Dự Án</p>
            <h3 className="text-2xl font-bold text-white mt-1">{projects.length}</h3>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <FileText className="w-6 h-6" />
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Đã Hoàn Thành</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">{completedCount}</h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Đang Thực Hiện</p>
            <h3 className="text-2xl font-bold text-amber-400 mt-1">{inProgressCount}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Clock className="w-6 h-6" />
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">AI Agents Hỗ Trợ</p>
            <h3 className="text-2xl font-bold text-purple-400 mt-1">7 Agents</h3>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Danh Sách Dự Án Gần Đây</span>
          </h3>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
            <p className="text-sm text-slate-400">Thầy/Cô chưa có dự án Sáng kiến kinh nghiệm nào.</p>
            <button
              onClick={onCreateNew}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold inline-flex items-center space-x-2"
            >
              <span>Khởi tạo dự án đầu tiên</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProject(p.id)}
                className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 transition cursor-pointer space-y-4 group"
              >
                <div className="flex items-start justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {p.educationLevel} • {p.subject}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Bước {p.currentStep}/15
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 transition line-clamp-2">
                  {p.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>{p.teacherName}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Topics Library */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Gợi Ý Đề Tài Sáng Kiến Tiêu Biểu (GDPT 2018)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SAMPLE_SKKN_TOPICS.map((topic, index) => (
            <div
              key={index}
              onClick={() => onUseTopicTemplate(topic)}
              className="p-4 rounded-xl bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/80 hover:border-emerald-500/40 transition cursor-pointer flex items-center justify-between group"
            >
              <p className="text-xs text-slate-300 group-hover:text-emerald-300 transition line-clamp-2 pr-3">
                {topic}
              </p>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40 flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition">
                Sử dụng mẫu
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
