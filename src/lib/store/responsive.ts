import {readable} from 'svelte/store';
import { browser } from '$app/env';
import { query } from '../responsive';

export enum MediaSize {
  none = 0x00,
  mobile = 0x08,
  tablet = 0x04,
  laptop = 0x02,
  desktop = 0x01,  
  mobileAndLarger = 0x08,
  tabletAndLarger = 0x0c,
  laptopAndLarger = 0x0e,
  desktopAndLarger = 0x0f,
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
  return Boolean(mediaQuerySize >= MediaSize.tabletAndLarger);
}

export function isLaptopAndLarger(mediaQuerySize: number) {
  return Boolean(mediaQuerySize >= MediaSize.laptopAndLarger);
}

export function isDesktopAndLarger(mediaQuerySize: number) {
  return Boolean(mediaQuerySize >= MediaSize.desktopAndLarger);
}

export const mediaSize = readable<MediaSize>(MediaSize.mobile, set => {
  if (browser) {    
    const mql_tabletAndLarger = window.matchMedia(query.tabletAndLarger);
    const mql_laptopAndLarger = window.matchMedia(query.laptopAndLarger);
    const mql_desktopAndLarger = window.matchMedia(query.desktopAndLarger);
    
    const update = () => {       
      let mediaQuerySize = MediaSize.none;

      if (mql_desktopAndLarger.matches) {        
        mediaQuerySize = MediaSize.desktopAndLarger;
      } else if (mql_laptopAndLarger.matches) {         
        mediaQuerySize = MediaSize.laptopAndLarger;      
      } else if (mql_tabletAndLarger.matches) {        
        mediaQuerySize = MediaSize.tabletAndLarger;
      } else {
        mediaQuerySize = MediaSize.mobileAndLarger;
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
