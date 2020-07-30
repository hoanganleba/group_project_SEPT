import React from 'react';
import './App.scss';
import Index from './components/Account/Index.jsx';
import Bookingform from "./components/Booking/Bookingform";
import Comment from "./components/Booking/Comment";
import './w3school.css'
import {Link, BrowserRouter} from "react-router-dom";
import Route from "react-router-dom/Route"
import Switch from "react-router-dom/Switch"
import Header from "./components/Header";
import Bookinghistory from "./components/Booking/Bookinghistory";

class App extends React.Component {
  render() {
    return(
        <BrowserRouter>
          <div>
            <Header />
              <br/>
              <br/>
              <br/>

              <Route exact path="/" component={Bookingform} />
              <Route exact path="/comment" component={Comment} />
              <Route exact path="/history" component={Bookinghistory} />
          </div>
        </BrowserRouter>
    )
  }
}
export default App;
