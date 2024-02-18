
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState
    const [password, setPassword] = useState('');
    const history = useHistory(); // React Router hook for redirecting

    const handleSubmit = (e) => {
        e.preventDefault();
        // validate the user's credentials
        if (email === 'example@example.com' && password === 'password') {
            history.push('/'); // redirect to the home page
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
}

export default Login;
