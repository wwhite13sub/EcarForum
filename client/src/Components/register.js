import React from 'react';

class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.validate()){
            console.log(this.state);

            let input = {};
            input["username"] = "";
            input["password"] = "";
            input["confirm_password"] = "";
            this.setState({input:input});

            alert('Thanks');
        }
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if(!input["username"]) {
            isValid = false;
            errors["username"] = "Please enter your username.";
        }

        if (typeof input["username"] !== "undefined") {
            const re = /^\S*$/;
            if(input["username"].length < 8 || !re.test(input["username"])){
                isValid = false;
                errors["username"] = "Please enter valid username. Must be 8 characters.";
            }
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
          }
      
          if (typeof input["password"] !== "undefined") {
            const re = /^\?=.*\d$/;
            if(input["password"].length < 8 || !re.test(input["password"])) {
                isValid = false;
                errors["password"] = "Must contain at least 8 characters and one number.";
            }
          } ////validation keeps looping will not satisfy
            //error message needs top display right side
      
          if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
              
            if (input["password"] !== input["confirm_password"]) {
              isValid = false;
              errors["password"] = "Passwords don't match.";
            }
          }
      
          this.setState({
            errors: errors
          });
      
          return isValid;
      }
      render() {
        return (
          <div className="d-flex flex-column flex-md-row justify-content-center align items-center">
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
      
              <div class="form-group">
                <label for="username">Username:</label>
                <input 
                  type="text" 
                  name="username" 
                  value={this.state.input.username}
                  onChange={this.handleChange}
                  class="form-control" 
                  placeholder="Enter username" 
                  id="username" />
      
                  <div className="text-danger">{this.state.errors.username}</div>
              </div>                 
      
              <div class="form-group">
                <label for="password">Password:</label>
                <input 
                  type="password" 
                  name="password" 
                  value={this.state.input.password}
                  onChange={this.handleChange}
                  class="form-control" 
                  placeholder="Enter password" 
                  id="password" />
      
                  <div className="text-danger">{this.state.errors.password}</div>
              </div>
      
              <div class="form-group">
                <label for="password">Confirm Password:</label>
                <input 
                  type="password" 
                  name="confirm_password" 
                  value={this.state.input.confirm_password}
                  onChange={this.handleChange}
                  class="form-control" 
                  placeholder="Enter confirm password" 
                  id="confirm_password" />
      
                  <div className="text-danger">{this.state.errors.confirm_password}</div>
              </div>
                 
              <input type="submit" value="Submit" class="btn btn-success" />
            </form>
          </div>
        );
      }
    }
      
    export default RegisterForm;
    