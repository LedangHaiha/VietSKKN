import React, { useState } from 'react';
import { X, Users, Share2, Copy, Download, CheckCircle2 } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';
import { generateShareRoomCode, exportProjectPackageJSON, CloudShareSession } from '../../services/cloudSyncService';

interface ShareProjectModalProps {
  project: SKKNProject;
  onClose: () => void;
}

export const ShareProjectModal: React.FC<ShareProjectModalProps> = ({ project, onClose }) => {
  const [session, setSession] = useState<CloudShareSession>(() => generateShareRoomCode(project));
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(session.roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Users className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Đồng Bộ Đám Mây & Chia Sẻ Liên Trường</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 text-center space-y-2">
            <span className="text-xs text-slate-400">Mã Phòng Đồng Bộ Chia Sẻ:</span>
            <div className="text-2xl font-extrabold text-indigo-400 font-mono tracking-widest flex items-center justify-center space-x-2">
              <span>{session.roomCode}</span>
              <button onClick={handleCopyCode} className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 transition">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && <p className="text-[11px] text-emerald-400 font-semibold">Đã sao chép mã chia sẻ!</p>}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300">Danh Sách Đồng Tác Giả & Kiểm Duyệt:</span>
            {session.collaborators.map((col, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-100">{col.name}</span>
                  <p className="text-[11px] text-slate-400">{col.school}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {col.role}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => exportProjectPackageJSON(project)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs font-semibold flex items-center justify-center space-x-2 transition"
            >
              <Download className="w-4 h-4" />
              <span>Tải Gói Dự Án Dạng File (.skkn JSON)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
