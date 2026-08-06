import React, { useState } from 'react';
import { X, Mic, Square, Sparkles, CheckCircle2, Copy } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';
import { convertSpokenWordToAcademic, VoiceSpeechResult } from '../../services/voiceAgentService';

interface VoiceAgentModalProps {
  project: SKKNProject;
  onClose: () => void;
  onApplyTextToSection: (sectionCode: any, text: string) => void;
}

export const VoiceAgentModal: React.FC<VoiceAgentModalProps> = ({
  project,
  onClose,
  onApplyTextToSection
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [rawText, setRawText] = useState<string>('Thực trạng ở trường tớ học sinh còn thụ động trong việc tự học môn Ngữ văn, tớ triển khai cho học sinh làm việc nhóm theo mô hình sơ đồ tư duy và quét mã QR xem video bài giảng trước khi đến lớp...');
  const [result, setResult] = useState<VoiceSpeechResult | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const handleStartRecord = () => {
    setIsRecording(true);
  };

  const handleStopRecord = () => {
    setIsRecording(false);
  };

  const handleConvert = async () => {
    if (!rawText.trim()) return;
    setIsConverting(true);
    try {
      const res = await convertSpokenWordToAcademic(rawText, project.subject);
      setResult(res);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-rose-400">
            <Mic className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Chuyển Giọng Nói Thành Văn Phong Học Thuật</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Lời nói thu âm / Nhập thoại thực tế:</span>
              <button
                onClick={isRecording ? handleStopRecord : handleStartRecord}
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1.5 transition ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-800 text-rose-400 hover:bg-slate-700'
                }`}
              >
                {isRecording ? <Square className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? 'Đang thu âm...' : 'Bắt đầu nói'}</span>
              </button>
            </div>

            <textarea
              rows={3}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:border-rose-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleConvert}
            disabled={isConverting || !rawText.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isConverting ? 'AI đang chuốt lại văn phong...' : 'Chuyển Thành Văn Bản SKKN Chuẩn'}</span>
          </button>

          {result && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Văn bản học thuật sư phạm đã tạo:</span>
                </span>
                <button
                  onClick={() => {
                    onApplyTextToSection(result.suggestedSection, result.academicText);
                    onClose();
                  }}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold"
                >
                  Chèn Vào Bài SKKN
                </button>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-sans italic bg-slate-950 p-3 rounded-xl border border-slate-800">
                "{result.academicText}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
