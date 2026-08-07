import { SKKNProject, SKKNSection } from '../types/skkn';

const STORAGE_KEY_PROJECTS = 'ai_skkn_pro_projects_v1';
const STORAGE_KEY_ACTIVE = 'ai_skkn_pro_active_id_v1';

export const createEmptyProject = (title: string = 'Sáng kiến kinh nghiệm mới'): SKKNProject => {
  const id = 'skkn-' + Date.now();
  const now = new Date().toISOString();

  const defaultSections: SKKNSection[] = [
    {
      id: 'sec-1',
      code: 'I_MODAU',
      romanTitle: 'I. MỞ ĐẦU',
      title: 'MỞ ĐẦU',
      orderIndex: 1,
      content: '',
      subSections: [
        { id: 'sub-1-1', subNumbering: '1. Lý do chọn sáng kiến', title: 'Lý do chọn sáng kiến', content: '' },
        { id: 'sub-1-2', subNumbering: '2. Mục tiêu nghiên cứu', title: 'Mục tiêu (Mục tiêu chung và các mục tiêu cụ thể)', content: '' },
        { id: 'sub-1-3', subNumbering: '3. Phạm vi nghiên cứu', title: 'Phạm vi (Đối tượng, không gian, thời gian, nội dung)', content: '' },
      ]
    },
    {
      id: 'sec-2',
      code: 'II_COSO',
      romanTitle: 'II. CƠ SỞ LÝ LUẬN VÀ CƠ SỞ THỰC TIỄN',
      title: 'CƠ SỞ LÝ LUẬN VÀ CƠ SỞ THỰC TIỄN',
      orderIndex: 2,
      content: '',
      subSections: [
        { id: 'sub-2-1', subNumbering: '1. Cơ sở lý luận', title: 'Khái niệm, cơ sở khoa học, quan điểm GDPT 2018 và văn bản pháp lý', content: '' },
        { id: 'sub-2-2', subNumbering: '2. Cơ sở thực tiễn', title: 'Thực trạng, số liệu khảo sát, ưu điểm, hạn chế, nguyên nhân và bài học', content: '' },
      ]
    },
    {
      id: 'sec-3',
      code: 'III_NOIDUNG',
      romanTitle: 'III. NỘI DUNG SÁNG KIẾN',
      title: 'NỘI DUNG SÁNG KIẾN',
      orderIndex: 3,
      content: '',
      subSections: [
        { id: 'sub-3-1', subNumbering: '1. Nội dung và kết quả nghiên cứu', title: 'Hệ thống các giải pháp đột phá, quy trình thực hiện, thực nghiệm và phân tích số liệu', content: '' },
        { id: 'sub-3-2', subNumbering: '2. Thảo luận kết quả', title: 'Tính mới, khả năng áp dụng nhân rộng và hiệu quả mang lại (Giáo dục, Xã hội, Kinh tế)', content: '' },
      ]
    },
    {
      id: 'sec-4',
      code: 'IV_KETLUAN',
      romanTitle: 'IV. KẾT LUẬN VÀ KIẾN NGHỊ',
      title: 'KẾT LUẬN VÀ KIẾN NGHỊ',
      orderIndex: 4,
      content: '',
      subSections: [
        { id: 'sub-4-1', subNumbering: '1. Kết luận', title: 'Tổng kết kết quả đạt được, hạn chế và hướng phát triển', content: '' },
        { id: 'sub-4-2', subNumbering: '2. Kiến nghị và đề xuất', title: 'Kiến nghị đối với Nhà trường, Giáo viên, Học sinh và Cơ quan quản lý', content: '' },
      ]
    }
  ];

  return {
    id,
    title,
    teacherName: 'Nguyễn Văn A',
    schoolUnit: 'Trường THCS Lê Quý Đôn',
    educationLevel: 'THCS',
    subject: 'Ngữ văn',
    grade: 'Lớp 8',
    academicYear: '2025 - 2026',
    currentStep: 1,
    status: 'draft',
    createdAt: now,
    updatedAt: now,
    sections: defaultSections,
    solutions: [],
    evidences: []
  };
};

export const getStoredProjects = (): SKKNProject[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading projects:', e);
    return [];
  }
};

export const saveProjectsToStorage = (projects: SKKNProject[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects:', e);
  }
};

export const saveActiveProjectId = (id: string) => {
  localStorage.setItem(STORAGE_KEY_ACTIVE, id);
};

export const getActiveProjectId = (): string | null => {
  return localStorage.getItem(STORAGE_KEY_ACTIVE);
};
