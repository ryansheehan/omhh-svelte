// breakpoints - need to match the custom breakpoints setup in routes/__layout.svelte
export const tablet = 550;
export const laptop = 1100;
export const desktop = 1500;

// values need to match what is set in the __layout.svelte custom media queries
export const query = {
  tabletAndLarger: `(min-width: ${tablet / 16}rem)`,
  laptopAndLarger: `(min-width: ${laptop / 16}rem)`,
  desktopAndLarger: `(min-width: ${desktop / 16}rem)`,
}
export interface ResponsiveImgFields {
  widths: number[];
  sizes: string[];
}

type ImageSize = 'full' | 'aside' | 'thumbnail';

export const imageConfig: Record<ImageSize, ResponsiveImgFields> = {
  full: {
    widths: [700, 600, 400],
    sizes: [`${query.laptopAndLarger} 700px`, `${query.tabletAndLarger} 600px`, '400px'],
  },
  aside: {
    widths: [345],
    sizes: [`345px`],
  },
  thumbnail: {
    widths: [200],
    sizes: ['200px'],
  }
}

