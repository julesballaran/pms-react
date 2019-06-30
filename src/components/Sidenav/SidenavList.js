import React from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export default function SidenavList(){
  return (
    <React.Fragment>
      <Divider />
      <List component="nav" aria-label="Main mailbox folders">
        <Link to='/books'>
          <ListItem button >
            <ListItemText primary="Books" />
          </ListItem>
        </Link>
        <Link to='/manage'>
          <ListItem button>
            <ListItemText primary="Manage" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </React.Fragment>
  )
}