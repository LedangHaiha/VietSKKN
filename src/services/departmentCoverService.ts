export interface DepartmentPreset {
  id: string;
  name: string;
  code: string;
  headerTitle: string;
  borderStyle: 'double' | 'thick_thin' | 'modern' | 'traditional';
  primaryColor: string;
  margins: { top: number; bottom: number; left: number; right: number }; // in cm
  sampleNotes: string;
}

export const DEPARTMENT_PRESETS: DepartmentPreset[] = [
  {
    id: 'dept-hanoi',
    name: 'Sở Giáo dục và Đào tạo Hà Nội',
    code: 'HANOI',
    headerTitle: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ HÀ NỘI',
    borderStyle: 'double',
    primaryColor: '#1E3A8A',
    margins: { top: 2.0, bottom: 2.0, left: 3.0, right: 2.0 },
    sampleNotes: 'Quy chuẩn khung viền đôi, cỡ chữ tiêu đề SKKN 32pt, căn lề Trái 3cm'
  },
  {
    id: 'dept-namdinh',
    name: 'Sở Giáo dục và Đào tạo Nam Định',
    code: 'NAMDINH',
    headerTitle: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH NAM ĐỊNH',
    borderStyle: 'thick_thin',
    primaryColor: '#0F766E',
    margins: { top: 2.5, bottom: 2.0, left: 3.5, right: 2.0 },
    sampleNotes: 'Quy chuẩn lề Trái 3.5cm cho đóng sổ gáy xoắn, khung nét thanh nét đậm'
  },
  {
    id: 'dept-hcm',
    name: 'Sở Giáo dục và Đào tạo TP. Hồ Chí Minh',
    code: 'HCM',
    headerTitle: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO THÀNH PHỐ HỒ CHÍ MINH',
    borderStyle: 'modern',
    primaryColor: '#4338CA',
    margins: { top: 2.0, bottom: 2.0, left: 3.0, right: 2.0 },
    sampleNotes: 'Bìa phong cách thiết kế hiện đại, có khoảng trống chèn mã QR Code công khai'
  },
  {
    id: 'dept-thanhhoa',
    name: 'Sở Giáo dục và Đào tạo Thanh Hóa',
    code: 'THANHHOA',
    headerTitle: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH THANH HÓA',
    borderStyle: 'traditional',
    primaryColor: '#1E1B4B',
    margins: { top: 2.0, bottom: 2.0, left: 3.0, right: 2.0 },
    sampleNotes: 'Phông chữ truyền thống nghiêm trang kèm dòng chữ Hội đồng Thẩm định'
  }
];
