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
  return arg.map((_, i, arr) => fn(arr[l - i], l - i))
}

export function isTouchDevice() {
  try {
    document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}

export function onMultiDeviceHoverLeave(
  onHover: () => void,
  onLeave: () => void
) {
  const isTouch = isTouchDevice()
  return {
    onMouseOver: !isTouch ? onHover : undefined,
    onMouseLeave: !isTouch ? onLeave : undefined,
    onContextMenu: isTouch
      ? (ev: { preventDefault: () => void }) => {
          ev.preventDefault()
        }
      : undefined,
    onTouchStart: isTouch ? onHover : undefined,
    onTouchEnd: isTouch ? onLeave : undefined,
  }
}
