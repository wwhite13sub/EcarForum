
import React from 'react';

import {
   Form,
   Button
} from 'react-bootstrap';

class LoginForm extends React.Component {
    render() {
        return (
            <Form className="form-container">
                <h2>Login</h2>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}


export default LoginForm;