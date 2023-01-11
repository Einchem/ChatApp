import React, { useContext, useState } from 'react'
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap/';
import "../css/login.css"
import { useLoginUserMutation } from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginUser, { isLoading, error }] = useLoginUserMutation()
  const navigate = useNavigate()
  const {socket} = useContext(AppContext)
  function handleLogin(e) {
    e.preventDefault()
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        //using the socket
        socket.emit('new-user')
        //navigate to the chat rooms
        navigate('/chat')

      }
    })
  }
  return (
    <Container>
      <Row>
        <Col md={5} className="login-bg"></Col>
        <Col md={7} className="form-style">
          <Form style={{ width: "70%", maxWidth: "400" }} onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {error && <p className='alert alert-danger'>{error.data}</p>}
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLoading ? <Spinner animation='grow'/> : "Login"}
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Dont have an acount ? <Link to={"/signup"}>Signup</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}



export default Login
