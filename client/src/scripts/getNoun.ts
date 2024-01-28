export function getNoun(number: number, w1: string, w2: string, w5: string): string {
  if (number >= 5) {
    return w5;
  }

  if (number >= 2) {
    return w2;
  }

  return w1;
}
