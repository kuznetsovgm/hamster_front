import equal from "fast-deep-equal"
import { EmptyObject } from "../interfaces"

export const isEqualObjects = equal

export const hasOwnProperty = <T extends object>(
  data: T,
  key: any,
): key is keyof T => {
  return Object.prototype.hasOwnProperty.call(data, key)
}

export const getNotEmptyObjectOrUndefined = <T extends any = any>(
  obj: T | undefined,
): T extends EmptyObject ? undefined : T => {
  return (
    Object.keys(obj ?? {}).length > 0 ? obj : undefined
  ) as T extends EmptyObject ? undefined : T
}
