import React from 'react'
import '../Css/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram,faFacebook,faTwitter } from "@fortawesome/free-brands-svg-icons"

function Header() {
  const instagram=<a href='#'><FontAwesomeIcon icon={ faInstagram }/></a>
  const facebook=<a href='#'><FontAwesomeIcon icon={ faFacebook }/></a>
  const twitter=<a href='#'><FontAwesomeIcon icon={ faTwitter }/></a>
  return (
    <div>
        <div className='header shadow'>
        <h1 className='text-primary'>
            Todays News
        </h1>
        <p>
          {
            new Date().toDateString()
          }
        </p>
        <p className='d-flex justify-content-evenly w-25'>
          {facebook}
          {instagram}
          {twitter}
        </p>
        </div>
    </div>
  )
}

export default Header