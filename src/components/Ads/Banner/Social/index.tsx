'use client'
import { JSX, useEffect, useRef } from 'react'

export default function SocialBar(): JSX.Element {
  const social = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (social.current && !social.current.firstChild) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '//wipehumorousbeen.com/6c/29/9f/6c299f2063b8dcfde46b08fbccd13054.js'

      social.current.appendChild(script)
    }
  }, [])

  return <div className='bg-none' ref={social}></div>
}