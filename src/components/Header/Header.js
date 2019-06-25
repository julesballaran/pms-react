import React from 'react'
import { Link } from 'react-router-dom'

export default function Header (){
  return (
    <nav className="nav">
      <div className="link-wrap">
        <Link to='/' className='links'>Home</Link>
        <Link to='/about' className='links'>About</Link>
        <Link to='/about' className='links'>About</Link>
        <Link to='/' className='links'>Home</Link>
        <Link to='/about' className='links'>About</Link>
      </div>
    </nav>
  )
}