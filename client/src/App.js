import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './Components/navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RegisterForm from './Components/register';
import Login from './Components/login';
import Images from '../src/Images/ElectCar.jpg';



class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
            <NavBar />
            <Route path='/Register' component={ RegisterForm }/>
            <Route path='/Login' component={Login} />
        </div>
        <div>
        <img src={Images} className="Carphoto" alt="background" />
        <RegisterForm />
        </div>
      </Router>
    )    
  }
}
export default App;



