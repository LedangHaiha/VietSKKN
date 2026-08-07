import React, { useState } from 'react';
import { X, FileText, Upload, Sparkles, CheckCircle2, ArrowRight, BookOpen, PenTool } from 'lucide-react';
import { SKKNProject, SKKNSection } from '../../types/skkn';
import { generateSKKNFromRawContent, ContentDrivenInput } from '../../services/contentDrivenGeneratorService';

interface ContentDrivenWizardModalProps {
  project: SKKNProject;
  onClose: () => void;
  onApplyGeneratedSections: (title: string, sections: SKKNSection[]) => void;
}

export const ContentDrivenWizardModal: React.FC<ContentDrivenWizardModalProps> = ({
  project,
  onClose,
  onApplyGeneratedSections,
}) => {
  const [title, setTitle] = useState<string>(project.title);
  const [subject, setSubject] = useState<string>(project.subject);
  const [grade, setGrade] = useState<string>(project.grade);
  const [teacherName, setTeacherName] = useState<string>(project.teacherName);
  const [schoolUnit, setSchoolUnit] = useState<string>(project.schoolUnit);

  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  const [rawText, setRawText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleGenerate = async () => {
    if (!title.trim()) return;
    setIsGenerating(true);

    try {
      const input: ContentDrivenInput = {
        title,
        subject,
        grade,
        teacherName,
        schoolUnit,
        rawTextContent: inputMode === 'text' ? rawText : undefined,
        uploadedFileName: inputMode === 'file' ? file?.name : undefined
      };

      const sections = await generateSKKNFromRawContent(input);
      onApplyGeneratedSections(title, sections);
      onClose();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full space-y-5 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-indigo-400">
            <PenTool className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Viết Sáng Kiến Kinh Nghiệm Theo Nội Dung & Tệp Đính Kèm</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="sm:col-span-2 space-y-1">
            <label className="block font-bold text-slate-200">Tên Đề Tài Sáng Kiến Kinh Nghiệm:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tên đề tài SKKN của Thầy/Cô..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-slate-200">Môn Học:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-slate-200">Khối Lớp:</label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs"
            />
          </div>
        </div>

        {/* Switch Mode: Paste Text vs Upload File */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setInputMode('text')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                inputMode === 'text'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Dán Nội Dung Thô / Ý Tưởng</span>
            </button>
            <button
              onClick={() => setInputMode('file')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                inputMode === 'file'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Tải Lên Tệp Đính Kèm (.docx, .pdf, .txt)</span>
            </button>
          </div>

          {inputMode === 'text' ? (
            <textarea
              rows={5}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Dán ghi chú giảng dạy, tư liệu thực nghiệm, giải pháp thô hoặc đề cương chi tiết vào đây..."
              className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 text-xs leading-relaxed focus:border-indigo-500 focus:outline-none"
            />
          ) : (
            <label className="border-2 border-dashed border-indigo-500/40 hover:border-indigo-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition space-y-2">
              <Upload className="w-6 h-6 text-indigo-400" />
              {file ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã chọn tệp: {file.name}</span>
                </span>
              ) : (
                <span className="text-xs text-slate-300">Chọn tệp đính kèm chứa tài liệu tư liệu thực tế của Thầy/Cô</span>
              )}
              <input type="file" accept=".docx,.doc,.pdf,.txt" onChange={handleFileUpload} className="hidden" />
            </label>
          )}
        </div>

        {/* Generate Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !title.trim()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xl shadow-indigo-600/30 transition hover:opacity-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isGenerating ? 'AI đang đọc tư liệu và phát triển bài SKKN...' : 'Kích Hoạt AI Viết SKKN Theo Nội Dung Đưa Lên'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
