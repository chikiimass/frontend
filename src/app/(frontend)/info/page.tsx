import React from 'react'

const page = ({ params }) => {
    const payload = await getPayloadHMR({ config: configPromise });
    const data = await payload.find({
        collection: 'movies',
    })
  return (
    <div>page</div>
  )
}

export default page