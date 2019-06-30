import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Baptismal from './components/Records/Baptismal'
import Confirmation from './components/Records/Confirmation'
import Death from './components/Records/Death'
import Marriage from './components/Records/Marriage'
import Books from './components/Books/Books'
import Manage from './components/Manage/Manage'


export default function Routes() {
  return (
    <Switch>
      <Route path='/baptismal' component={Baptismal}/>
      <Route path='/confirmation' component={Confirmation}/>
      <Route path='/death' component={Death}/>
      <Route path='/marriage' component={Marriage}/>
      <Route path='/books' component={Books}/>
      <Route path='/manage' component={Manage}/>
    </Switch>
  )
}