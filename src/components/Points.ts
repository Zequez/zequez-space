export type Point = [number, number]
export type Points = [number, number, Point, Point]

export const clone = (p: Points): Points => {
  return [p[0], p[1], [p[2][0], p[2][1]], [p[3][0], p[3][1]]]
}
