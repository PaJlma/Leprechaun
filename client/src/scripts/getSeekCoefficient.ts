export function getSeekCoefficient(position: number, element: HTMLElement): number {
  return (position - element.getBoundingClientRect().left) / element.clientWidth; 
}
