import React, { useEffect, useState } from 'react'

function useRightButton(key) {
  const [ressed, setKeyPressed] = useState(false)
  const match = event => key.toLowerCase() == event.key.toLowerCase()

  const onDown = event => {
    if (match(event)) {
      setKeyPressed(true)
    }
  }
  const onUp = event => {
    if (match(event)) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener("onmousedown", onDown)
    window.addEventListener("onmouseup", onUp)
    return () => {
      window.removeEventListener("onmousedown", onDown)
      window.removeEventListener("onmouseup", onUp)
    }
  }, [key])
  return clicked
}

export default useRightButton
