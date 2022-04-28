import React, { useState } from 'react'
import '../Css/ScrollToTop.css'

function ScrollToTop() {

  const [show, setshow] = useState(false);

  window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 20) {
    setshow(true)
  } else {
    setshow(false)
  }
}
  if(show){
      return (
        <button className='bg-primary shadow border border-primary' onClick={()=>{document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;}}>
            <i class="text-light fa fa-chevron-up" aria-hidden="true"></i>
        </button>
      )
  }
  else{
      return ""
  }
}

export default ScrollToTop