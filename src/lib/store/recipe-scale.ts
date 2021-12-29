import { writable } from 'svelte/store';
import type { ScaleFactor } from '$lib/fraction';

export type {ScaleFactor} from '$lib/fraction';

export enum Scale {
  half='½',
  x1='1',
  x2='2',
  x3='3',
}

const half: ScaleFactor = {amount: 1, divisor: 2};
const x1: ScaleFactor = {amount: 1, divisor: 1};
const x2: ScaleFactor = {amount: 2, divisor: 1};
const x3: ScaleFactor = {amount: 3, divisor: 1};

export const scaleValues: Record<string, ScaleFactor> = {
  [Scale.half]: half,
  [Scale.x1]: x1,
  [Scale.x2]: x2,
  [Scale.x3]: x3,
};

export const createRecipeScale = () => {
  const {subscribe, set} = writable<ScaleFactor>(x1);
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