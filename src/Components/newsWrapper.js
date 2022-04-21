import React from 'react'
import News from './News'
import '../Css/newsWrapper.css'
import CricketScore from './CricketScore'

function NewsWrapper({r,tag}) {
    

        const news=[]


        function news_(r) {


          return(
            news.push(<News
              Category={r.category[0]?(r.category[0]).toUpperCase():"TOP"}
              headline={r.title} 
              video_={r.video_url}
              image_={r.image_url} 
              description={r.description}
              source_={r.source_id}
              link={r.link}
              />)
          )
        }

        r.forEach(r => {

          if(tag.toUpperCase()==r.category[0].toUpperCase()){
            console.log(tag)
            news_(r)
          }

          else if(tag=='all'){
            news_(r)
          }

        });


  if(tag=='cricket'){
    
    return(
     <CricketScore />
   );
  }


  return (
    
    <div className='conatiner d-flex flex-wrap h-75'>
      {
        (news.length!=0)?
        news:
          <div className='d-block m-auto'>
            <h4 className='text-primary'>no {tag} news found</h4>
            <p>Come back later</p>
          </div>
      }
    </div>
  )
}

export default NewsWrapper