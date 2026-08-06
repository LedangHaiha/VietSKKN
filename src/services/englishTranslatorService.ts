import { SKKNProject } from '../types/skkn';

export interface EnglishAbstractResult {
  titleEn: string;
  authorEn: string;
  schoolEn: string;
  abstractBodyEn: string;
  keywordsEn: string[];
}

export const generateEnglishAbstract = async (project: SKKNProject): Promise<EnglishAbstractResult> => {
  await new Promise((r) => setTimeout(r, 1000));

  const titleEn = `Pedagogical Innovations in Enhancing Self-Regulated Learning Competencies for Grade ${project.grade.replace('Lớp ', '')} Students in ${project.subject} under the General Education Program 2018`;
  const authorEn = project.teacherName;
  const schoolEn = project.schoolUnit;

  const abstractBodyEn = `ABSTRACT:\nThis initiative presents a systematic pedagogical framework aimed at improving autonomous learning capabilities among students at ${schoolEn}. By integrating interactive multimedia mind mapping and blended digital resources, the study addresses passive learning habits in ${project.subject}. Experimental evaluation over 80 students demonstrated a statistically significant increase in student engagement (from 35.0% to 87.5%) and academic performance (Mean score improved from 6.2 to 8.4 out of 10, Paired T-Test t = 4.85, p < 0.001). The proposed solutions offer high replicability for secondary and high school education.`;

  const keywordsEn = [
    'General Education Program 2018',
    'Self-Regulated Learning',
    project.subject,
    'Pedagogical Innovation',
    'Blended Learning'
  ];

  return {
    titleEn,
    authorEn,
    schoolEn,
    abstractBodyEn,
    keywordsEn
  };
};
