export function getNotEmptyArrayOrUndefined<T extends any = any,>(arr: T[] | undefined): T[] | undefined {
    return Array.isArray(arr) && arr.length > 0 ? arr : undefined;
}