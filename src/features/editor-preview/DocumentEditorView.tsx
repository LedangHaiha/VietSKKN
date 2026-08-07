import React, { useState } from 'react';
import { Eye, Edit3, Save, Sparkles, FileText, CheckCircle2, Languages, GitFork, Bot, PenTool } from 'lucide-react';
import { SKKNProject, SKKNSectionCode } from '../../types/skkn';
import { EnglishAbstractModal } from './EnglishAbstractModal';
import { ConceptGraphView } from './ConceptGraphView';
import { generateSubSectionContentWithAi } from '../../services/sectionAiWriterService';

interface DocumentEditorViewProps {
  project: SKKNProject;
  onUpdateProject: (p: SKKNProject) => void;
}

export const DocumentEditorView: React.FC<DocumentEditorViewProps> = ({
  project,
  onUpdateProject,
}) => {
  const [activeSectionCode, setActiveSectionCode] = useState<SKKNSectionCode>('I_MODAU');
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [showEnglishModal, setShowEnglishModal] = useState<boolean>(false);
  const [showGraphModal, setShowGraphModal] = useState<boolean>(false);
  const [loadingSubId, setLoadingSubId] = useState<string | null>(null);

  const activeSection = project.sections.find((s) => s.code === activeSectionCode) || project.sections[0];

  const handleSubSectionContentChange = (subId: string, newContent: string) => {
    const updatedSections = project.sections.map((sec) => {
      if (sec.code === activeSectionCode) {
        return {
          ...sec,
          subSections: sec.subSections.map((sub) =>
            sub.id === subId ? { ...sub, content: newContent } : sub
          )
        };
      }
      return sec;
    });

    onUpdateProject({
      ...project,
      sections: updatedSections,
      updatedAt: new Date().toISOString()
    });
  };

  const handleRunAiForSubSection = async (
    subId: string,
    sectionTitle: string,
    subNumbering: string,
    currentContent: string,
    action: 'generate' | 'polish' | 'expand'
  ) => {
    setLoadingSubId(subId);
    try {
      const generatedText = await generateSubSectionContentWithAi({
        project,
        sectionTitle,
        subNumbering,
        currentContent,
        action
      });
      handleSubSectionContentChange(subId, generatedText);
    } finally {
      setLoadingSubId(null);
    }
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col p-6 max-w-7xl mx-auto space-y-4">
      {/* Top Toolbar */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {project.sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSectionCode(sec.code)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                activeSectionCode === sec.code
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {sec.romanTitle}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowGraphModal(!showGraphModal)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-indigo-300 border border-slate-800 text-xs font-semibold flex items-center space-x-1.5 transition"
          >
            <GitFork className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sơ Đồ Khái Niệm</span>
          </button>
          <button
            onClick={() => setShowEnglishModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-purple-300 border border-slate-800 text-xs font-semibold flex items-center space-x-1.5 transition"
          >
            <Languages className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Tóm Tắt Tiếng Anh</span>
          </button>

          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('edit')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                viewMode === 'edit' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Soạn</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                viewMode === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chia Đôi</span>
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                viewMode === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview A4</span>
            </button>
          </div>
        </div>
      </div>

      {showGraphModal && (
        <ConceptGraphView project={project} />
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
        {/* Left / Center Editor */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div
            className={`${
              viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'
            } bg-slate-900/60 rounded-3xl border border-slate-800 p-5 overflow-y-auto space-y-6`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                {activeSection.romanTitle}
              </h3>
              <span className="text-[11px] text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tự động lưu bài</span>
              </span>
            </div>

            <div className="space-y-6">
              {activeSection.subSections.map((sub) => {
                const isWritingThis = loadingSubId === sub.id;

                return (
                  <div key={sub.id} className="space-y-2.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="block text-xs font-bold text-indigo-300">
                        {sub.subNumbering}
                      </label>

                      <div className="flex items-center space-x-1.5 overflow-x-auto">
                        <button
                          disabled={isWritingThis}
                          onClick={() => handleRunAiForSubSection(sub.id, sub.title, sub.subNumbering, sub.content, 'generate')}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-[11px] font-semibold flex items-center space-x-1 transition flex-shrink-0"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          <span>{isWritingThis ? 'AI đang viết...' : '✨ AI Viết Mục Này'}</span>
                        </button>

                        <button
                          disabled={isWritingThis}
                          onClick={() => handleRunAiForSubSection(sub.id, sub.title, sub.subNumbering, sub.content, 'polish')}
                          className="px-2.5 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-[11px] font-semibold flex items-center space-x-1 transition flex-shrink-0"
                        >
                          <Bot className="w-3 h-3 text-purple-400" />
                          <span>🪄 Chuốt Văn Phong</span>
                        </button>

                        <button
                          disabled={isWritingThis}
                          onClick={() => handleRunAiForSubSection(sub.id, sub.title, sub.subNumbering, sub.content, 'expand')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-[11px] font-semibold flex items-center space-x-1 transition flex-shrink-0"
                        >
                          <PenTool className="w-3 h-3 text-emerald-400" />
                          <span>💡 Gợi Ý Mở Rộng</span>
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={7}
                      value={sub.content}
                      onChange={(e) => handleSubSectionContentChange(sub.id, e.target.value)}
                      placeholder={`Bấm "✨ AI Viết Mục Này" để AI tự động soạn thảo hoặc nhập nội dung cho tiểu mục ${sub.title}...`}
                      className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs leading-relaxed focus:border-indigo-500 focus:outline-none transition font-sans"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Right Live Previewer */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div
            className={`${
              viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'
            } bg-slate-900/60 rounded-3xl border border-slate-800 p-4 flex flex-col justify-between overflow-hidden`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
              <span className="text-xs font-bold text-slate-400 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Xem Trước Trang In A4 (Times New Roman 14pt, Lề 2-2-3-2cm)</span>
              </span>
              <button
                onClick={() => window.print()}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold border border-slate-700"
              >
                In SKKN
              </button>
            </div>

            {/* A4 Document Simulation Container */}
            <div className="flex-1 bg-white text-slate-900 rounded-2xl p-8 overflow-y-auto print-skkn-page shadow-2xl font-serif text-[14pt] leading-[1.5]">
              <div className="text-center font-bold text-[13pt] uppercase space-y-1 mb-8">
                <div>PHÒNG/SỞ GIÁO DỤC VÀ ĐÀO TẠO {project.schoolUnit.toUpperCase()}</div>
                <div className="text-[16pt] text-blue-900 mt-4">SÁNG KIẾN KINH NGHIỆM</div>
                <div className="text-[14pt] text-teal-800 mt-2 font-bold max-w-xl mx-auto">
                  "{project.title}"
                </div>
              </div>

              <div className="space-y-6">
                {project.sections.map((sec) => (
                  <div key={sec.id} className="space-y-3">
                    <h3 className="font-bold text-[14pt] text-blue-900 uppercase">
                      {sec.romanTitle}
                    </h3>
                    {sec.subSections.map((sub) => (
                      <div key={sub.id} className="space-y-1">
                        <h4 className="font-bold text-[14pt]">{sub.subNumbering}</h4>
                        <p className="text-justify indent-8 text-[14pt]">
                          {sub.content || '(Đang biên soạn...)'}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}

                {/* QR APPENDIX LIVE PREVIEW */}
                {project.qrAppendixItems && project.qrAppendixItems.length > 0 && (
                  <div className="pt-6 border-t-2 border-slate-300 space-y-4 page-break-before">
                    <h3 className="font-bold text-[14pt] text-teal-800 uppercase text-center">
                      PHỤ LỤC: DANH MỤC MÃ QR CODE MINH CHỨNG ĐA PHƯƠNG TIỆN
                    </h3>
                    <div className="grid grid-cols-2 gap-4 border p-4 bg-slate-50 rounded-xl">
                      {project.qrAppendixItems.map((qr) => (
                        <div key={qr.id} className="text-center p-3 border rounded-xl bg-white shadow-sm space-y-2">
                          <span className="font-bold text-[12pt] block leading-tight">{qr.title}</span>
                          {qr.qrDataUrl && (
                            <img src={qr.qrDataUrl} alt={qr.title} className="w-24 h-24 mx-auto border" />
                          )}
                          <span className="text-[10px] text-slate-500 block truncate font-mono">{qr.url}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {showEnglishModal && (
        <EnglishAbstractModal project={project} onClose={() => setShowEnglishModal(false)} />
      )}
    </div>
  );
};
