import React from 'react'

const Video = () => {
  return (
    <div>
        <h1>VIDEO</h1>
        <video  controls>
          <source src="https://dailysmoke.com/manifest/b48ac8b214cd4420aa1bdda44cb41ba8/master.m3u8" type="application/x-mpegURL" />
          <source src="https://dailysmoke.com/manifest/b48ac8b214cd4420aa1bdda44cb41ba8/master.mpd" type="application/dash+xml" />
          <source src="https://dailysmoke.com/manifest/b48ac8b214cd4420aa1bdda44cb41ba8/master.mpd" type="application/vnd.apple.mpegurl" />
          <source src="https://dailysmoke.com/manifest/b48ac8b214cd4420aa1bdda44cb41ba8/master.mpd" type="application/x-mpegurl" />
        </video>
    </div>
  )
}

export default Video