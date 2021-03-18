// 判断字符串是否存在数组中
export function inArray(target: any, source: any[]) {
  return source.indexOf(target) !== -1;
}

export function limitNumberInRange(
  target: number,
  min: number,
  max: number
): number {
  return Math.min(Math.max(target, min), max);
}
