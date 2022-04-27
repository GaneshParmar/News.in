import React from 'react'
import NavHeader from './NavHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram,faFacebook,faTwitter } from "@fortawesome/free-brands-svg-icons"


function Footer() {
  const instagram=<a className='text-light m-4 p-2' href='#'><FontAwesomeIcon icon={ faInstagram }/></a>
  const facebook=<a className='text-light m-4 p-2' href='#'><FontAwesomeIcon icon={ faFacebook }/></a>
  const twitter=<a className='text-light m-4 p-2' href='#'><FontAwesomeIcon icon={ faTwitter }/></a>
  return (
    <div>
        <footer className='bg-primary py-5 text-light text-center'>
            Today News Broadcast 2020 © 2021
            <p className='text-center h4 mt-4'>
              {facebook}
              {instagram}
              {twitter}
            </p>
            <p className='text-light w-25'>
              G@neshParmar
            </p>
        </footer>
    </div>
  )
}

export default Footer
