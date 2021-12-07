import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const VehicleSellDecision = () => {


  return (
    <section>
      <Container style={{ paddingTop: '80px' }}>
        <Row>
          <Container className="sell-decision-header">
            <h4 className="sell-decision-title">Sell your car</h4>
            <h5 className="sell-decision-subtitle">You are in control, choose how you want to sell your car</h5>
          </Container>
        </Row>
        <Row >
          <Col sm={12} md={6}>
            <Container className="sell-car-decision-container">
              <h4 className="sell-car-decision-title">Get an instant offer</h4>
              <p className="sell-car-desision-subtitle">Tell us more about your car to get an instant offer, valid for 7 days</p>
              <ListGroup className="sell-car-decision-list" variant="flush">
                <ListGroup.Item><i className="fas fa-check"></i> Sell your car quickly for cash</ListGroup.Item>
                <ListGroup.Item><i className="fas fa-check"></i> Home collection</ListGroup.Item>
                <ListGroup.Item><i className="fas fa-check"></i> No haggling on your price</ListGroup.Item>
              </ListGroup>
              <Link to='/instant-offer' className="sell-car-decision-button">Get your offer</Link>
              <Container className="sell-car-decision-space"></Container>
            </Container>
            <Container className="instant-offer-image-container"><img className="instant-offer-image" src="https://res.cloudinary.com/dd0uzkplv/image/upload/v1638868601/toyota-corolla-blue_1x_ikrj7u.png"/></Container>
          </Col>
          <Col sm={12} md={6}>
            <Container className="sell-car-decision-container">
              <h4 className="sell-car-decision-title">Place an advert on Car Trader</h4>
              <p className="sell-car-desision-subtitle">3 simple steps to your advert online</p>
              <ListGroup className="sell-car-decision-list" variant="flush">
                <ListGroup.Item><i className="fas fa-check"></i> Free, instant online valuation</ListGroup.Item>
                <ListGroup.Item><i className="fas fa-check"></i> Advertise to millions</ListGroup.Item>
                <ListGroup.Item><i className="fas fa-check"></i> Dedicated support team</ListGroup.Item>
              </ListGroup>
              <Link to='/place-advert' className="sell-car-decision-button">Create your advert</Link>
              <Container className="sell-car-decision-space"></Container>
            </Container>
            <Container className="place-advert-image-container"><img className="instant-offer-image" src="https://res.cloudinary.com/dd0uzkplv/image/upload/a_hflip/a_0/v1638868603/toyota-corolla-red_1x_sfmnxw.png"/></Container>
          </Col>
          <Col>
          
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default VehicleSellDecision