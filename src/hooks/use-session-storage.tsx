'use client'
import { useEffect, useRef, useState } from 'react'

interface UseSessionStorageProps {
    key: string;
    initialState: any;
}

const UseSessionStorage = ({ key, initialState }: UseSessionStorageProps) => {
    const isMounted = useRef(false)
    const [sessionState, setSessionState] = useState(initialState);

    useEffect(() => {
        try {
          const item = sessionStorage.getItem(key)
          if (item) {
            setSessionState(JSON.parse(item))
          }
        } catch (e) {
          console.log(e)
        }
        return () => {
          isMounted.current = false
        }
      }, [key])
    

      useEffect(() => {
        if (isMounted.current) {
          sessionStorage.setItem(key, JSON.stringify(sessionState))
        } else {
          isMounted.current = true
        }
      }, [key, sessionState])

    return [sessionState, setSessionState];
}

export default UseSessionStorage