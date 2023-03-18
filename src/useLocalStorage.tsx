import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if(!jsonValue) {
            if(typeof initialValue !== 'function') return initialValue
            return (initialValue as () => T)()
        } else {
            return JSON.parse(jsonValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    })

    return [value, setValue] as [T, typeof setValue] 
}