import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Baptismal from './components/Records/Baptismal'
import Confirmation from './components/Records/Confirmation'
import Death from './components/Records/Death'
import Marriage from './components/Records/Marriage'
import Books from './components/Books/Books'
import Manage from './components/Manage/Manage'
import AllRecords from './components/Records/AllRecods'

export default function Routes(props) {
  const { baptismal, confirmation, loaded } = props
  return (
    <Switch>
      <Route exact path='/'
        render={(props) =>
          <AllRecords 
            {...props}
            baptismal={baptismal} 
            confirmation={confirmation}
          />
        }
      />
      <Route exact path='/baptismal/' 
        render={(props) => 
          <Baptismal  
            {...props} 
            baptismal={baptismal} 
            loaded={loaded}
          />
        }
      />
      <Route path='/baptismal/:no' 
        render={(props) => 
          <Baptismal  
            {...props} 
            baptismal={baptismal} 
            loaded={loaded}
          />
        }
      />
      <Route exact path='/confirmation/' 
        render={(props) => 
          <Confirmation  
            {...props} 
            confirmation={confirmation} 
            loaded={loaded}
          />
        }
      />
      <Route path='/confirmation/:no' 
        render={(props) => 
          <Confirmation  
            {...props} 
            confirmation={confirmation} 
            loaded={loaded}
          />
        }
      />
      <Route path='/death' component={Death}/>
      <Route path='/marriage' component={Marriage}/>
      <Route path='/books' 
        render={(props)=>
          <Books 
            {...props}
            baptismal={baptismal}
            confirmation={confirmation} 
            loaded={loaded}
          />
        }
      />
      <Route path='/manage' component={Manage}/>
    </Switch>
  )
}