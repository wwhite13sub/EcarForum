
import React from 'react';
import { userActions, alertActions } from '../redux/actions';
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
          error: '',
          formSubmitted: false
        };
    }
    
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const object = { ...this.state.input };
        object[name] = value;
        this.setState({
          input: object
        }, function() {
            if (this.state.formSubmitted) {
                this.validateForm();
            }
            this.props.clearAlerts();
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            formSubmitted: true
        })

        if (!this.validateForm()) {
            return;
        }

        this.props.login(this.state.input.username, this.state.input.password);
    }

    validateForm = () => {
        //username validation
        if (!this.state.input.username.length) {
            this.setState({
                error: 'Username is required'
            });
            return false;
        }

        //password validation
        if (!this.state.input.password.length) {
            this.setState({
                error: 'Password is required'
            });
            return false;
        }

        this.setState({
            error: ''
        });
        return true;
    }

    componentDidMount = () => {
        this.props.loginRedirectDone();
    }

    render() {
        const { alert } = this.props;
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
                {
                    alert.type === 'alert-danger' &&
                    alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                {
                    this.state.error.length > 0 &&
                    <div className="alert alert-danger">{this.state.error}</div>
                }
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}

function mapState(state) {
    const { alert } = state;
    const { loggingIn, loggedIn } = state.authentication;
    return { alert, loggingIn, loggedIn };
}

const actionCreators = {
    login: userActions.login,
    loginRedirectDone: userActions.loginRedirectDone,
    clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(LoginForm);
