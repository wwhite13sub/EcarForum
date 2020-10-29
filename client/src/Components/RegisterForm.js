import React from 'react';

class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {
              username: '',
              password: '',
              confirm_password: ''
            },
            errors: {}
        };
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const object = { ...this.state.input };
        object[name] = value;
        console.log('object',object);
        this.setState({
          input: object
        });
    }



    handleSubmit = (event) => {
        event.preventDefault();

        //validation
        if(!this.validate()){
          return;
        }


        //process data
        //send the info to the backend
        alert('Thanks');
    }

    validate = () => {
        let input = this.state.input;
        let errors = {};
        let isValid = true;
        console.log(input);

        //validate username
        let usernameError = '';
        if((typeof input["username"] === "undefined") || (!input["username"])) {
          isValid = false;
          usernameError += "Please enter your username.";
        }
        if(input["username"].length < 8){
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
        if(input["password"].length < 8) {
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

        this.setState({
          errors: errors
        });
      
        return isValid;
      }
      render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit} className="text-sm-center">
              <h1>Register</h1>
              <div className="form-group">
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
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        );
      }
    }
    
      
    export default RegisterForm;
    