import React from 'react';
import { Sparkles, FileText, Download, Plus, Bot, Mic, Share2, Upload } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';
import { generateDocxBlob } from '../../services/exportDocxService';
import { generatePptxPresentation } from '../../services/exportPptxService';

interface HeaderProps {
  activeProject: SKKNProject | null;
  onNewProject: () => void;
  onOpenWorkspace: () => void;
  onOpenVoiceModal?: () => void;
  onOpenShareModal?: () => void;
  onOpenTemplateModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeProject,
  onNewProject,
  onOpenWorkspace,
  onOpenVoiceModal,
  onOpenShareModal,
  onOpenTemplateModal
}) => {
  const handleQuickExportDocx = async () => {
    if (!activeProject) return;
    try {
      const blob = await generateDocxBlob(activeProject);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SKKN_${activeProject.subject}_${activeProject.teacherName.replace(/\s+/g, '_')}.docx`;
      a.click();
    } catch (e) {
      console.error('Docx export error:', e);
    }
  };

  const handleQuickExportPptx = () => {
    if (!activeProject) return;
    generatePptxPresentation(activeProject);
  };

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              AI SÁNG KIẾN PRO
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
              GDPT 2018
            </span>
          </div>
          <p className="text-xs text-slate-400">Trợ lý AI Agent Xây dựng Sáng kiến Kinh nghiệm Chuyên sâu</p>
        </div>
      </div>

      {activeProject && (
        <div className="hidden lg:flex items-center space-x-3 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700/60 max-w-md truncate">
          <FileText className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span className="text-xs font-medium text-slate-200 truncate">{activeProject.title}</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
            {activeProject.educationLevel} • {activeProject.subject}
          </span>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <button
          onClick={onNewProject}
          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Dự Án Mới</span>
        </button>

        {activeProject && (
          <div className="flex items-center space-x-2 border-l border-slate-800 pl-2">
            {onOpenTemplateModal && (
              <button
                onClick={onOpenTemplateModal}
                title="Đính kèm tệp mẫu file chuẩn để AI viết theo mẫu"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 text-xs flex items-center space-x-1 transition"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">Đính Kèm Mẫu</span>
              </button>
            )}

            {onOpenVoiceModal && (
              <button
                onClick={onOpenVoiceModal}
                title="Thu âm chuyển thành văn phong học thuật"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 text-xs flex items-center space-x-1 transition"
              >
                <Mic className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden md:inline">Giọng Nói AI</span>
              </button>
            )}

            {onOpenShareModal && (
              <button
                onClick={onOpenShareModal}
                title="Đồng bộ đám mây và chia sẻ liên trường"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 text-xs flex items-center space-x-1 transition"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden md:inline">Chia Sẻ</span>
              </button>
            )}

            <button
              onClick={handleQuickExportDocx}
              title="Xuất nhanh file Word (.docx)"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs flex items-center space-x-1 transition"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Xuất Word</span>
            </button>
            <button
              onClick={handleQuickExportPptx}
              title="Xuất bài thuyết trình Slide (.pptx)"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs flex items-center space-x-1 transition"
            >
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Xuất Slide</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

