import { SKKNProject } from '../types/skkn';

export interface CloudShareSession {
  roomCode: string;
  projectName: string;
  ownerTeacher: string;
  collaborators: { name: string; school: string; role: 'Co-Author' | 'Reviewer' }[];
  lastSyncedAt: string;
}

export const generateShareRoomCode = (project: SKKNProject): CloudShareSession => {
  const roomCode = 'SKKN-' + Math.floor(100000 + Math.random() * 900000);

  return {
    roomCode,
    projectName: project.title,
    ownerTeacher: project.teacherName,
    collaborators: [
      { name: project.teacherName, school: project.schoolUnit, role: 'Co-Author' },
      { name: 'ThS. Nguyễn Văn Bình', school: 'Tổ trưởng Tổ Chuyên môn', role: 'Reviewer' }
    ],
    lastSyncedAt: new Date().toLocaleTimeString('vi-VN')
  };
};

export const exportProjectPackageJSON = (project: SKKNProject) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `SKKN_PACKAGE_${project.teacherName.replace(/\s+/g, '_')}.skkn`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
