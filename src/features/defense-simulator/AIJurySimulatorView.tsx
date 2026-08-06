import React, { useState } from 'react';
import { Award, UserCheck, Send, Sparkles, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';

interface AIJuryMember {
  id: string;
  name: string;
  titleRole: string;
  focusArea: string;
  avatarColor: string;
  question: string;
}

interface AIJurySimulatorViewProps {
  project: SKKNProject;
}

export const AIJurySimulatorView: React.FC<AIJurySimulatorViewProps> = ({ project }) => {
  const [activeJuryIndex, setActiveJuryIndex] = useState<number>(0);
  const [teacherResponse, setTeacherResponse] = useState<string>('');
  const [juryEvaluations, setJuryEvaluations] = useState<{ juryId: string; score: number; comment: string }[]>([]);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const juryMembers: AIJuryMember[] = [
    {
      id: 'j-1',
      name: 'TS. Nguyễn Văn Đức',
      titleRole: 'Trưởng Hội đồng Thẩm định SKKN',
      focusArea: 'Thể thức hành chính & Căn cứ Pháp lý GDPT 2018',
      avatarColor: 'from-blue-600 to-indigo-700',
      question: `Chào Thầy/Cô ${project.teacherName}! Trong đề tài "${project.title}", Thầy/Cô hãy làm rõ tính căn cứ pháp lý theo Thông tư 32/2018/TT-BGDĐT và Nghị định 13/2012/NĐ-CP?`
    },
    {
      id: 'j-2',
      name: 'PGS.TS. Trần Thị Mai',
      titleRole: 'Phó Hội đồng chuyên môn',
      focusArea: 'Phương pháp sư phạm & Ma trận Phẩm chất Năng lực',
      avatarColor: 'from-purple-600 to-pink-700',
      question: `Hội đồng nhận thấy giải pháp của Thầy/Cô rất sinh động. Xin Thầy/Cô phân tích rõ làm thế nào để đo lường Năng lực Tự chủ và Tự học của học sinh qua bài dạy?`
    },
    {
      id: 'j-3',
      name: 'ThS. Lê Hoàng Nam',
      titleRole: 'Ủy viên Phản biện SKKN',
      focusArea: 'Số liệu Thực nghiệm Toán Thống kê & Tính Mới Đột phá',
      avatarColor: 'from-emerald-600 to-teal-700',
      question: `Về mặt thực nghiệm tại ${project.schoolUnit}, Thầy/Cô chứng minh giá trị kiểm định T-Test (p < 0.001) có ý nghĩa như thế nào đối với khả năng nhân rộng sáng kiến?`
    }
  ];

  const currentJury = juryMembers[activeJuryIndex];

  const handleSubmitResponse = () => {
    if (!teacherResponse.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      const score = Math.floor(88 + Math.random() * 10);
      const evalItem = {
        juryId: currentJury.id,
        score,
        comment: `Câu trả lời rất tự tin, lập luận sư phạm chặt chẽ. Giám khảo đánh giá cao tinh thần đổi mới tại ${project.schoolUnit}. (${score}/100 điểm)`
      };

      setJuryEvaluations((prev) => [...prev.filter((e) => e.juryId !== currentJury.id), evalItem]);
      setTeacherResponse('');
      setIsEvaluating(false);

      if (activeJuryIndex < juryMembers.length - 1) {
        setActiveJuryIndex(activeJuryIndex + 1);
      }
    }, 1000);
  };

  const avgScore = juryEvaluations.length > 0
    ? (juryEvaluations.reduce((acc, curr) => acc + curr.score, 0) / juryEvaluations.length).toFixed(1)
    : 'Chưa chấm';

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Mô Phỏng Phản Biện Bảo Vệ Với Giám Khảo AI (AI Jury Defense Simulator)</span>
          </h2>
          <p className="text-xs text-slate-400">Luyện tập trả lời các câu hỏi học thuật từ 3 Giám khảo AI trước khi bước vào Hội đồng chấm chính thức</p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400">Điểm Bảo Vệ TB:</span>
          <span className="text-lg font-extrabold text-amber-400">{avgScore}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Jury Members Selector */}
        <div className="lg:col-span-4 bg-slate-900/60 rounded-3xl border border-slate-800 p-5 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            HỘI ĐỒNG GIÁM KHẢO PHẢN BIỆN
          </span>

          {juryMembers.map((member, idx) => {
            const evalItem = juryEvaluations.find((e) => e.juryId === member.id);
            const isCurrent = activeJuryIndex === idx;

            return (
              <button
                key={member.id}
                onClick={() => setActiveJuryIndex(idx)}
                className={`w-full p-4 rounded-2xl border text-left transition space-y-2 ${
                  isCurrent
                    ? 'bg-indigo-900/40 border-indigo-500 text-white shadow-lg'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center text-white font-bold text-xs`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">{member.name}</h4>
                      <p className="text-[10px] text-slate-400">{member.titleRole}</p>
                    </div>
                  </div>
                  {evalItem && (
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-lg border border-emerald-800">
                      {evalItem.score} đ
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Q&A Simulation Workspace */}
        <div className="lg:col-span-8 bg-slate-900/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-950 border border-indigo-500/30">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentJury.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                AI
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{currentJury.name}</h3>
                <p className="text-xs text-indigo-300">{currentJury.titleRole} • {currentJury.focusArea}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-slate-100 text-xs leading-relaxed space-y-2">
              <span className="font-bold text-amber-400 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>Câu hỏi phản biện từ Giám khảo:</span>
              </span>
              <p className="text-sm font-medium italic">"{currentJury.question}"</p>
            </div>

            {/* Display evaluation comment if evaluated */}
            {juryEvaluations.some((e) => e.juryId === currentJury.id) && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                <span className="font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Đánh giá từ Giám khảo:</span>
                </span>
                <p>{juryEvaluations.find((e) => e.juryId === currentJury.id)?.comment}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300">
              Nội dung Giáo viên giải trình & phản biện:
            </label>
            <textarea
              rows={4}
              value={teacherResponse}
              onChange={(e) => setTeacherResponse(e.target.value)}
              placeholder="Nhập câu trả lời bảo vệ sáng kiến của Thầy/Cô..."
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-indigo-500 focus:outline-none transition"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmitResponse}
                disabled={isEvaluating || !teacherResponse.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-amber-600/30"
              >
                <Send className="w-4 h-4" />
                <span>{isEvaluating ? 'Giám khảo đang chấm điểm...' : 'Nộp Câu Trả Lời Cho Giám Khảo'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
