import React from 'react'
import Card from '../Blocks/Card'

interface Video {
  videos: any
}

interface VideoRowProps {
  data: data[]
}

const CardRow: React.FC<VideoRowProps> = ({ data }) => {

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4">
        {data.docs.map((video: { id: React.Key | null | undefined }) => (
          <div key={video.id} className="w-96 flex-none">
            <Card key={video.id} data={video} />
          </div>
        )
        )}
      </div>
    </div>
  )
}

export default CardRow