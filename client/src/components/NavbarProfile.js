import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import * as QueryString from 'query-string'
import { Link, useHistory } from 'react-router-dom'
import { getPayload } from './helpers/auth'


const NavbarProfile = () => {

  const [sales, setSales] = useState([])
  const [makes, setMakes] = useState([])
  const [models, setModels] = useState([])
  const [query, setQuery] = useState({})
  const [user, setUser] = useState({})
  const history = useHistory()

  useEffect(() => {
    const getSalesData = async () => {
      const salesData = await axios.get('/api/sales/')
      let allSales = salesData.data
      allSales = allSales.filter(sale => sale.saleStatus.toLowerCase() !== 'sold' )
      setSales(allSales)

      // * SET ALL FILTER OPTIONS
      const makesArray = []
      const modelsArray = []

      for (let i = 0; i < allSales.length; i++) {
        if (!makesArray.includes(allSales[i].car.make.name)) makesArray.push(allSales[i].car.make.name)
        if (!modelsArray.includes(allSales[i].car.model.name)) modelsArray.push(allSales[i].car.model.name)
      }
      setMakes(makesArray.sort())
      setModels(modelsArray.sort())

    }
    getSalesData()

    const getUserData = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/auth/find/${payload.sub}`)
        setUser(data)
        
      } catch (err) {
        console.log(err)
      }



    }
    getUserData()
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

  useEffect(() => {

  }, [query])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <Container className="profile-hero-container">
      <Row>
        <Col xs={12} sm={12} md={6}>
          <Container className="profile-header-container text-white">
            <h5>{user.first_name} {user.surname}</h5>
            <h6>{user.email}</h6>
            <Button id="profile-logout-button" onClick={handleLogout}>Logout</Button>
          </Container>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Container className="profile-form-container">
            <Form>
              <Row className="justify-content-center form-container profile-form-container-row">
                <Col xs={12}>
                  <Form.Select id="home-select-make" className="home-select select-make" aria-label="Select make" onChange={(event) => {
                    formMakeChange(event)
                  }} >
                    <option>Select make</option>
                    {makes.map(make => {
                      return <option key={make} value={make}>{make}</option>
                    })}
                  </Form.Select>
                </Col>
                <Col xs={12}>
                  <Form.Select id="home-select-model" className="home-select select-model" aria-label="Select model" disabled onChange={(event) => {
                    formModelChange(event)
                  }}>
                    <option>Select model</option>
                    {models.map(model => {
                      const selectedMake = document.querySelector('#home-select-make')
                      const modelCount = sales.filter(sale => (sale.car.model.name.toLowerCase() === model.toLowerCase() || model.toLowerCase() === 'any') && (sale.car.make.name.toLowerCase() === selectedMake.value.toLowerCase())).length
                      return !selectedMake.value ? <option key={model} value={model}>{model}</option> :
                        modelCount > 0 && <option key={model} value={model}>{model}</option>
                    })}
                  </Form.Select>
                </Col>
                <Col xs={12}>
                  <Link to={`/vehicles?${QueryString.stringify(query)}`} id="home-form-button" className="form-button" variant="primary" type="button">
                    Search
                  </Link>
                </Col>
              </Row>
            </Form>
          </Container>
        </Col>
      </Row>




    </Container>
  )
}

export default NavbarProfile