import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Terminal, Code2 } from 'lucide-react';
import { MASTER_SKKN_PROMPT_ANTIGRAVITY } from '../../constants/masterSkknPrompt';

interface MasterPromptModalProps {
  onClose: () => void;
}

export const MasterPromptModal: React.FC<MasterPromptModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(MASTER_SKKN_PROMPT_ANTIGRAVITY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-6 relative overflow-hidden max-h-[85vh] flex flex-col">
        {/* Glow background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <span>MASTER PROMPT CHO ANTIGRAVITY</span>
                <span className="px-2 py-0.5 text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
                  GDPT 2018
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Prompt chuẩn chuyên gia viết SKKN chuẩn Công văn 3330 Phụ lục II.1 & Nghị định 30/2020/NĐ-CP
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt Content Code Block */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
          {MASTER_SKKN_PROMPT_ANTIGRAVITY}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400 flex items-center space-x-1.5">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span>Sao chép và dán trực tiếp vào Antigravity IDE / AGY CLI</span>
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Đóng
            </button>
            <button
              onClick={handleCopyPrompt}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Đã Sao Chép Prompt!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Sao Chép Prompt Master</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
