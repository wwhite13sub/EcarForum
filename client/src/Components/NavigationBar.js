import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions';


function NavButtons(props) {
  if (props.loggedIn) {
    return (
      <Nav className="nav navbar-nav right ml-auto">
        <form method="post" className="form-inline my-2 my-lg-0">
          <div className="text-white mr-3">Welcome, {props.user.username}</div>
          <button type="button" className="btn btn-primary my-2 my-sm-0" onClick={props.logout}>
            Logout
          </button>
        </form>
      </Nav>
    )
  }

  return (
    <Nav className="nav navbar-nav right">
      <form method="post" className="form-inline my-2 my-lg-0">
        {/* <button type="button" className="btn btn-primary my-2 my-sm-0"> */}
          <div className="my-2 my-sm-0">
          <Link to="/Register">
            Register
          </Link>
          </div>
        {/* </button> */}
        <button type="button" className="btn btn-primary ml-3 my-2 my-sm-0">
          <Link to="/Login">
            Login
          </Link>
        </button>
      </form>
    </Nav>
  )
}

class NavigationBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div className="navbar-brand">Electric Car Forum</div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id=" responsive-navbar-nav">
          <Nav className="navbar-nav ml-auto mt-2 mt-lg-0">
              
            <NavButtons 
              loggedIn={this.props.loggedIn} 
              logout={this.props.logout} 
              user={this.props.user} 
            />
          
      
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
}

function mapState(state) {
    const { loggedIn, user } = state.authentication;
    return { loggedIn, user };
}

const actionCreators = {
  logout: userActions.logout
};

export default connect(mapState, actionCreators)(NavigationBar);