// breakpoints - need to match the custom breakpoints setup in routes/__layout.svelte
export const tablet = 550;
export const laptop = 1100;
export const desktop = 1500;

export const query = {
  tabletAndLarger: `(min-width: ${tablet / 16}rem)`,
  laptopAndLarger: `(min-width: ${laptop / 16}rem)`,
  desktopAndLarger: `(min-width: ${desktop / 16}rem)`,
}
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

