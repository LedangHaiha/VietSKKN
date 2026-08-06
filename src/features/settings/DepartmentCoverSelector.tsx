import React, { useState } from 'react';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DEPARTMENT_PRESETS, DepartmentPreset } from '../../services/departmentCoverService';

interface DepartmentCoverSelectorProps {
  selectedDeptId: string;
  onSelectDept: (dept: DepartmentPreset) => void;
}

export const DepartmentCoverSelector: React.FC<DepartmentCoverSelectorProps> = ({
  selectedDeptId,
  onSelectDept,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-indigo-400">
        <Award className="w-4 h-4" />
        <h3 className="text-sm font-bold text-white">Mẫu Định Dạng Bìa & Khung Viền Theo Quy Định Các Sở GD&ĐT</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DEPARTMENT_PRESETS.map((dept) => {
          const isSelected = selectedDeptId === dept.id;
          return (
            <div
              key={dept.id}
              onClick={() => onSelectDept(dept)}
              className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                isSelected
                  ? 'bg-indigo-900/40 border-indigo-500 text-white ring-1 ring-indigo-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-100">{dept.name}</span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-[11px] text-slate-400">{dept.sampleNotes}</p>
              <div className="flex items-center space-x-2 text-[10px] text-indigo-300">
                <span>Lề Trái: {dept.margins.left}cm</span>
                <span>•</span>
                <span>Lề Phải: {dept.margins.right}cm</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
