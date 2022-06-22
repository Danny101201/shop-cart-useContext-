import React, { useState, useEffect } from "react"
export const useLocalStorge = <T>(key: string, value: T | (() => T)) => {
  const [item, setItem] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    if (typeof value === 'function') {
      return (value as () => T)()
    } else {
      return value
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(item))
  }, [item, key])
  return [item, setItem] as [typeof item, typeof setItem]
}