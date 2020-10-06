export const isBrowser = (): boolean => typeof window !== 'undefined'

export const capitalize = (str: string): string =>
  str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))

export const joinPaths = (paths: string[]): string => {
  return paths.length === 0 ? '/' : `/${paths.join('/')}/`
}

export function reverseMap<T, O>(
  arg: T[],
  fn: (a: T, index: number) => O
): O[] {
  const l = arg.length - 1
  return arg.map((_, i, arr) => fn(arr[l - i], l - 1))
}
