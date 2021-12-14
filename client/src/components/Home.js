import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import HomeHeroImage from '../assets/home-hero-image.png'
import FourteenDayImage from '../assets/14-day-car-desktop.png'

const Home = () => {

  document.title = 'CarTrader | Home'
  return (
    <section className="main-section">
      <Container className="home-container">
        <img className="home-hero-image" src={HomeHeroImage} />
        <Container className="home-section-1 align-items-center">
          <Row>
            <Col md lg="8">
              <img className="fourteen-day-image" src={FourteenDayImage} />
            </Col>
            <Col md lg="4">
              <h5 className="text-left">With out 14-day money-back guarentee, you can be sure you have got the right deal.</h5>
              <Button id="fourteen-day-image">More about 14-day returns</Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  )
}

export default Home