import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Chatbar from '../components/Chatbar'
import MessageForm from '../components/MessageForm'


const Chat = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
        <Chatbar></Chatbar>
        </Col>
        <Col md={8}>
        <MessageForm></MessageForm>
        </Col>
      </Row>
    </Container>

  )
}

export default Chat
