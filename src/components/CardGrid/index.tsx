import React from 'react'
import Card from '../Blocks/Card'

interface VideoGridProps {
  videos: any
}

const CardGrid: React.FC<VideoGridProps> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
      {videos.docs.map((video: { id: React.Key | null | undefined }) => (
        <Card key={video.id} data={video} />
      ))}
    </div>
  )
}

export default CardGrid