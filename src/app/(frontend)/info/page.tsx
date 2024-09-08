import { getPayloadHMR } from '@payloadcms/next/utilities';
import React from 'react'
import configPromise from '@payload-config'


const page = async ({ params }) => {
    const payload = await getPayloadHMR({ config: configPromise });
    const data = await payload.find({
        collection: 'movies',
        where: {
          slug: { equals: `${params.slug}` },
        },
    })
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default page