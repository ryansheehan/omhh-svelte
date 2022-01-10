import { writable } from 'svelte/store';
import type { ScaleFactor } from '$lib/fraction';

export type {ScaleFactor} from '$lib/fraction';

export enum Scale {
  half='½',
  x1='1',
  x2='2',
  x3='3',
}

export interface PrintableScaleFactor extends ScaleFactor {
  toString: () => string;
}

const half: PrintableScaleFactor = {amount: 1, divisor: 2, toString: () => Scale.half};
const x1: PrintableScaleFactor = {amount: 1, divisor: 1, toString: () => Scale.x1};
const x2: PrintableScaleFactor = {amount: 2, divisor: 1, toString: () => Scale.x2};
const x3: PrintableScaleFactor = {amount: 3, divisor: 1, toString: () => Scale.x3};

export const scaleValues: Record<string, PrintableScaleFactor> = {
  [Scale.half]: half,
  [Scale.x1]: x1,
  [Scale.x2]: x2,
  [Scale.x3]: x3,
};

export const createRecipeScale = () => {
  const {subscribe, set} = writable<PrintableScaleFactor>(x1);
  return {
    subscribe,
    set: (scale: Scale) => {      
      switch(scale) {
        case Scale.half: set(half); break;
        case Scale.x1: set(x1); break;
        case Scale.x2: set(x2); break;
        case Scale.x3: set(x3); break;
      }
    }
  }
}

export const scale = createRecipeScale();