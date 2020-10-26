import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class navbar extends React.Component {

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div class="navbar-brand">Electric Car Forum</div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id=" responsive-navbar-nav">
          <Nav className="navbar-nav mr-auto mt-2 mt-lg-0">
              <Link onClick="nav-link" href="">Profile <span class="sr-only">(current)</span></Link>
            
          <Nav className="nav navbar-nav right">
            <form method="post" class="form-inline my-2 my-lg-0">
              <button type="submit" class="btn btn-outline-primary mr-2">Register</button>
              <button class="btn btn-primary my-2 my-sm-0" type="submit">Login</button>
            </form>
          </Nav>
      
          </Nav>
        </Navbar.Collapse>
</Navbar>















      //     <ul class="nav navbar-nav navbar-right">
      //       <form method="post">
      //       <button type="submit">Sign Up</button>
      //       <li><a href="{foo}"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      //       </form>
      //     </ul>
      //   </div>
      // </nav>
    );
  };
}

export default navbar;