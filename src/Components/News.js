import React from 'react'
import '../Css/News.css'

function News({Category,image_,video_,headline,description,source_}) {
  return (
    <div className='newsWrap'>
        <h1>{Category}</h1>
        {
          video_?<video src='video_'/>:
          <img src={image_?image_:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxaoXc0u32aT73m-mmhFJpY9fXFOJ40A0WpA&usqp=CAU"} alt='img Here' width={80}/>
        }

        <h2>{headline}</h2>
        <p>{description}</p>
        <span>Source:  {source_}</span>
    </div>
  )
}

export default News