import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';
import { connect } from 'react-redux';
import { alertActions } from './redux/actions';


class App extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount = () => {
    const { alert } = this.props;
    if (alert.type === 'alert-success') {
      setTimeout(() => {
        this.props.clearAlerts();
      }, 10000);//number of seconds given in mili secs
    }
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
            <div className="col-12">
              {
                alert.type === 'alert-success' &&
                alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <Router>
                  <NavigationBar />
                  {/* this fuction if you load just the domain name (/) will redirect to registration */}
                  <Route exact path="/" component={RegisterForm} />
                  <Route path="/Register" component={ RegisterForm }/>
                  <Route path="/Login" component={LoginForm} />
                  <Route path="/Dashboard" component={Dashboard} />
                  {/* this fuction if you load anything but the defined route will redirect to registration */}
                  <Redirect from="*" to="/Register" />
              </Router>
            </div>
        </div>
      </div>
    );
  }
}
function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(App);
