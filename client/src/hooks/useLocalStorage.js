import {useEffect, useState} from 'react';

const useLocalStorage = (key,initialValue) => {
    const [value,setValue] = useState(()=>{
        const jsonValue = JSON.parse(localStorage.getItem(key))
        if(jsonValue !== null) return jsonValue
        if(typeof initialValue === "function") return initialValue()
        return initialValue
    })
    useEffect(()=>{
         localStorage.setItem(key,JSON.stringify(value))
    },[value,key])
    return [value,setValue]
}

export default useLocalStorage
