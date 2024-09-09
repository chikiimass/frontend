'use client'
import { useEffect, useRef } from 'react'

export default function Native(): JSX.Element {
  const native = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (native.current && !native.current.firstChild) {
      const script = document.createElement('script')
      script.async = true
      script.setAttribute('data-cfasync', 'false')
      script.type = 'text/javascript'
      script.src = '//wipehumorousbeen.com/322b18aba52e61dde81eddcb13b509bb/invoke.js'

      native.current.appendChild(script)
    }
  }, [])

  return <div id="container-322b18aba52e61dde81eddcb13b509bb" ref={native}></div>
}