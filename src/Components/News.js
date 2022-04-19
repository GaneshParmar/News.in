import React from 'react'
import '../Css/News.css'

function News({Category,image_,video_,headline,description,source_,link,live}) {
  return (
    <div className='newsWrap shadow-lg border-secondary'>
        <h1>{live}</h1>
        {
          video_?<video src='video_'/>:
          <img src={image_?image_:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxaoXc0u32aT73m-mmhFJpY9fXFOJ40A0WpA&usqp=CAU"} alt='img Here' width={80}/>
        }
        <span className='py-2'>Source:  {source_}</span>

        <h4>{headline}</h4>
        <p className='text-secondary text-left'>{description?description.slice(0,150):""}...<a href={link}>read more</a></p>
    </div>
  )
}

export default News