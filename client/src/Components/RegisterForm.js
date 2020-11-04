import React from 'react';
import { userActions } from './../redux/actions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        username: '',
        password: '',
        confirm_password: '',
        terms: false
      },
      errors: {}
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const object = { ...this.state.input };
    object[name] = value;
    console.log('object', object);
    this.setState({
      input: object
    });
  }

  handleTermsChange = (event) => {
    let currentValue = this.state.input.terms;
    const object = { ...this.state.input };
    object.terms = !currentValue;
    this.setState({
      input: object
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    //validation
    if (!this.validate()) {
      return;
    }


    //process data
    //send the info to the backend
    this.props.register(this.state.input);
  }

  validate = () => {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    //validate username
    let usernameError = '';
    if ((typeof input["username"] === "undefined") || (!input["username"])) {
      isValid = false;
      usernameError += "Please enter your username.";
    }
    if (input["username"].length < 8) {
      isValid = false;
      usernameError += "Must be 8 characters.";
    }
    errors['username'] = usernameError;

    //validate password
    let passwordError = '';
    if ((typeof input["password"] === "undefined") || !input["password"]) {
      isValid = false;
      passwordError += "Please enter your password.";
    }
    if (input["password"].length < 8) {
      isValid = false;
      passwordError += "Must contain at least 8 characters and one number.";
    }
    errors['password'] = passwordError;

    //validate confirm password
    let confirmPasswordError = '';
    if ((typeof input["confirm_password"] === "undefined") || !input["confirm_password"]) {
      isValid = false;
      confirmPasswordError += "Please enter your confirm password.";
    }
    if (input["password"] !== input["confirm_password"]) {
      isValid = false;
      confirmPasswordError += "Passwords don't match.";
    }
    errors['confirm_password'] = confirmPasswordError;

    //validate terms
    if (!this.state.input.terms) {
      isValid = false;
      errors['terms'] = 'Please accept the terms';
    } else {
      errors['terms'] = '';
    }

    this.setState({
      errors: errors
    });

    return isValid;
  }
  render() {
    if (this.props.registrationSuccess) {
      return <Redirect to='/Login' />
    }
    if (this.props.loggedIn) {
      return <Redirect to='/Dashboard' />
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-container">
          <h1>Register</h1>
          <div className="form-group ">
            <div>
              <label htmlFor="username">Username:</label>
            </div>
            <input
              type="text"
              name="username"
              onChange={this.handleChange}
              className="w-50 w-sm-25"
              placeholder="Enter username"
              id="username" />
            <span className="absolute text-danger mx-2">{this.state.errors.username}</span>
          </div>

          <div className="form-group">
            <div>
              <label htmlFor="password">Password:</label>
            </div>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              className="w-50 w-sm-25"
              placeholder="Enter password"
              id="password" />
            <span className="absolute text-danger mx-2">{this.state.errors.password}</span>
          </div>

          <div className="form-group">
            <div>
              <label htmlFor="password">Confirm Password:</label>
            </div>
            <input
              type="password"
              name="confirm_password"
              onChange={this.handleChange}
              className="w-50 w-sm-25"
              placeholder="Enter confirm password"
              id="confirm_password" />
            <span className="absolute text-danger mx-2">{this.state.errors.confirm_password}</span>
          </div>
          <div className="form-check">
            <input name="terms" type="checkbox" className="form-check-input" id="terms-condition" onChange={this.handleTermsChange} />
            <label className="form-check-label" htmlFor="terms-condition"> I agree to the Terms and Conditions and Privacy Policy</label>
            <span className="absolute text-danger mx-2">{this.state.errors.terms}</span>
          </div>
            <button type="submit" className="btn btn-primary mt-4">Register</button>
            </form>
          </div>
          
        );
  }
}

function mapState(state) {
    const { registering, registrationSuccess } = state.registration;
    const { loggedIn } = state.authentication;

    return { registering, registrationSuccess, loggedIn };
}

const actionCreators = {
    register: userActions.register
}
      
export default connect(mapState, actionCreators)(RegisterForm);

