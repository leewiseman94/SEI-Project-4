import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


const NavbarHome = () => {


  const formMakeChange = (event) => {
    console.log(event.target.value === 'Select make')
    if (event.target.value === 'Select make') {
      document.querySelector('.select-model').setAttribute('disabled', 'disabled')
    } else {
      document.querySelector('.select-model').removeAttribute('disabled', 'disabled')
    }

  }

  return (
    <Container className="home-hero-container">
      <Container className="hero-header-container text-white">
        <h2>Buying a car online just got easier</h2>
      </Container>
      <Container className="hero-subheader-container text-white">
        <h4>Buy, finance and part exchange. Free home delivery or collection. 14-day money-back guarantee.</h4>
      </Container>


      <Container className="hero-form-container">
        <Form>
          <Row className="justify-content-center form-container">
            <Col md>
              <Form.Select className="home-select select-make" aria-label="Select make" onChange={(event) => {
                formMakeChange(event)
              }} >
                <option>Select make</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
            <Col md>
              <Form.Select className="home-select select-model" aria-label="Select Model" disabled>
                <option>Select Model</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
            <Col md>
              <Button className="form-button" variant="primary" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  )
}

export default NavbarHome