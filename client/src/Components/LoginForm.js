
import React from 'react';
import { userActions } from '../redux/actions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import {
   Form,
   Button
} from 'react-bootstrap';

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
          input: {
            username: '',
            password: ''
          },
          errors: {}
        };
    }
    
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const object = { ...this.state.input };
        object[name] = value;
        this.setState({
          input: object
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state.input.username, this.state.input.password);
    }

    render() {
        if (this.props.loggedIn) {
          return <Redirect to='/Dashboard' />
        }
        return (
            <Form className="form-container" onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={this.handleChange} type="text" placeholder="Enter Username" name="username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={this.handleChange} type="password" placeholder="Password" name="password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}

function mapState(state) {
    const { loggingIn, loggedIn } = state.authentication;
    return { loggingIn, loggedIn };
}

const actionCreators = {
    login: userActions.login
};

export default connect(mapState, actionCreators)(LoginForm);
