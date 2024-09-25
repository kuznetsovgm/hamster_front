import type {
  BaseQueryApi,
  BaseQueryFn,
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { resetAuth } from '.'

const mutex = new Mutex();

export const baseQueryWithReauth = async <
  BaseQuery extends BaseQueryFn = BaseQueryFn,
>(
  query: BaseQuery, 
  args: [args: any, api: BaseQueryApi, extraOptions: {}]
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await query(...args);
  if (
    'error' in result 
    && 'status' in (result as any).error 
    && (result.error as any).status === 401
  ) {
    const api = args[1];
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
          api.dispatch(resetAuth());
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await query(...args);
    }
  }
  return result;
}