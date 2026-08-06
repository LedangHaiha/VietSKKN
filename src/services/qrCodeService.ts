import QRCode from 'qrcode';

export interface AppendixQRItem {
  id: string;
  title: string;
  type: 'lesson_plan_5512' | 'teaching_video' | 'photo_gallery' | 'survey_form';
  url: string;
  qrDataUrl?: string;
  note?: string;
}

export const generateQRCodeDataUrl = async (text: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(text, {
      width: 250,
      margin: 2,
      color: {
        dark: '#1e1b4b',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Error generating QR Code:', err);
    return '';
  }
};
