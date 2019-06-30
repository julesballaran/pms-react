import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import logo from './../../img/st_raphael_logo_dark.png'
import SidenavList from './SidenavList'

export default function Sidenav() {
  return (
    <Paper className="sidenav">
      <Link to='/'>
        <div className="logo">
          <img src={logo} alt=''/>
        </div>
      </Link>
      <SidenavList />
    </Paper>
  )
}