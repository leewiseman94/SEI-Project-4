
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Button, Col, Container, Form, ListGroup, Row, Tab, Tabs } from 'react-bootstrap'
import { useParams } from 'react-router'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'
import { getUser } from './helpers/auth'
import { headers } from '../lib/Headers'



const VehicleShow = () => {
  document.title = 'CarTrader | Vehicle'
  window.scrollTo(0,0)
  const [sale, setSale] = useState(null)
  const [images, setImages] = useState([])
  const [user, setUser] = useState([])
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
    const getSaleData = async () => {
      const { data } = await axios.get(`/api/sales/${id}`)
      setSale(data)

      setUser(await getUser())

      if (data.car.images.length === 0) {
        data.car.images.push('https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg')
        data.car.images.push('https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg')
        data.car.images.push('https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg')
      } else if (data.car.images.length === 1) {
        data.car.images.push(data.car.images[0])
        data.car.images.push(data.car.images[0])
      } else if (data.car.images.length === 2) {
        data.car.images.push(data.car.images[0])
        data.car.images.push(data.car.images[1])
      }

      setImages(data.car.images)
    }
    getSaleData()

  }, [id])


  const handleDeleteSale = async () => {
    const newSalesForm = { ...sale }
    newSalesForm.car = newSalesForm.car.id
    newSalesForm.seller = newSalesForm.seller.id
    newSalesForm.saleStatus = 'removed'

    try {
      await axios.put(`api/sales/${id}`, newSalesForm, headers)
    } catch (err) {
      console.log(err)
    }
    console.log(newSalesForm)
  }

  return (
    <section className="main-section">
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
            {images.length > 0 && images.map((img) => {
              return <div key={img} className="vehicle-image-background" style={{ backgroundImage: `url(${img})` }} ></div>
            })}
          </Carousel>
        </Col>
      </Row>
      {sale ?
        <Container className="vehicle-show-main-container">
          <Row>
            <Col xs={6} md={4} lg={3}>
              <h2>{sale.car.make.name} {sale.car.model.name}</h2>
              <p>{`${sale.car.modelVariation} ${sale.car.doors}dr`}</p>
              <h5>{sale.car.yearOfManufacture} | {`${(Math.round(sale.car.yearOfManufacture * 100) / 100).toLocaleString()} miles`}</h5>
            </Col>
            <Col xs={12} md={8} lg={9}>
              <Row>
                <Col md={12} lg={7}>
                  <Container className="vehicle-show-buy-now-container">
                    <Tabs defaultActiveKey="payInFull" id="car-show-payment-options" className="payment-tabs mb-3">
                      <Tab eventKey="payInFull" title="Pay in full">
                        <h2 id="pay-in-full-price">{`£${(Math.round(sale.price * 100) / 100).toLocaleString()}`}</h2>
                        <p className="pay-in-full-paragraph">All major credit and debit cards accepted.</p>
                        <p className="pay-in-full-paragraph">Option to split your payment over multiple cards.</p>
                        {sale && user && sale.saleStatus.toLowerCase() === 'forsale' && sale.seller.id !== user.id ? <Link to={`/buy/${id}`} className="pay-in-full-button" disabled={sale.saleStatus.toLowerCase() === 'sold' ? true : false}>Buy Now</Link> :
                          <>
                            {sale && user && sale.seller.id === user.id ?
                              <>
                                {/* <p style={{ color: 'red' }}>Unavailable! You are the seller of this vehicle.</p> */}
                                <Button className="pay-in-full-button" disabled>Edit sale price</Button>
                                <Button className="pay-in-full-button" disabled onClick={handleDeleteSale}>Remove from sale</Button>
                              </> :
                              sale && user && sale.saleStatus.toLowerCase() === 'sold' ?
                                <>
                                  <Button className="pay-in-full-button" disabled>Buy Now</Button>
                                  <p style={{ color: 'red' }}>Unavailable! Car has been sold.</p>
                                </> :
                                !user && 
                                  <>
                                    <Button className="pay-in-full-button" disabled>Buy Now</Button>
                                    <p style={{ color: 'red' }}>Please login to purchase this car.</p>
                                  </>
                            }
                          </>
                        }
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
                    <h5>Need to sell your car?</h5>
                    <Form className="part-exchange-form">
                      {/* <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Enter your registration</Form.Label>
                        <Form.Control type="text" placeholder="Enter registration" />
                      </Form.Group> */}
                      <Link to='/sell' className="part-exchange-button" variant="primary" type="submit">
                        Go
                      </Link>
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
                <ListGroup.Item><div className="list-container"><p><strong>Transmission</strong></p><p>{sale.car.gearbox}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Mileage</strong></p><p>{sale.car.mileage}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Fuel</strong></p><p>{sale.car.fuelType}</p></div></ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <h3>Trim</h3>
              <hr className="details-separator"></hr>
              <ListGroup variant="flush">
                <ListGroup.Item><div className="list-container"><p><strong>Body</strong></p><p>{sale.car.bodyType}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Colour</strong></p><p>{sale.car.colour}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Doors</strong></p><p>{sale.car.doors}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Seats</strong></p><p>{sale.car.seats}</p></div></ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <h3>Useful information</h3>
              <hr className="details-separator"></hr>
              <ListGroup variant="flush">
                <ListGroup.Item><div className="list-container"><p><strong>Previous owners</strong></p><p>Unknown</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Vehicel registation</strong></p><p>{sale.car.registrationNumber}</p></div></ListGroup.Item>
                <ListGroup.Item><div className="list-container"><p><strong>Fuel</strong></p><p>{sale.car.fuelType}</p></div></ListGroup.Item>
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