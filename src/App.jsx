import React from 'react';

import './App.scss';

import Form from './components/Booking/Form.jsx';
import { BrowserRouter, Link, Route, Switch, } from 'react-router-dom'
import Index from './components/Account/Index.jsx';

class App extends React.Component {
  constructor(){
    super()
    this.state = {authenticated: 0
    
    
    }
  }
  componentWillMount(){
    this.setState({isAuthenticated: window.sessionStorage.getItem('authenticated')})
  }
 
  logout(){
    window.sessionStorage.setItem('authenticated', 0)
    window.sessionStorage.setItem('token', 0,null)
    this.setState({isAuthenticated: window.sessionStorage.getItem('authenticated')})
  }
  render() {
    return(
      <div>
        {window.sessionStorage.getItem('authenticated')==1 ?
        <div>
         <BrowserRouter>
         <Switch>
        
         <Route  path='/' component={Form} />
         <button style={{fontSize: '30px',textAlign:'left'}} class="text-light bg-dark"   onClick={this.logout.bind(this)}> Logout</button>
        </Switch>
        </BrowserRouter>
      </div>
      :
      <div>
        <BrowserRouter>
         <Switch>
        
         <Route exact path='/' component={Index} />
        
        </Switch>
        </BrowserRouter>
      </div>
  }
  
  </div>
    )
  }
}
export default App;
