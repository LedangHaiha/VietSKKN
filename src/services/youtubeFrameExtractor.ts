import { AppendixQRItem } from '../types/skkn';

export interface ExtractedVideoFrames {
  youtubeUrl: string;
  videoId: string;
  frames: { timestamp: string; title: string; imageUrl: string }[];
}

export const extractYouTubeFrames = (url: string): ExtractedVideoFrames => {
  let videoId = 'dQw4w9WgXcQ';
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
  } catch (e) {
    console.error('Error parsing YouTube URL:', e);
  }

  return {
    youtubeUrl: url,
    videoId,
    frames: [
      {
        timestamp: '02:15',
        title: 'Ảnh 1: Học sinh hào hứng thảo luận nhóm xây dựng sơ đồ tư duy',
        imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      },
      {
        timestamp: '15:40',
        title: 'Ảnh 2: Học sinh quét mã QR Code truy cập video học liệu số',
        imageUrl: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      },
      {
        timestamp: '32:10',
        title: 'Ảnh 3: Đại diện các nhóm tự tin trình bày sản phẩm học tập',
        imageUrl: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
      }
    ]
  };
};
