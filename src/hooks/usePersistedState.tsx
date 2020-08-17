import React, {useEffect, useState} from "react";

export default function usePersistedState<T>(key: string, defaultValue?:T) {

    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        console.log("Stikyvalue" + key + stickyValue);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });

    useEffect(() => {
        if (value != null) {
            console.log("setting state" + JSON.stringify(value));
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);
    return [value, setValue];
}


export function getPersistedValue(key:string): any {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
        ? JSON.parse(stickyValue)
        : null;
}
