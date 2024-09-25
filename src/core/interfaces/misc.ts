export type NotRequired<T> = {
  [P in keyof T]: T[P] | undefined
}
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export type EmptyObject = {
  [x: string]: never
  [x: number]: never
}
