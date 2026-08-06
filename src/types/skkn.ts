export type EducationLevel = 'Tiểu học' | 'THCS' | 'THPT' | 'Mầm nông' | 'GDTX';

export type SKKNSectionCode = 'I_MODAU' | 'II_COSO' | 'III_NOIDUNG' | 'IV_KETLUAN';

export interface SubSection {
  id: string;
  subNumbering: string; // e.g. "1.1", "3.2.1"
  title: string;
  content: string;
  notes?: string;
}

export interface SKKNSection {
  id: string;
  code: SKKNSectionCode;
  romanTitle: string; // e.g. "I. MỞ ĐẦU"
  title: string;
  content: string;
  subSections: SubSection[];
  orderIndex: number;
}

export interface AppendixQRItem {
  id: string;
  title: string;
  type: 'lesson_plan_5512' | 'teaching_video' | 'photo_gallery' | 'survey_form';
  url: string;
  qrDataUrl?: string;
  note?: string;
}

export interface SKKNProject {
  id: string;
  title: string;
  teacherName: string;
  schoolUnit: string;
  educationLevel: EducationLevel;
  subject: string;
  grade: string;
  academicYear: string;
  currentStep: number; // 1 to 15 steps
  status: 'draft' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  sections: SKKNSection[];
  solutions: SKKNSolution[];
  evidences: SKKNEvidence[];
  qrAppendixItems?: AppendixQRItem[];
  researchData?: {
    legalRefs: string[];
    theoreticalBasis: string;
    literatureReview: string;
    citations?: string[];
  };
}

export interface SKKNSolution {
  id: string;
  code: string; // e.g. "GP-01"
  title: string;
  advantages: string;
  disadvantages: string;
  practicalComparison: string;
  noveltyFeatures: string;
  implementationSteps: string[];
  targetedCompetencies: string[]; // Ma trận năng lực phẩm chất GDPT 2018
}

export interface SurveyQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface SKKNEvidence {
  id: string;
  title: string;
  type: 'survey' | 'table' | 'chart' | 'appendix';
  description: string;
  surveyQuestions?: SurveyQuestion[];
  surveyStats?: {
    sampleSize: number;
    beforeAgreePercent: number;
    afterAgreePercent: number;
    beforeScoreMean: number;
    afterScoreMean: number;
    tTestValue: number;
    pValue: number;
  };
  chartData?: {
    labels: string[];
    beforeData: number[];
    afterData: number[];
  };
  appendixContent?: string;
  createdAt: string;
}
