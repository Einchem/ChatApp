import React from 'react'
import {Row,Col,Button} from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import { FaComments } from 'react-icons/fa';
import "../css/home.css"


const Home = () => {
  return (
    <Row>
      <Col md={6} className="d-flex flex-direction-colum align-items-center justify-content-center">
        <div>
          <h1>Start chat with your friends</h1>
          <p>Chat app lets you connect with the world</p>
          <LinkContainer to={'/chat'}>
          <Button variant='success'>
            Get started   <FaComments  className='btn-icon'></FaComments>
            </Button>
          </LinkContainer>
        </div>
      </Col>
      <Col md={6} className="home-bg"></Col>
    </Row>
  )
}

export default Home
