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
        { id: 'sub-1-1', subNumbering: '1. Lý do chọn đề tài', title: 'Lý do chọn đề tài', content: '' },
        { id: 'sub-1-2', subNumbering: '2. Mục đích nghiên cứu', title: 'Mục đích nghiên cứu', content: '' },
        { id: 'sub-1-3', subNumbering: '3. Đối tượng và phạm vi nghiên cứu', title: 'Đối tượng và phạm vi nghiên cứu', content: '' },
        { id: 'sub-1-4', subNumbering: '4. Phương pháp nghiên cứu', title: 'Phương pháp nghiên cứu', content: '' },
        { id: 'sub-1-5', subNumbering: '5. Tính mới của sáng kiến', title: 'Tính mới của sáng kiến', content: '' },
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
        { id: 'sub-2-1', subNumbering: '1. Cơ sở lý luận', title: 'Cơ sở lý luận theo GDPT 2018', content: '' },
        { id: 'sub-2-2', subNumbering: '2. Cơ sở thực tiễn và thực trạng', title: 'Thực trạng giảng dạy và học tập', content: '' },
        { id: 'sub-2-3', subNumbering: '3. Phân tích nguyên nhân thực trạng', title: 'Phân tích nguyên nhân thực trạng', content: '' },
      ]
    },
    {
      id: 'sec-3',
      code: 'III_NOIDUNG',
      romanTitle: 'III. NỘI DUNG SÁNG KIẾN KHẢO SÁT VÀ GIẢI PHÁP',
      title: 'NỘI DUNG SÁNG KIẾN',
      orderIndex: 3,
      content: '',
      subSections: [
        { id: 'sub-3-1', subNumbering: '1. Các giải pháp thực hiện', title: 'Hệ thống giải pháp cải tiến', content: '' },
        { id: 'sub-3-2', subNumbering: '2. Kết quả thực nghiệm và đối chứng', title: 'Kết quả đạt được sau khi áp dụng', content: '' },
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
        { id: 'sub-4-1', subNumbering: '1. Kết luận', title: 'Kết luận chung', content: '' },
        { id: 'sub-4-2', subNumbering: '2. Bài học kinh nghiệm', title: 'Bài học kinh nghiệm rút ra', content: '' },
        { id: 'sub-4-3', subNumbering: '3. Kiến nghị và đề xuất', title: 'Kiến nghị đối với các cấp quản lý', content: '' },
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
