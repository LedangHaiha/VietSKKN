import React, { useState } from 'react';
import { FolderOpen, Upload, FileText, Trash2, CheckCircle2, Search, Award, BookOpen, Copy } from 'lucide-react';
import { searchVectorRAG, AwardWinningSKKN } from '../../services/ragVectorService';

interface ManagedDoc {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export const DocumentManagerView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'files' | 'rag_vector'>('rag_vector');
  const [searchQuery, setSearchQuery] = useState<string>('ngữ văn tự học');
  const [ragResults, setRagResults] = useState<AwardWinningSKKN[]>(() => searchVectorRAG('ngữ văn tự học'));
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [docs, setDocs] = useState<ManagedDoc[]>([
    {
      id: 'doc-1',
      name: 'Nghi_Dinh_13_2012_ND_CP_Dieu_Le_Sang_Kien.pdf',
      size: '1.2 MB',
      type: 'Văn bản Pháp lý',
      uploadedAt: '07/08/2026'
    },
    {
      id: 'doc-2',
      name: 'Thong_Tu_32_2018_TT_BGDDT_Chuong_Trinh_GDPT_Tong_The.pdf',
      size: '3.4 MB',
      type: 'Văn bản Pháp lý',
      uploadedAt: '07/08/2026'
    },
    {
      id: 'doc-3',
      name: 'Mau_Sang_Kien_Kinh_Nghiem_So_GDDT_2025.docx',
      size: '450 KB',
      type: 'Mẫu SKKN Chuẩn',
      uploadedAt: '07/08/2026'
    }
  ]);

  const handleSearchRAG = (q: string) => {
    setSearchQuery(q);
    setRagResults(searchVectorRAG(q));
  };

  const handleCopyCitation = (citation: string, id: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs: ManagedDoc[] = Array.from(files).map((f, i) => ({
      id: 'doc-new-' + Date.now() + i,
      name: f.name,
      size: `${(f.size / 1024).toFixed(0)} KB`,
      type: 'Tài liệu Tải lên',
      uploadedAt: new Date().toLocaleDateString('vi-VN')
    }));

    setDocs((prev) => [...prev, ...newDocs]);
  };

  const handleDeleteDoc = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <FolderOpen className="w-5 h-5 text-indigo-400" />
            <span>Trình Quản Lý Tri Thức & RAG Vector Database</span>
          </h2>
          <p className="text-xs text-slate-400">Tra cứu trực tiếp kho 10.000 SKKN đoạt giải cấp Tỉnh/Thành phố & Quản lý tài liệu mẫu</p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('rag_vector')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'rag_vector'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Tra Cứu Kho SKKN Đoạt Giải (RAG Vector)</span>
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'files'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Tài Liệu Tải Lên ({docs.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'rag_vector' ? (
        <div className="space-y-6">
          {/* Vector Search Bar */}
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                KHO RAG VECTOR DB 10.000 SKKN ĐOẠT GIẢI CẤP TỈNH / SỞ GD&ĐT
              </span>
              <span className="text-xs text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Vector Index Active</span>
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchRAG(e.target.value)}
                placeholder="Nhập từ khóa môn học, khối lớp, phương pháp (Ví dụ: ngữ văn tự học, toán stem, tiếng anh podcast)..."
                className="w-full p-4 pl-11 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-indigo-500 focus:outline-none transition shadow-inner"
              />
              <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <span>Gợi ý tìm nhanh:</span>
              {['ngữ văn tự học', 'khoa học tự nhiên stem', 'tiếng anh podcast', 'toán 6 phân hóa'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSearchRAG(chip)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 transition"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* RAG Vector Results List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ragResults.map((skkn) => (
              <div
                key={skkn.id}
                className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      🏆 {skkn.awardRank} • {skkn.awardYear}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">{skkn.department}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100 leading-snug">{skkn.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{skkn.abstract}</p>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase">Kết quả thực nghiệm nổi bật:</span>
                    <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5">
                      {skkn.keyFindings.map((kf, i) => (
                        <li key={i}>{kf}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Tác giả: {skkn.author} ({skkn.school})</span>
                  <button
                    onClick={() => handleCopyCitation(skkn.citationFormat, skkn.id)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center space-x-1.5 transition"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedId === skkn.id ? 'Đã Trích Dẫn!' : 'Trích Dẫn SKKN'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Tài Liệu Trong Kho Trí Tuệ AI ({docs.length})</h3>
            <label className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 cursor-pointer transition">
              <Upload className="w-3.5 h-3.5" />
              <span>Tải Lên Tài Liệu Mới</span>
              <input type="file" multiple accept=".pdf,.docx,.doc,.txt" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="space-y-3">
            {docs.map((d) => (
              <div key={d.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-indigo-500/40 transition">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{d.name}</h4>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-0.5">
                      <span>{d.type}</span>
                      <span>•</span>
                      <span>{d.size}</span>
                      <span>•</span>
                      <span>{d.uploadedAt}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteDoc(d.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

