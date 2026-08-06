import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, User, Building, GraduationCap, BookOpen, Layers } from 'lucide-react';
import { SKKNProject, EducationLevel } from '../../types/skkn';
import { EDUCATION_SUBJECTS, WORKFLOW_STEPS } from '../../constants/skknConstants';
import { executeAgentTask } from '../../services/agentEngine';

interface ProjectWizardProps {
  project: SKKNProject;
  onUpdateProject: (p: SKKNProject) => void;
  onNavigateToTab: (tab: any) => void;
}

export const ProjectWizard: React.FC<ProjectWizardProps> = ({
  project,
  onUpdateProject,
  onNavigateToTab,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(project.currentStep || 1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [analysisFeedback, setAnalysisFeedback] = useState<string>('');

  const stepInfo = WORKFLOW_STEPS[currentStep - 1];

  const handleNextStep = () => {
    const next = Math.min(15, currentStep + 1);
    setCurrentStep(next);
    onUpdateProject({ ...project, currentStep: next });
  };

  const handlePrevStep = () => {
    const prev = Math.max(1, currentStep - 1);
    setCurrentStep(prev);
  };

  const handleRunAiAnalysis = async () => {
    setIsProcessing(true);
    try {
      const res = await executeAgentTask({
        agentType: 'research',
        project,
        stepContext: currentStep
      });
      setAnalysisFeedback(res.replyText);
      if (res.updatedProject) {
        onUpdateProject(res.updatedProject);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Step Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            BƯỚC {currentStep} TRÊN 15
          </span>
          <h2 className="text-xl font-bold text-white mt-1">{stepInfo.title}</h2>
          <p className="text-xs text-slate-400">{stepInfo.desc}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            disabled={currentStep === 1}
            onClick={handlePrevStep}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </button>
          <button
            onClick={handleNextStep}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-1 shadow-md shadow-indigo-600/30"
          >
            <span>Tiếp tục</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step 1: Khởi tạo dự án & Tên đề tài */}
      {currentStep === 1 && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Tên đề tài Sáng kiến kinh nghiệm
          </label>
          <textarea
            rows={3}
            value={project.title}
            onChange={(e) => onUpdateProject({ ...project, title: e.target.value })}
            placeholder="Nhập tên đề tài SKKN của Thầy/Cô..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-indigo-500 focus:outline-none transition"
          />
        </div>
      )}

      {/* Step 2: Thông tin giáo viên */}
      {currentStep === 2 && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400">
            <User className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white">Thông Tin Tác Giả / Giáo Viên</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Họ và tên Giáo viên</label>
              <input
                type="text"
                value={project.teacherName}
                onChange={(e) => onUpdateProject({ ...project, teacherName: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Năm học thực hiện</label>
              <input
                type="text"
                value={project.academicYear}
                onChange={(e) => onUpdateProject({ ...project, academicYear: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Thông tin đơn vị */}
      {currentStep === 3 && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Building className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white">Thông Tin Trực Thuộc / Trường Học</h3>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Tên Trường / Đơn vị công tác</label>
            <input
              type="text"
              value={project.schoolUnit}
              onChange={(e) => onUpdateProject({ ...project, schoolUnit: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Step 4: Chọn cấp học */}
      {currentStep === 4 && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400">
            <GraduationCap className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white">Chọn Cấp Học Giảng Dạy</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['Tiểu học', 'THCS', 'THPT', 'Mầm nông'] as EducationLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => onUpdateProject({ ...project, educationLevel: level })}
                className={`p-4 rounded-xl border text-center transition ${
                  project.educationLevel === level
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-sm">{level}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Chọn môn học */}
      {currentStep === 5 && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400">
            <BookOpen className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white">Chọn Môn Học Giảng Dạy ({project.educationLevel})</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {(EDUCATION_SUBJECTS[project.educationLevel] || []).map((sub) => (
              <button
                key={sub}
                onClick={() => onUpdateProject({ ...project, subject: sub })}
                className={`px-4 py-2 rounded-xl text-xs border transition ${
                  project.subject === sub
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 6: Chọn khối lớp */}
      {currentStep === 6 && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Layers className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white">Chọn Khối Lớp Thực Nghiệm</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'].map((g) => (
              <button
                key={g}
                onClick={() => onUpdateProject({ ...project, grade: g })}
                className={`p-3 rounded-xl border text-center text-xs transition ${
                  project.grade === g
                    ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 8 & 9: Phân tích đề tài bằng AI Research Agent */}
      {(currentStep === 8 || currentStep === 9) && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-indigo-400">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white">Phân Tích & Đánh Giá Tính Mới Đề Tài Bằng AI</h3>
            </div>
            <button
              onClick={handleRunAiAnalysis}
              disabled={isProcessing}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isProcessing ? 'Đang phân tích...' : 'Kích hoạt Research Agent'}</span>
            </button>
          </div>

          {analysisFeedback ? (
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
              {analysisFeedback}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              Bấm nút "Kích hoạt Research Agent" để AI tra cứu pháp lý GDPT 2018 và phân tích tính mới cho đề tài.
            </p>
          )}
        </div>
      )}

      {/* Steps 10-15: Direct action buttons to Agent Studio or Editor */}
      {currentStep >= 10 && (
        <div className="p-8 text-center rounded-2xl bg-slate-900/60 border border-indigo-500/30 space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Đã Hoàn Thành Thiết Lập Ban Đầu!</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
            Dữ liệu dự án đã sẵn sàng. Thầy/Cô có thể chuyển thẳng đến **7 AI Agents Studio** hoặc **Trình Soạn Thảo SKKN** để biên soạn chi tiết.
          </p>
          <div className="flex justify-center space-x-3 pt-2">
            <button
              onClick={() => onNavigateToTab('agents')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
            >
              Mở 7 AI Agents Studio
            </button>
            <button
              onClick={() => onNavigateToTab('editor')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
            >
              Mở Trình Soạn Thảo SKKN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
