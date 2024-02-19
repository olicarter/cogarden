import {
  type ForwardedRef,
  type MutableRefObject,
  type RefCallback,
} from 'react'

export default function mergeRefs<T>(
  ...refs: (MutableRefObject<T> | ForwardedRef<T> | RefCallback<T>)[]
) {
  return (element: T) => {
    refs.forEach(ref => {
      if (ref) {
        if (typeof ref === 'function') ref(element)
        else ref.current = element
      }
    })
  }
}
