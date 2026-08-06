import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';
import { parseUploadedSKKNTemplate, ParsedSKKNTemplate } from '../../services/templateParserService';

interface TemplateUploadModalProps {
  project: SKKNProject;
  onClose: () => void;
  onApplyTemplate: (parsed: ParsedSKKNTemplate) => void;
}

export const TemplateUploadModal: React.FC<TemplateUploadModalProps> = ({
  project,
  onClose,
  onApplyTemplate,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedResult, setParsedResult] = useState<ParsedSKKNTemplate | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setIsAnalyzing(true);

    try {
      const res = await parseUploadedSKKNTemplate(selected);
      setParsedResult(res);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApply = () => {
    if (!parsedResult) return;
    onApplyTemplate(parsedResult);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Upload className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Đính Kèm Tệp Mẫu SKKN (.docx, .pdf, .doc)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dropzone */}
        {!file && (
          <label className="border-2 border-dashed border-indigo-500/40 hover:border-indigo-500 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition space-y-3">
            <div className="p-4 rounded-2xl bg-indigo-600/10 text-indigo-400">
              <Upload className="w-8 h-8" />
            </div>
            <div className="text-center space-y-1">
              <span className="font-bold text-xs text-white block">Tải Lên Mẫu File Chuẩn Của Sở/Trường</span>
              <span className="text-[11px] text-slate-400 block">Kéo thả tệp .docx, .doc hoặc .pdf vào đây để AI bóc tách cấu trúc</span>
            </div>
            <input type="file" accept=".docx,.doc,.pdf,.txt" onChange={handleFileChange} className="hidden" />
          </label>
        )}

        {isAnalyzing && (
          <div className="p-8 text-center space-y-3 animate-pulse">
            <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
            <p className="text-xs text-indigo-300 font-semibold">
              AI Agent đang đọc tệp {file?.name} và phân tích cấu trúc chương mục...
            </p>
          </div>
        )}

        {parsedResult && !isAnalyzing && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã bóc tách cấu trúc thành công từ file!</span>
                </span>
                <span className="text-[10px] text-slate-400">{parsedResult.templateName}</span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-300 uppercase block">Cấu trúc chương mục phát hiện:</span>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
                  {parsedResult.extractedSections.map((sec) => (
                    <div key={sec.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <span className="font-bold text-indigo-300 block">{sec.romanTitle}</span>
                      <div className="pl-3 text-[11px] text-slate-400 mt-1 space-y-0.5">
                        {sec.subSections.map((sub) => (
                          <div key={sub.id}>• {sub.subNumbering}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setFile(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Chọn File Khác
              </button>
              <button
                onClick={handleApply}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/30"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Áp Dụng Mẫu Này Cho SKKN</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
