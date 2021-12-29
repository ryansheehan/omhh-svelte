export interface ScaleFactor {
  amount: number;
  divisor: number;
}

export const fractionString: Record<number, Record<number, string>> = {
  2: { 1: '½', },
  3: { 1: '⅓', 2: '⅔', },
  4: { 1: '¼', 2: '½', 3: '¾', },
  5: { 1: '⅕', 2: '⅖', 3: '⅗', 4: '⅘', },
  6: { 1: '⅙', 2: '⅓', 3: '½', 4: '⅔', 5: '⅚', },
  8: { 1: '⅛', 2: '¼', 3: '⅜', 4: '½', 5: '⅝', 6: '¾', 7: '⅞', }
};

export function printFraction(amount: number | ScaleFactor, divisor?: number) {
  let numerator: number;
  if (typeof amount === 'number') {
    numerator = amount;
  } else {
    numerator = amount.amount;
    divisor = amount.divisor;
  }

  let wholeNumber = '';
  let fraction = '';
  
  if (!divisor) { 
    wholeNumber = numerator.toString();
  } else if (divisor === numerator) {
    wholeNumber = '1';
  } else {
    if (numerator > divisor) {
      const whole = Math.floor(numerator / divisor);
      wholeNumber = whole.toString();
      numerator -= (whole * divisor);
    }
  
    if (numerator !== 0) {
      const fracSet = fractionString[divisor];
      if (fracSet) {
        fraction = fracSet[numerator];
      }
      else {
        fraction = ` ${numerator}/${divisor}`; // leading space important
      }    
    }
  }
  return `${wholeNumber}${fraction}`;
}