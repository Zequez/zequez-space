export const isBrowser = (): boolean => typeof window !== 'undefined'

export const capitalize = (str: string): string =>
  str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))

export const joinPaths = (paths: string[]): string => {
  return paths.length === 0 ? '/' : `/${paths.join('/')}/`
}
