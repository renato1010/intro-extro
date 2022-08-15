export function getIntroExtroAsPercent(totalScore: number): number {
  return (20 / 3) * totalScore - 100 / 3;
}
