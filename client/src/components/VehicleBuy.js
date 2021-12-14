import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { getPayload } from './helpers/auth'
import { headers } from '../lib/Headers'

const VehicleBuy = () => {
  document.title = 'CarTrader | Buy vehicle'
  const [sale, setSale] = useState(null)
  const [user, setUser] = useState([])
  // const [saleForm, setSaleForm] = useState({})
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    const getSaleData = async () => {
      const { data } = await axios.get(`/api/sales/${id}`)
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
      setSale(data)
      // setSaleForm(data)
    }
    getSaleData()

    const getUserData = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/auth/find/${payload.sub}`)
        setUser(data)
      } catch (err) {
        console.log(err)
        history.push('')
      }

    }
    getUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  const handlePurchaseVehicle = async (event) => {
    event.preventDefault()
    const newSaleForm = { ...sale }
    newSaleForm.buyer = user.id
    newSaleForm.seller = newSaleForm.seller.id
    newSaleForm.car = newSaleForm.car.id
    newSaleForm.saleStatus = 'sold'
    // newSaleForm.completedSaleDate = new Date()
    history.push('/profile')
    try {
      await axios.put(`/api/sales/${sale.id}/`, newSaleForm, headers)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className="main-section">
      {sale ?
        <Container style={{ paddingTop: '80px', maxWidth: '900px' }} >
          <Row className="buy-car-vehicle-card">
            <Col xs={12} md={5} style={{ padding: '20px' }}>
              <h2>{sale.car.make.name} {sale.car.model.name}</h2>
              <p>{`${sale.car.modelVariation} ${sale.car.doors}dr`}</p>
              <h5>{sale.car.yearOfManufacture} | {`${(Math.round(sale.car.yearOfManufacture * 100) / 100).toLocaleString()} miles`}</h5>
              <h2 style={{ color: '#013e70', paddingTop: '30px' }}>{`£${(Math.round(sale.price * 100) / 100).toLocaleString()}`}</h2>
            </Col>
            <Col xs={12} md={7} style={{ padding: '0' }}>
              <div className="vehicle-image-background" ><img style={{ width: '100%', borderRadius: '50px' }} src={sale.car.images[0]}></img></div>
            </Col>
          </Row>
          <Row>
            <Container className="place-advert-header">
              <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Form className="place-advert-form" style={{ marginTop: '10px', maxWidth: '900px', width: '100%' }} onSubmit={handlePurchaseVehicle}>
                  <Container style={{ margin: '40px 0', width: '100%' }} className="place-advert-header">
                    <div className="place-advert-step"><div className="place-advert-number-container">1</div><h4 className="place-advert-title">Your Details</h4></div>
                  </Container>
                  <Row>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <FloatingLabel controlId="floatingInputModel" label="First name">
                          <Form.Control type="text" name="first_name" defaultValue={user.first_name} placeholder="Enter first name" required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3" controlId="formBasicSurname">
                        <FloatingLabel controlId="floatingInputModel" label="Surname">
                          <Form.Control type="text" name="surname" defaultValue={user.surname} placeholder="Enter surname" required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                        <FloatingLabel controlId="floatingInputModel" label="Email">
                          <Form.Control type="email" name="email" defaultValue={user.email} placeholder="Enter email" required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3" controlId="formBasicCity">
                        <FloatingLabel controlId="floatingInputModel" label="Phone number">
                          <Form.Control type="text" name="phone_number" defaultValue={user.phone_number} placeholder="Enter phone number" required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3" controlId="formBasicAddress">
                        <FloatingLabel controlId="floatingInputModel" label="Address">
                          <Form.Control type="text" name="address" defaultValue={user.address} placeholder="Enter address" required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3" controlId="formBasicCity">
                        <FloatingLabel controlId="floatingInputModel" label="City">
                          <Form.Control type="text" name="city" defaultValue={user.city} placeholder="Enter city" required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3" controlId="formBasicCounty">
                        <FloatingLabel controlId="floatingInputModel" label="County">
                          <Form.Control type="text" name="county" defaultValue={user.county} placeholder="Enter county" required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3" controlId="formBasicPostCode">
                        <FloatingLabel controlId="floatingInputModel" label="Post code">
                          <Form.Control type="text" name="post_code" defaultValue={user.post_code} placeholder="Enter post code" required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Container style={{ margin: '40px 0', width: '100%' }} className="place-advert-header">
                    <div className="place-advert-step"><div className="place-advert-number-container">2</div><h4 className="place-advert-title">Payment Details</h4></div>
                  </Container>
                  <Row>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3" controlId="formBasicCardNumber">
                        <FloatingLabel controlId="floatingInputModel" label="Card number">
                          <Form.Control type="text" name="card_number" placeholder="Enter card number" maxLength="16" required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col xs={8} sm={8} md={4}>
                      <Form.Group className="mb-3" controlId="formBasicExpiry">
                        <FloatingLabel controlId="floatingInputModel" label="Expiry date">
                          <Form.Control type="month" name="expiry_date" placeholder="Enter expiry date" required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col xs={4} sm={4} md={2}>
                      <Form.Group className="mb-3" controlId="formBasicCVC">
                        <FloatingLabel controlId="floatingInputModel" label="CVC">
                          <Form.Control type="text" name="cvc" placeholder="Enter cvc" maxLength="3" required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12} style={{ textAlign: '-webkit-center' }}>
                      <Button style={{ maxWidth: '300px', margin: '20px' }} className="place-advert-find-car-button" variant="primary" type="submit">
                        Confirm Purchase
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </Container>
          </Row>
        </Container>
        :
        <Container style={{ paddingTop: '80px', maxWidth: '600px' }} >

        </Container>
      }
    </section>

  )
}

export default VehicleBuy