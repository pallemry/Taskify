import React, { useEffect, useState } from 'react'

const getLocalStorageItem = (key: string, initialValue: any) => {
    const savedJSON = window.localStorage.getItem(key);
    
    if (savedJSON) {
        return JSON.parse(savedJSON);
    } else if (initialValue instanceof Function) {
        return initialValue()
    } else {
        return initialValue;
    }
};

export default function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => getLocalStorageItem(key, initialValue));

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value])

    return [value, setValue]
}
