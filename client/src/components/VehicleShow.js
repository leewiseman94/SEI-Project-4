
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Button, Col, Container, Form, ListGroup, Row, Tab, Tabs } from 'react-bootstrap'
import { useParams } from 'react-router'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'



const VehicleShow = () => {
  const [vehicle, setVehicle] = useState(null)
  const [images, setImages] = useState([])
  const { id } = useParams()
  const responsive = {
    desktop: {
      breakpoint: { max: 8000, min: 1500 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1500, min: 922 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 922, min: 0 },
      items: 1,
      slidesToSlide: 1,// optional, default to 1.
    },
  }


  useEffect(() => {
    const getVehicleData = async () => {
      const { data } = await axios.get(`/api/cars/${id}`)
      console.log(data)
      setVehicle(data)

      if (data.images.length === 0) {
        data.images.push('https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg')
        data.images.push('https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg')
        data.images.push('https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg')
      } else if (data.images.length === 1) {
        data.images.push('https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg')
        data.images.push('https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg')
      } else if (data.images.length === 2) {
        data.images.push('https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg')
      }

      setImages(data.images)
    }
    getVehicleData()

  }, [id])


  console.log(vehicle)
  console.log(images)
  return (
    <section>
      <Row style={{ width: '100vw', margin: '0' }}>
        <Col style={{ padding: '0' }}>
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {images.length > 0 &&  images.map((img) => {
              return <div key={img} className="vehicle-image-background" style={{ backgroundImage: `url(${img})` }} ></div>
            })}
          </Carousel>
        </Col>
      </Row>
      {vehicle ?
        <Container className="vehicle-show-main-container">
          <Row>
            <Col xs={6} md={4} lg={3}>
              <h2>{vehicle.make.name} {vehicle.model.name}</h2>
              <p>{`${vehicle.modelVariation} ${vehicle.doors}dr`}</p>
              <h5>{vehicle.yearOfManufacture} | {`${(Math.round(vehicle.yearOfManufacture * 100) / 100).toLocaleString()} miles`}</h5>
            </Col>
            <Col xs={12} md={8} lg={9}>
              <Row>
                <Col md={12} lg={7}>
                  <Container className="vehicle-show-buy-now-container">
                    <Tabs defaultActiveKey="payInFull" id="car-show-payment-options" className="payment-tabs mb-3">
                      <Tab eventKey="payInFull"  title="Pay in full">
                        <h2 id="pay-in-full-price">{`£${(Math.round(vehicle.price * 100) / 100).toLocaleString()}`}</h2>
                        <p className="pay-in-full-paragraph">All major credit and debit cards accepted.</p>
                        <p className="pay-in-full-paragraph">Option to split your payment over multiple cards.</p>
                        <Button className="pay-in-full-button">Buy Now</Button>
                      </Tab>
                      <Tab eventKey="payMonthly" title="Pay monthly (unavailable)" disabled>
                        
                      </Tab>
                    </Tabs>
                  </Container>
                </Col>
                <Col md={12} lg={5}>
                  <Container className="car-show-buy-guarentees">
                    <ListGroup variant="flush">
                      <ListGroup.Item>14-day money back guarantee</ListGroup.Item>
                      <ListGroup.Item>Free home delivery or collection</ListGroup.Item>
                      <ListGroup.Item>Available with care package</ListGroup.Item>
                    </ListGroup>
                  </Container>
                  <Container className="car-show-part-exchange">
                    <h5>Get your part-exchange quote</h5>
                    <Form className="part-exchange-form">
                      <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Enter your registration</Form.Label>
                        <Form.Control type="text" placeholder="Enter registration" />
                      </Form.Group>
                      <Button className="part-exchange-button" variant="primary" type="submit">
                        Find
                      </Button>
                    </Form>
                  </Container>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="car-show-details-container">
            <Col sm={12} md={6} lg={4}>
              <h3>Mechanical</h3>
              <hr className="details-separator"></hr>
              <ListGroup variant="flush">
                <ListGroup.Item><div className="list-container"><p><strong>Transmission</strong></p><p>{vehicle.gearbox}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Mileage</strong></p><p>{vehicle.mileage}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Fuel</strong></p><p>{vehicle.fuelType}</p></div></ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <h3>Trim</h3>
              <hr className="details-separator"></hr>
              <ListGroup variant="flush">
                <ListGroup.Item><div className="list-container"><p><strong>Body</strong></p><p>{vehicle.bodyType}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Colour</strong></p><p>{vehicle.colour}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Doors</strong></p><p>{vehicle.doors}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Seats</strong></p><p>{vehicle.seats}</p></div></ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <h3>Useful information</h3>
              <hr className="details-separator"></hr>
              <ListGroup variant="flush">
                <ListGroup.Item><div className="list-container"><p><strong>Previous owners</strong></p><p>Unknown</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Vehicel registation</strong></p><p>{vehicle.registrationNumber}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Fuel</strong></p><p>{vehicle.fuelType}</p></div></ListGroup.Item>
              </ListGroup>
            </Col>
            
          </Row>
        </Container>
        :
        <Container>
          Car not found
        </Container>
      }
      
        
      
    </section>
  )
}


export default VehicleShow