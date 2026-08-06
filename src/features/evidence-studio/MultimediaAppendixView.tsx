import React, { useState } from 'react';
import { QrCode, Plus, Link, Trash2, CheckCircle2, FileText, Video, Image, FormInput } from 'lucide-react';
import { SKKNProject, AppendixQRItem } from '../../types/skkn';
import { generateQRCodeDataUrl } from '../../services/qrCodeService';

interface MultimediaAppendixViewProps {
  project: SKKNProject;
  onUpdateProject: (p: SKKNProject) => void;
}

export const MultimediaAppendixView: React.FC<MultimediaAppendixViewProps> = ({
  project,
  onUpdateProject,
}) => {
  const [title, setTitle] = useState<string>('Kế hoạch bài dạy (Giáo án 5512)');
  const [type, setType] = useState<AppendixQRItem['type']>('lesson_plan_5512');
  const [url, setUrl] = useState<string>('https://drive.google.com/file/d/giao-an-5512-mau');
  const [note, setNote] = useState<string>('Mã QR mở file Word/PDF kế hoạch bài dạy 2 tiết thực nghiệm');

  const items = project.qrAppendixItems || [];

  const handleAddQRItem = async () => {
    if (!url.trim()) return;
    const qrDataUrl = await generateQRCodeDataUrl(url);

    const newItem: AppendixQRItem = {
      id: 'qr-' + Date.now(),
      title,
      type,
      url,
      qrDataUrl,
      note
    };

    onUpdateProject({
      ...project,
      qrAppendixItems: [...items, newItem]
    });

    setTitle('Video tiết dạy thực nghiệm');
    setType('teaching_video');
    setUrl('https://youtube.com/watch?v=demo-tiet-day-skkn');
  };

  const handleDeleteItem = (id: string) => {
    onUpdateProject({
      ...project,
      qrAppendixItems: items.filter((it) => it.id !== id)
    });
  };

  const typeIcons = {
    lesson_plan_5512: FileText,
    teaching_video: Video,
    photo_gallery: Image,
    survey_form: FormInput
  };

  return (
    <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-emerald-400">
          <QrCode className="w-5 h-5" />
          <h3 className="text-sm font-bold text-white">Bộ Sinh Phụ Lục Đa Phương Tiện Có Mã QR Code (Tự Động Xuất File Word)</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">Đã tạo: {items.length} mã QR</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Form Create QR */}
        <div className="md:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-200">Tạo Mã QR Code Minh Chứng Mới</h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Loại minh chứng</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:border-emerald-500 focus:outline-none"
              >
                <option value="lesson_plan_5512">📄 Kế hoạch bài dạy (Giáo án 5512)</option>
                <option value="teaching_video">🎥 Video tiết dạy thực nghiệm</option>
                <option value="photo_gallery">🖼️ Bộ ảnh hoạt động nhóm học sinh</option>
                <option value="survey_form">📝 Phiếu khảo sát thực nghiệm trực tuyến</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Tiêu đề minh chứng</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Đường dẫn Link (Drive/YouTube/Form)</label>
              <div className="relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full p-3 pl-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-mono text-[11px] focus:border-emerald-500 focus:outline-none"
                />
                <Link className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Ghi chú hướng dẫn quét mã</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleAddQRItem}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow-md shadow-emerald-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Sinh Mã QR Code & Đưa Vào Phụ Lục</span>
            </button>
          </div>
        </div>

        {/* QR List Display */}
        <div className="md:col-span-7 space-y-3">
          <h4 className="text-xs font-bold text-slate-200">Phụ Lục Mã QR Đã Tạo ({items.length})</h4>

          {items.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 italic bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
              Chưa có mã QR nào. Hãy tạo mã QR ở form bên trái để đính kèm vào cuối bản Word SKKN.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((it) => {
                const Icon = typeIcons[it.type] || FileText;
                return (
                  <div key={it.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-bold text-slate-100 truncate">{it.title}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(it.id)}
                        className="text-slate-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {it.qrDataUrl && (
                      <div className="bg-white p-2 rounded-xl mx-auto border border-slate-300 shadow-md">
                        <img src={it.qrDataUrl} alt={it.title} className="w-28 h-28 object-contain" />
                      </div>
                    )}

                    <div className="text-[11px] text-slate-400 text-center truncate font-mono">
                      {it.url}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
