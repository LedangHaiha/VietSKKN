import React, { useState, useEffect } from 'react';
import { X, Languages, Copy, CheckCircle2, Sparkles } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';
import { generateEnglishAbstract, EnglishAbstractResult } from '../../services/englishTranslatorService';

interface EnglishAbstractModalProps {
  project: SKKNProject;
  onClose: () => void;
}

export const EnglishAbstractModal: React.FC<EnglishAbstractModalProps> = ({ project, onClose }) => {
  const [data, setData] = useState<EnglishAbstractResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    generateEnglishAbstract(project).then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, [project]);

  const handleCopy = () => {
    if (!data) return;
    const text = `${data.titleEn}\nAuthor: ${data.authorEn} (${data.schoolEn})\n\n${data.abstractBodyEn}\n\nKeywords: ${data.keywordsEn.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Languages className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Bản Tóm Tắt Tiếng Anh Học Thuật (English Academic Abstract)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-xs text-indigo-300 space-y-2 animate-pulse">
            <Sparkles className="w-6 h-6 mx-auto text-indigo-400" />
            <p>AI đang dịch và chuẩn hóa bản tóm tắt sang Tiếng Anh học thuật...</p>
          </div>
        ) : (
          data && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs leading-relaxed font-sans">
                <h4 className="font-bold text-indigo-300 text-sm leading-snug">{data.titleEn}</h4>
                <p className="text-slate-400 text-[11px]">Author: {data.authorEn} • {data.schoolEn}</p>
                <div className="text-slate-200 whitespace-pre-wrap pt-2 border-t border-slate-800">{data.abstractBodyEn}</div>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="font-bold text-slate-400 text-[11px]">Keywords:</span>
                  {data.keywordsEn.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-[10px]">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/30"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Đã Sao Chép Bản Tiếng Anh!' : 'Sao Chép Bản Tóm Tắt'}</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
