import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div className="navbar-brand">Electric Car Forum</div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id=" responsive-navbar-nav">
          <Nav className="navbar-nav mr-auto mt-2 mt-lg-0">
              
            
          <Nav className="nav navbar-nav right">
            <form method="post" className="form-inline my-2 my-lg-0">
              <button type="button" className="btn btn-primary my-2 my-sm-0">
                <Link to="/Register">
                  Register
                </Link>
              </button>
              <button type="button" className="btn btn-primary my-2 my-sm-0">
                <Link to="/Login">
                  Login
                </Link>
              </button>
            </form>
          </Nav>
      
          </Nav>
        </Navbar.Collapse>
</Navbar>

      //     <ul className="nav navbar-nav navbar-right">
      //       <form method="post">
      //       <button type="submit">Sign Up</button>
      //       <li><a href="{foo}"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
      //       </form>
      //     </ul>
      //   </div>
      // </nav>
    );
  };
}

export default NavigationBar;