// source is google search widget 

import type { PortionData } from "./sanity";

// volume unit to ml
export const volumeConversion_ml = new Map([
  ['ml' , 1],
  ['l'  , 1000],
  ['t'  , 4.92892],
  ['T'  , 14.7868],
  ['c'  , 240],
  ['gal', 3785.41],
  ['pt' , 473.176],
  ['qt' , 946.353],
]);

// mass unit to g
export const massConversion_g = new Map([
  ['g' , 1],
  ['oz', 28.3495],
  ['lb', 453.592],
])

export interface ConversionArgs {
  amount: number;
  fromUnit: string;
  fromModifier?: string;
  toUnit: string;  
  portions?: PortionData[];
}

export function convertAmount({amount, fromUnit, fromModifier, toUnit, portions}: ConversionArgs): number | undefined {
  let convertedAmount: undefined | number = undefined;
  if (fromModifier && !portions) {
    return undefined;
  } else if (fromModifier && portions) {
    const portion = portions.find(({unit, modifier}) => unit === fromUnit && modifier === fromModifier);
    if (portion) {
      const grams = amount * portion.gram_weight / portion.amount;
      if (toUnit != 'g') {
        convertedAmount = grams / massConversion_g.get(toUnit);
      } else {
        convertedAmount = grams;
      }
    }
  } else {    
    if(volumeConversion_ml.has(fromUnit) && volumeConversion_ml.has(toUnit)) {
      convertedAmount = amount * volumeConversion_ml.get(fromUnit) / volumeConversion_ml.get(toUnit);
    } else if (massConversion_g.has(fromUnit) && massConversion_g.has(toUnit)) {
      convertedAmount = amount * massConversion_g.get(fromUnit) / massConversion_g.get(toUnit);
    } else if (portions) {
      // look for direct conversion volume->mass or mass-> volume conversion      
      let portion = portions.find(({unit, modifier}) => !modifier && unit === fromUnit);      
      if (portion) {
        const {amount: pAmount, gram_weight} = portion;
        convertedAmount = amount * gram_weight / pAmount;
      } else {
        if (volumeConversion_ml.has(fromUnit)) {          
          // check to see if the toUnit and the portions table have a unit that both exist in the volume table
          portion = portions.find(({unit, modifier}) => !modifier && volumeConversion_ml.has(unit));
          if (portion) {            
            // get a conversion factor from fromUnit to the unit in the portion table
            const factor = volumeConversion_ml.get(fromUnit) / volumeConversion_ml.get(portion.unit);
            convertedAmount = amount * factor * portion.gram_weight / portion.amount;
          }
        } else if (massConversion_g.has(fromUnit)) {
          // check to see if the toUnit and the portions table have a unit that both exist in the mass table          
          portion = portions.find(({unit, modifier}) => !modifier && massConversion_g.has(unit));
          if (portion) {
            // get a conversion factor from toUnit to the unit in the portion table
            const factor = massConversion_g.get(fromUnit) / massConversion_g.get(portion.unit);
            convertedAmount = amount * factor * portion.gram_weight / portion.amount;
          }
        }       
      }
    }
  }
  return convertedAmount;
}