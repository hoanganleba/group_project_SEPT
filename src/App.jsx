import React from 'react';

import './App.scss';

import Form from './components/Booking/Form.jsx';

import Index from './components/Account/Index.jsx';

class App extends React.Component {
  render() {
    return(
      <div>
        <Index/>
        <Form/>
      </div>
    )
  }
}
export default App;
