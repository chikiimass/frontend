'use client'
import { useEffect, useRef } from 'react'

interface BannerProps {
  adKey: string
  height: number
  width: number
}

export default function Banner({ adKey, height, width }: BannerProps): JSX.Element {
  const banner = useRef<HTMLDivElement>()

  const atOptions = {
    key: adKey,
    format: 'iframe',
    height: height,
    width: width,
    params: {}
  }
  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement('script')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `//wipehumorousbeen.com/${atOptions.key}/invoke.js`
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

      banner.current.append(conf)
      banner.current.append(script)
    }
  }, [banner])

  return <div ref={banner}></div>
}