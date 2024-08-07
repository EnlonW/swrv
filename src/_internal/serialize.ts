import stableHash from "stable-hash"
import type { Arguments, SWRKey } from "../types"
import { isFunction } from "./shared"

// From https://github.com/vercel/swr/blob/main/src/_internal/utils/serialize.ts
export const serialize = (key: SWRKey): [string, Arguments] => {
  if (isFunction(key)) {
    try {
      key = key()
    } catch (err) {
      // dependencies not ready
      key = ''
    }
  }

  // Use the original key as the argument of fetcher. This can be a string or an
  // array of values.
  const args = key

  // If key is not falsy, or not an empty array, hash it.
  key =
    typeof key == 'string'
      ? key
      : (Array.isArray(key) ? key.length : key)
        ? stableHash(key)
        : ''

  return [key, args]
}
