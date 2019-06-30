import React from 'react'
import { Link } from 'react-router-dom'

export default function Header (){
  return (
    <nav className="nav">
      <div className="link-wrap">
        <Link to='/' className='links'>All Records</Link>
        <Link to='/baptismal' className='links'>Baptismal</Link>
        <Link to='/confirmation' className='links'>Confirmation</Link>
        <Link to='/death' className='links'>Death</Link>
        <Link to='/marriage' className='links'>Marriage</Link>
      </div>
    </nav>
  )
}