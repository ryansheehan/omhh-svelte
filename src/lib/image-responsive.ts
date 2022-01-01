export interface ResponsiveImgFields {
  widths: number[];
  sizes: string[];
}

type ImageSize = 'full' | 'thumbnail';

export const imageConfig: Record<ImageSize, ResponsiveImgFields> = {
  full: {
    widths: [400],
    sizes: ['400px'],
  },
  thumbnail: {
    widths: [200],
    sizes: ['200px'],
  }
}