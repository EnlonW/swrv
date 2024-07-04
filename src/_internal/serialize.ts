import stableHash from "stable-hash"
import { isFunction } from "."
import type { Arguments, Key } from "../types"

// From https://github.com/vercel/swr/blob/main/src/_internal/utils/serialize.ts
export const serialize = (key: Key): [string, Arguments] => {
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
