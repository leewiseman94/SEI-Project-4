import React from 'react'
import { Accordion, Row, Col, Form } from 'react-bootstrap'
import FindVehicleCard from './FindVehiclesCard.js'

const FindVehicles = () => {

  const vehichles = [
    'Vehicle 1',
    'Vehicle 2',
    'Vehicle 3',
    'Vehicle 4',
    'Vehicle 5',
    'Vehicle 6',
    'Vehicle 7',
    'Vehicle 8',
    'Vehicle 9',
    'Vehicle 10',
    'Vehicle 11',
    'Vehicle 12'
  ]

  // document.addEventListener('scroll', () => {
  //   const scrolled = document.scrollingElement.scrollTop
  //   const sidebar = document.querySelector('.filters-container')
  //   if (sidebar.offsetTop <= scrolled + 10) {
  //     sidebar.classList.add('sticky')
  //   } else {
  //     sidebar.classList.remove('sticky')
  //   }
  // })

 

  

  const filterChange = (event) => {
    console.log(event.target.value)
  } 

  return (
    <section>
      <Row>
        <Col className="filters-container">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Make and model</Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Form.Label>Make</Form.Label>
                  <Form.Select id="filter-make" className="filter-select select-make" aria-label="Select make" onChange={(event) => {
                    filterChange(event)
                  }} >
                    <option>Any</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Row>
                <Row className="mb-3">
                  <Form.Label>Model</Form.Label>
                  <Form.Select id="filter-make" className="filter-select select-make" aria-label="Select make" onChange={(event) => {
                    filterChange(event)
                  }} >
                    <option>Any</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Price</Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Min</Form.Label>
                    <Form.Select id="filter-make" className="filter-select select-make" aria-label="Select make" onChange={(event) => {
                      filterChange(event)
                    }} >
                      <option>Any</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Label>Max</Form.Label>
                    <Form.Select id="filter-make" className="filter-select select-make" aria-label="Select make" onChange={(event) => {
                      filterChange(event)
                    }} >
                      <option>Any</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Age</Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>From (oldest)</Form.Label>
                    <Form.Select id="filter-make" className="filter-select select-make" aria-label="Select make" onChange={(event) => {
                      filterChange(event)
                    }} >
                      <option>Any</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Label>To (newest)</Form.Label>
                    <Form.Select id="filter-make" className="filter-select select-make" aria-label="Select make" onChange={(event) => {
                      filterChange(event)
                    }} >
                      <option>Any</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Milage</Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Form.Label>Miles</Form.Label>
                  <Form.Select id="filter-miles" className="filter-select select-miles" aria-label="Select make" onChange={(event) => {
                    filterChange(event)
                  }} >
                    <option>Any</option>
                    <option value="5000">Up to 5,000</option>
                    <option value="10000">Up to 10,000</option>
                    <option value="20000">up to 20,000</option>
                  </Form.Select>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        </Col>
        <Col className="vehichles-show-container mx-5">
          <Row className="vehicles-title mt-5">
            <h1>All Cars </h1>
          </Row>
          <hr></hr>
          <Row className="vehicles-title mt-5">
            {vehichles.map((vehicle) => {
              return (
                <Col key={vehicle} xs="12" sm="6" md="4" lg="6" xl="3" xxl="3" >
                  <FindVehicleCard vehicle={vehicle} />
                </Col>
              )
            })}
          </Row>

          
        </Col>
      </Row>
    </section>
  )
}

export default FindVehicles