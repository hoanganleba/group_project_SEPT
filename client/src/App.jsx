import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Account/Index';
import BookingForm from './components/Booking/BookingForm';
import Comment from './components/Booking/Comment';
import NavBar from './components/NavBar';
import BookingHistory from './components/Booking/BookingHistory';
import PrivateRoute from './components/PrivateRoute';
import AdminPage from './components/Account/AdminPage/AdminPage';
import UserPage from './components/Account/UserPage/UserPage';
import UserList from './components/Account/UserPage/UserList';
import './App.scss';
import './w3school.css';


function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/" component={Index} />
        <div style={{ marginTop: '90px' }}>
          <PrivateRoute path="/booking">
            <NavBar />
            <BookingForm />
          </PrivateRoute>
          <PrivateRoute path="/comment">
            <NavBar />
            <Comment />
          </PrivateRoute>
          <PrivateRoute path="/history">
            <NavBar />
            <BookingHistory />
          </PrivateRoute>
          <PrivateRoute path="/userList">
            <NavBar />
            <UserList />
          </PrivateRoute>
          <PrivateRoute path="/userPage">
            <NavBar />
            <UserPage />
          </PrivateRoute>
        </div>
      </Switch>
    </Router>
    
  );
}
export default App;
