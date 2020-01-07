import React, { useEffect, useState } from 'react'

function useKey(key) {
  const [keyPressed, setKeyPressed] = useState(false)
  const match = event => key == event.key
  const onDown = event => {
    if (match(event)) {
      event.preventDefault()
      setKeyPressed(true)
      console.log(`${key} pressed`)
    }
  }
  const onUp = event => {
    if (match(event)) {
      event.preventDefault()
      setKeyPressed(false)
    }
  }

  useEffect(() => {
      window.addEventListener("keydown", onDown)
      window.addEventListener("keyup", onUp)
      return () => {
          window.removeEventListener("keydown", onDown)
          window.removeEventListener("keyup", onUp)
      }
  }, [key])
  return keyPressed
}

export default useKey
