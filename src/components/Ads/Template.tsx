'use client'

import { Ads } from "@/components/Ads"
import { AdblockDetector } from 'adblock-detector';

export default function Template({ children }: { children: React.ReactNode }) {

const adbDetector = new AdblockDetector() // call 

const userHasAdblock = adbDetector.detect() // detect adblock it return ture or false

  return (
    <>

      {userHasAdblock ? <Ads /> : null}

      <main>
        <div> {children} </div>
      </main>
    </>
  )

}