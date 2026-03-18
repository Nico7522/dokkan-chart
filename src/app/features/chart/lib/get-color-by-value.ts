export function getColorsByValue(data: number[]): string[] {
  const min = Math.min(...data);
  const max = Math.max(...data);

  return data.map((value) => {
    const ratio = (value - min) / (max - min); // 0 = min, 1 = max

    const r = Math.round(255 * ratio); // 0 → 255 (vert → rouge)
    const g = Math.round(255 * (1 - ratio)); // 255 → 0
    const b = 0;

    return `rgb(${r}, ${g}, ${b})`;
  });
}
