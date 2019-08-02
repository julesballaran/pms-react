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
  const { baptismal, confirmation, death, marriage, fetchDataAll, loaded, edited, setEdited } = props
  return (
    <Switch>
      <Route exact path='/' 
        render={(props)=>
          <Books 
            {...props}
            baptismal={baptismal}
            confirmation={confirmation} 
            death={death}
            marriage={marriage} 
            loaded={loaded}
            edited={edited}
          />
        }
      />
      <Route path='/all'
        render={(props) =>
          <AllRecords 
            {...props}
            baptismal={baptismal} 
            confirmation={confirmation}
            death={death}
            marriage={marriage}
            fetchDataAll={fetchDataAll}
            setEdited={setEdited}
          />
        }
      />
      <Route exact path='/baptismal/' 
        render={(props) => 
          <Baptismal  
            {...props} 
            baptismal={baptismal} 
            loaded={loaded}
            setEdited={setEdited}
          />
        }
      />
      <Route path='/baptismal/:no'
        render={(props) => 
          <Baptismal  
            {...props} 
            baptismal={baptismal} 
            loaded={loaded}
            setEdited={setEdited}
          />
        }
      />
      <Route exact path='/confirmation/' title='test'
        render={(props) => 
          <Confirmation  
            {...props} 
            confirmation={confirmation} 
            loaded={loaded}
            setEdited={setEdited}
          />
        }
      />
      <Route path='/confirmation/:no' 
        render={(props) => 
          <Confirmation  
            {...props} 
            confirmation={confirmation} 
            loaded={loaded}
            setEdited={setEdited}
          />
        }
      />
      <Route exact path='/death/' 
        render={(props) => 
          <Death  
            {...props} 
            death={death} 
            loaded={loaded}
            setEdited={setEdited}
          />
        }
      />
      <Route path='/death/:no' 
        render={(props) => 
          <Death  
            {...props} 
            death={death} 
            loaded={loaded}
            setEdited={setEdited}
          />
        }
      />
      <Route exact path='/marriage/' 
        render={(props) => 
          <Marriage  
            {...props} 
            marriage={marriage} 
            loaded={loaded}
            setEdited={setEdited}
          />
        }
      />
      <Route path='/marriage/:no' 
        render={(props) => 
          <Marriage  
            {...props} 
            marriage={marriage} 
            loaded={loaded}
            setEdited={setEdited}
          />
        }
      />
      <Route path='/manage' component={Manage}/>
    </Switch>
  )
}