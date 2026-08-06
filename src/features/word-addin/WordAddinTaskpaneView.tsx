import React, { useState } from 'react';
import { Bot, Sparkles, Send, ArrowRight, CheckCircle2, FileText, Search, PenTool, BarChart3, ShieldCheck } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';
import { AgentType } from '../../types/agent';
import { AGENT_REGISTRY } from '../../constants/agentConstants';
import { executeAgentTask } from '../../services/agentEngine';
import { insertTextToWord, getSelectedTextFromWord, insertFormattedHeadingToWord, insertFormattedTableToWord } from '../../services/wordAddinService';

interface WordAddinTaskpaneViewProps {
  project: SKKNProject;
  onUpdateProject: (p: SKKNProject) => void;
}

export const WordAddinTaskpaneView: React.FC<WordAddinTaskpaneViewProps> = ({
  project,
  onUpdateProject,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>('writing');
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [aiOutput, setAiOutput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [insertedSuccess, setInsertedSuccess] = useState<boolean>(false);

  const activeAgent = AGENT_REGISTRY[selectedAgent];

  const handleReadWordSelection = async () => {
    const selected = await getSelectedTextFromWord();
    if (selected) {
      setInputPrompt(`Chuốt lại đoạn văn bản được chọn trong Word thành văn phong học thuật sư phạm: "${selected}"`);
    } else {
      setInputPrompt('Vui lòng bôi đen một đoạn văn bản trong Word để AI đọc và hỗ trợ.');
    }
  };

  const handleRunAgentTask = async () => {
    if (!inputPrompt.trim()) return;
    setIsProcessing(true);

    try {
      const res = await executeAgentTask({
        agentType: selectedAgent,
        project,
        promptText: inputPrompt
      });

      setAiOutput(res.replyText);
      if (res.updatedProject) {
        onUpdateProject(res.updatedProject);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInsertIntoWordDoc = async () => {
    if (!aiOutput.trim()) return;
    const ok = await insertTextToWord(aiOutput);
    if (ok) {
      setInsertedSuccess(true);
      setTimeout(() => setInsertedSuccess(false), 2000);
    } else {
      // Fallback copy to clipboard if testing in browser
      navigator.clipboard.writeText(aiOutput);
      setInsertedSuccess(true);
      setTimeout(() => setInsertedSuccess(false), 2000);
    }
  };

  const handleInsertFormattedTableSample = async () => {
    const headers = ['STT', 'Tiêu Chí Khảo Sát Thực Nghiệm', 'Trước SKKN (%)', 'Sau SKKN (%)', 'Mức Tăng (%)'];
    const rows = [
      ['1', 'Tự giác chuẩn bị bài trước khi đến lớp', '35.0%', '87.5%', '+52.5%'],
      ['2', 'Hứng thú và tích cực phát biểu xây dựng bài', '28.0%', '85.0%', '+57.0%'],
      ['3', 'Khả năng vận dụng kiến thức giải quyết bài toán', '42.0%', '92.0%', '+50.0%']
    ];
    const ok = await insertFormattedTableToWord(headers, rows, 'BẢNG ĐỐI CHỨNG KẾT QUẢ THỰC NGHIỆM SÁNG KIẾN KINH NGHIỆM');
    if (ok) {
      setInsertedSuccess(true);
      setTimeout(() => setInsertedSuccess(false), 2000);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 bg-slate-900 min-h-screen text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-white">Plugin AI Sáng Kiến Pro</h3>
            <p className="text-[10px] text-slate-400">Microsoft Word Add-in Engine</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Word Taskpane Active
        </span>
      </div>

      {/* Select Agent Bar */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase">Chọn AI Agent hỗ trợ:</span>
        <div className="grid grid-cols-4 gap-1.5">
          {(['research', 'outline', 'writing', 'innovation', 'evidence', 'review', 'export'] as AgentType[]).map((type) => {
            const isSel = selectedAgent === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedAgent(type)}
                className={`p-2 rounded-xl border text-center transition ${
                  isSel
                    ? 'bg-indigo-600 text-white font-bold border-indigo-400 shadow'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="capitalize text-[10px] block truncate">{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReadWordSelection}
            className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold border border-slate-700 text-[11px] flex items-center justify-center space-x-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Đọc Văn Bản Bôi Đen Trong Word</span>
          </button>
        </div>

        <button
          onClick={handleInsertFormattedTableSample}
          className="w-full py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 font-semibold border border-emerald-800/60 text-[11px] flex items-center justify-center space-x-1.5 transition"
        >
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Chèn Bảng Thực Nghiệm Chuẩn A4 (Times 13pt, Viền 1pt)</span>
        </button>
      </div>

      {/* Input prompt */}
      <div className="space-y-2">
        <textarea
          rows={3}
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder={`Gửi chỉ thị cho ${activeAgent.name}...`}
          className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-indigo-500 focus:outline-none"
        />
        <button
          onClick={handleRunAgentTask}
          disabled={isProcessing || !inputPrompt.trim()}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center space-x-2 shadow-md shadow-indigo-600/30"
        >
          <Bot className="w-4 h-4" />
          <span>{isProcessing ? 'Agent đang làm việc...' : `Kích Hoạt ${activeAgent.name}`}</span>
        </button>
      </div>

      {/* Output preview & Insert into Word */}
      {aiOutput && (
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-indigo-300 text-[11px]">Kết quả từ {activeAgent.name}:</span>
            {insertedSuccess && (
              <span className="text-[10px] font-bold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Đã chèn vào Word!</span>
              </span>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-slate-200 text-[11px] leading-relaxed max-h-48 overflow-y-auto font-sans whitespace-pre-wrap border border-slate-800">
            {aiOutput}
          </div>

          <button
            onClick={handleInsertIntoWordDoc}
            className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/30"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Chèn Trực Tiếp Vào Vị Trí Con Trỏ MS Word</span>
          </button>
        </div>
      )}
    </div>
  );
};
