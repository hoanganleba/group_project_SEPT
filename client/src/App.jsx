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
import Profile from "./components/Account/Profile";
import EditProfile from "./components/Account/EditProfile";
import ManageEmployee from "./components/Employee/ManageEmployee";
import EmpployeeProfile from "./components/Employee/EmployeeProfile"
import EmployeeProfile from './components/Employee/EmployeeProfile';
import AddEmployee from './components/Employee/AddEmployee';

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
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/editprofile" component={EditProfile} />
              <Route exact path="/manageemployee" component={ManageEmployee}/>
              <Route exact path="/employeeprofile" component={EmployeeProfile}/>
              <Route exact path="/addemployee" component={AddEmployee}/>
          </div>
        </BrowserRouter>
    )
  }
}
export default App;
