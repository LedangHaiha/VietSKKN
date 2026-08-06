import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  Bot,
  FileEdit,
  BarChart3,
  ShieldCheck,
  Award,
  FileCode2,
  FolderOpen,
  Settings,
  HelpCircle
} from 'lucide-react';

export type ActiveTab = 
  | 'dashboard'
  | 'wizard'
  | 'agents'
  | 'editor'
  | 'evidence'
  | 'audit'
  | 'defense'
  | 'word_addin'
  | 'documents'
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  hasActiveProject: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, hasActiveProject }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Trang Chủ', icon: LayoutDashboard },
    { id: 'wizard', label: 'Quy Trình 15 Bước', icon: Sparkles },
    { id: 'agents', label: '7 AI Agents Studio', icon: Bot },
    { id: 'editor', label: 'Trình Soạn Thảo SKKN', icon: FileEdit, requiresProject: true },
    { id: 'evidence', label: 'Minh Chứng & Biểu Đồ', icon: BarChart3, requiresProject: true },
    { id: 'audit', label: 'Thẩm Định & Đạo Văn', icon: ShieldCheck, requiresProject: true },
    { id: 'defense', label: 'Phản Biện Giám Khảo AI', icon: Award, requiresProject: true },
    { id: 'word_addin', label: 'Plugin MS Word Desktop', icon: FileCode2, requiresProject: true },
    { id: 'documents', label: 'Quản Lý Tri Thức RAG', icon: FolderOpen },
    { id: 'settings', label: 'Cài Đặt Hệ Thống', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900/60 border-r border-slate-800 flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)] select-none">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Điều Hướng Ứng Dụng
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isDisabled = item.requiresProject && !hasActiveProject;

          return (
            <button
              key={item.id}
              disabled={isDisabled}
              onClick={() => onTabChange(item.id as ActiveTab)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                  : isDisabled
                  ? 'text-slate-600 cursor-not-allowed opacity-60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.requiresProject && !hasActiveProject && (
                <span className="text-[9px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded">Cần dự án</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 p-3.5 rounded-2xl border border-indigo-500/20">
        <div className="flex items-center space-x-2 text-indigo-400 mb-1">
          <HelpCircle className="w-4 h-4" />
          <span className="text-xs font-bold">Chuẩn Bộ GD&ĐT</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Đảm bảo đầy đủ 4 phần chính, ma trận phẩm chất GDPT 2018 và quy chuẩn trình bày văn bản hành chính.
        </p>
      </div>
    </aside>
  );
};
