import React, { useState } from 'react';
import { X, Sparkles, Sliders, CheckCircle2, Loader2, FileText } from 'lucide-react';
import { SKKNProject, SKKNSection } from '../../types/skkn';
import { SKKNLengthMode, generateFullSKKNContent } from '../../services/fullSkknAutoGeneratorService';

interface AutoGenerateModalProps {
  project: SKKNProject;
  onClose: () => void;
  onApplyGeneratedSections: (sections: SKKNSection[]) => void;
}

export const AutoGenerateModal: React.FC<AutoGenerateModalProps> = ({
  project,
  onClose,
  onApplyGeneratedSections,
}) => {
  const [selectedMode, setSelectedMode] = useState<SKKNLengthMode>('long');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentStepName, setCurrentStepName] = useState<string>('');

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setProgressPercent(5);
    setCurrentStepName('Khởi tạo AI Agents phân tích đề tài...');

    try {
      const resultSections = await generateFullSKKNContent(
        project,
        selectedMode,
        (percent, stepName) => {
          setProgressPercent(percent);
          setCurrentStepName(stepName);
        }
      );
      onApplyGeneratedSections(resultSections);
      onClose();
    } catch (e) {
      console.error('Error auto-generating SKKN:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-teal-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                AI Tự Động Sinh Toàn Bộ SKKN Chuẩn CV 3330 & ND 30
              </h2>
              <p className="text-xs text-slate-400">
                Chọn độ dài mong muốn và quan sát thanh tiến trình phần trăm % real-time
              </p>
            </div>
          </div>
          <button
            disabled={isGenerating}
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Context Summary */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center space-x-3">
          <FileText className="w-4 h-4 text-teal-400 flex-shrink-0" />
          <div className="truncate text-xs">
            <span className="text-slate-400">Đề tài: </span>
            <span className="font-bold text-slate-200 truncate">{project.title}</span>
          </div>
        </div>

        {/* Mode Selector */}
        {!isGenerating ? (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              <span>Chọn Mức Độ Dài Văn Bản Mong Muốn:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedMode('long')}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                  selectedMode === 'long'
                    ? 'bg-teal-600/20 border-teal-500 text-white shadow-lg shadow-teal-600/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-teal-300">🌟 CHUYÊN SÂU</span>
                  {selectedMode === 'long' && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-100">Dài (40-60 Trang)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Chuẩn nộp Thẩm định cấp Tỉnh / Thành phố</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedMode('medium')}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                  selectedMode === 'medium'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-300">⚡ TIÊU CHUẨN</span>
                  {selectedMode === 'medium' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-100">Vừa (20-35 Trang)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Chuẩn nộp Thẩm định cấp Trường / Phòng</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedMode('summary')}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                  selectedMode === 'summary'
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-600/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-300">📌 CƠ BẢN</span>
                  {selectedMode === 'summary' && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-100">Tóm Tắt (10-15 Trang)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Nộp báo cáo đề cương sơ bộ</div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Live Progress Bar Container */
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-300 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
                <span>{currentStepName}</span>
              </span>
              <span className="text-sm font-extrabold text-teal-400">{progressPercent}%</span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full transition-all duration-500 shadow-md shadow-teal-500/50"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-bold">
              <div className={progressPercent >= 15 ? 'text-teal-400' : 'text-slate-600'}>Phần I: Mở Đầu</div>
              <div className={progressPercent >= 40 ? 'text-teal-400' : 'text-slate-600'}>Phần II: Cơ Sở</div>
              <div className={progressPercent >= 75 ? 'text-teal-400' : 'text-slate-600'}>Phần III: Giải Pháp</div>
              <div className={progressPercent >= 100 ? 'text-teal-400' : 'text-slate-600'}>Phần IV: Kết Luận</div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            disabled={isGenerating}
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            Hủy Bỏ
          </button>
          {!isGenerating && (
            <button
              onClick={handleStartGeneration}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 flex items-center space-x-2 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>🚀 Kích Hoạt AI Sinh Văn Bản</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
