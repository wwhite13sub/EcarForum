import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';




class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
            <NavigationBar />
            
            <Route path='/Register' component={ RegisterForm }/>
            <Route path='/Login' component={LoginForm} />
            <Route path='/Dashboard' component={Dashboard} />
            
        </div>
      </Router>
    )    
  }
}
export default App;



