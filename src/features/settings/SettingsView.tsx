import React, { useState } from 'react';
import { Settings, Key, Database, Save, CheckCircle2 } from 'lucide-react';
import { DepartmentCoverSelector } from './DepartmentCoverSelector';

export const SettingsView: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('sk-gemini-2026-pro-v1-key');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('dept-hanoi');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Settings className="w-5 h-5 text-indigo-400" />
          <span>Cài Đặt Hệ Thống & Quy Định Các Sở GD&ĐT</span>
        </h2>
        <p className="text-xs text-slate-400">Tùy chỉnh Khóa API kết nối LLM và chọn mẫu định dạng bìa hoa văn riêng của từng Sở</p>
      </div>

      <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-6">
        <DepartmentCoverSelector
          selectedDeptId={selectedDeptId}
          onSelectDept={(dept) => setSelectedDeptId(dept.id)}
        />

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Key className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white">Khóa API Tùy Chọn (Google Gemini / OpenAI)</h3>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:border-indigo-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">Mặc định ứng dụng tự động dùng hệ thống AI Agent tích hợp sẵn.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Database className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white">Quản Lý Bộ Nhớ Cục Bộ (LocalStorage)</h3>
          </div>
          <button
            onClick={() => localStorage.clear()}
            className="px-4 py-2 bg-rose-600/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold hover:bg-rose-600 hover:text-white transition"
          >
            Xóa Dữ Liệu Bộ Nhớ Tạm
          </button>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-800">
          {savedSuccess ? (
            <span className="text-xs text-emerald-400 flex items-center space-x-1 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã lưu cài đặt thành công!</span>
            </span>
          ) : <div />}

          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-600/30"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Cài Đặt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
