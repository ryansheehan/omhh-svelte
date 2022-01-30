import {readable} from 'svelte/store';
import { browser } from '$app/env';

export enum MediaSize {
  none = 0x00,
  mobile = 0x01,
  tablet = 0x02,
  laptop = 0x04,
  all = 0x0f,
  tabletAndLarger = 0x0e,
  laptopAndLarger = 0x0c,
  desktopAndLarger = 0x08,
}

export function printMediaSize(mediaSize: number) {
  const yes = '✅';
  const no = '⛔';
  
  console.table({    
    mobile: mediaSize === MediaSize.mobile ? yes : no,
    tabletAndLarger: mediaSize === MediaSize.tabletAndLarger ? yes : no,
    laptopAndLarger: mediaSize === MediaSize.laptopAndLarger ? yes : no,
    desktopAndLarger: mediaSize === MediaSize.desktopAndLarger ? yes : no,
  })
}

export function isTabletAndLarger(mediaQuerySize: number) {
  return Boolean(mediaQuerySize & MediaSize.tabletAndLarger);
}

export function isLaptopAndLarger(mediaQuerySize: number) {
  return Boolean(mediaQuerySize & MediaSize.laptopAndLarger);
}

export function isDesktopAndLarger(mediaQuerySize: number) {
  return Boolean(mediaQuerySize & MediaSize.desktopAndLarger);
}

export const mediaSize = readable<MediaSize>(MediaSize.mobile, set => {
  if (browser) {
    // values need to match what is set in the __layout.svelte custom media queries
    const mql_tabletAndLarger = window.matchMedia('(min-width: 34.375rem)');
    const mql_laptopAndLarger = window.matchMedia('(min-width: 68.75rem)');
    const mql_desktopAndLarger = window.matchMedia('(min-width: 93.75rem)'); 
    
    const update = () => {       
      let mediaQuerySize = MediaSize.none;

      if (mql_desktopAndLarger.matches) {        
        mediaQuerySize = MediaSize.desktopAndLarger;
      } else if (mql_laptopAndLarger.matches) {         
        mediaQuerySize = MediaSize.laptopAndLarger;      
      } else if (mql_tabletAndLarger.matches) {        
        mediaQuerySize = MediaSize.tabletAndLarger;
      } else {
        mediaQuerySize = MediaSize.mobile;
      }     

      set(mediaQuerySize);      
    }
        
    update();
  
    mql_tabletAndLarger.addEventListener('change', update);
    mql_laptopAndLarger.addEventListener('change', update);
    mql_desktopAndLarger.addEventListener('change', update);

    return () => {
      mql_tabletAndLarger.removeEventListener('change', update);
      mql_laptopAndLarger.removeEventListener('change', update);
      mql_desktopAndLarger.removeEventListener('change', update);      
    }
  } else {
    set(MediaSize.mobile);
  }
});
