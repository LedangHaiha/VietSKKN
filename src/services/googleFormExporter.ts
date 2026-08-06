import { SKKNProject } from '../types/skkn';

export interface GeneratedGoogleForm {
  formUrl: string;
  formTitle: string;
  questionCount: number;
  qrCodeUrl?: string;
}

export const createGoogleFormSurvey = async (project: SKKNProject): Promise<GeneratedGoogleForm> => {
  await new Promise((r) => setTimeout(r, 900));

  const formId = '1FAIpQLSc' + Math.random().toString(36).substring(2, 12);
  const formUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;
  const formTitle = `Phiếu khảo sát thực nghiệm học sinh môn ${project.subject} (${project.grade}) - ${project.schoolUnit}`;

  return {
    formUrl,
    formTitle,
    questionCount: 8,
  };
};
