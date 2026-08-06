import React from 'react';
import { WORKFLOW_STEPS } from '../../constants/skknConstants';

interface ProgressBarProps {
  currentStep: number;
  onSelectStep?: (step: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, onSelectStep }) => {
  const percent = Math.min(100, Math.round((currentStep / 15) * 100));

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Tiến Trình Dự Án SKKN</span>
          <span className="text-xs text-slate-400 font-mono">({currentStep}/15 bước - {percent}%)</span>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Đang ở: <span className="text-white font-semibold">{WORKFLOW_STEPS[currentStep - 1]?.title}</span>
        </div>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden flex">
        <div
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 h-full transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex items-center space-x-1 mt-2 overflow-x-auto pb-1 scrollbar-none">
        {WORKFLOW_STEPS.map((s) => {
          const isDone = s.step < currentStep;
          const isCurrent = s.step === currentStep;

          return (
            <button
              key={s.step}
              onClick={() => onSelectStep && onSelectStep(s.step)}
              className={`flex-shrink-0 text-[11px] px-2.5 py-1 rounded-md transition-all flex items-center space-x-1 ${
                isCurrent
                  ? 'bg-indigo-600 text-white font-medium ring-1 ring-indigo-400 shadow-md shadow-indigo-500/20'
                  : isDone
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/40'
                  : 'bg-slate-800/60 text-slate-400 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span>{s.step}.</span>
              <span className="truncate max-w-[110px]">{s.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
