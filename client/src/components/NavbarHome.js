import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import * as QueryString from 'query-string'
// import { useHistory } from 'react-router'
// import { Link } from 'react-router-dom'

const NavbarHome = () => {

  const [vehicles, setVehicles] = useState([])
  const [makes, setMakes] = useState([])
  const [models, setModels] = useState([])
  const [query, setQuery] = useState({})
  // const history = useHistory()

  useEffect(() => {
    const getVehicleData = async () => {
      const vehicleData = await axios.get('/api/cars/')
      const allVehicles = vehicleData.data
      setVehicles(allVehicles)


      // * SET ALL FILTER OPTIONS
      const makesArray = []
      const modelsArray = []

      for (let i = 0; i < allVehicles.length; i++) {
        if (!makesArray.includes(allVehicles[i].make.name)) makesArray.push(allVehicles[i].make.name)
        if (!modelsArray.includes(allVehicles[i].model.name)) modelsArray.push(allVehicles[i].model.name)
      }
      setMakes(makesArray.sort())
      setModels(modelsArray.sort())

    }
    getVehicleData()
  }, [])

  const formMakeChange = (event) => {
    
    if (event.target.value !== 'Select make') {
      const newQuery = { ...query, 'make': event.target.value.toLowerCase() }
      setQuery(newQuery)
    } else {
      const newQuery = { ...query }
      delete newQuery.make
      delete newQuery.model
      setQuery(newQuery)
    }

    if (event.target.value === 'Select make') {
      document.querySelector('.select-model').setAttribute('disabled', 'disabled')
    } else {
      document.querySelector('.select-model').removeAttribute('disabled', 'disabled')
    }
  }

  const formModelChange = (event) => {
    if (event.target.value !== 'Select model') {
      const newQuery = { ...query, 'model': event.target.value.toLowerCase() }
      setQuery(newQuery)
    } else {
      const newQuery = { ...query }
      delete newQuery.model
      setQuery(newQuery)
    }
  }

  // const formSubmit = () => {
    
  //   console.log(query)
  //   history.push('/find-vehicles')
  //   // history.push(`/find-vehicles/?${QueryString.stringify(query)}`)
  // }

  useEffect(() =>{

  }, [query])



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
              <Form.Select id="home-select-make" className="home-select select-make" aria-label="Select make" onChange={(event) => {
                formMakeChange(event)
              }} >
                <option>Select make</option>
                {makes.map(make => {
                  return <option key={make} value={make}>{make}</option>
                })}
              </Form.Select>
            </Col>
            <Col md>
              <Form.Select id="home-select-model" className="home-select select-model" aria-label="Select model" disabled onChange={(event) => {
                formModelChange(event)
              }}>
                <option>Select model</option>
                {models.map(model => {
                  const selectedMake = document.querySelector('#home-select-make')
                  const modelCount = vehicles.filter(vehicle => (vehicle.model.name.toLowerCase() === model.toLowerCase() || model.toLowerCase() === 'any') && (vehicle.make.name.toLowerCase() === selectedMake.value.toLowerCase())).length
                  return !selectedMake.value ? <option key={model} value={model}>{model}</option> :
                    modelCount > 0 && <option key={model} value={model}>{model}</option>
                })}
              </Form.Select>
            </Col>
            <Col md>
              <Button href={`/find-vehicles?${QueryString.stringify(query)}`} id="home-form-button" className="form-button" variant="primary" type="button">
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