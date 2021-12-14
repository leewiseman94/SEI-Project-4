import React, { useEffect, useState } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { Navbar, Container, Nav, Offcanvas, Form, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import NavbarHome from './NavbarHome'
import { userIsAuthenticated } from './helpers/auth.js'
import NavbarProfile from './NavbarProfile'
import axios from 'axios'
import * as QueryString from 'query-string'




const NavbarMain = ({ setModalShow, setLoginOrRegister }) => {
  const history = useHistory()
  const location = useLocation()
  const [makes, setMakes] = useState([])
  const [query, setQuery] = useState({})

  useEffect(() => {
    const getSalesData = async () => {
      const salesData = await axios.get('/api/sales/')
      let allSales = salesData.data
      allSales = allSales.filter(sale => sale.saleStatus.toLowerCase() !== 'sold')

      // * SET ALL FILTER OPTIONS
      const makesArray = []

      for (let i = 0; i < allSales.length; i++) {
        if (!makesArray.includes(allSales[i].car.make.name)) makesArray.push(allSales[i].car.make.name)
      }
      setMakes(makesArray.sort())

    }
    getSalesData()

  }, [location])

  const myProfileClick = () => {
    if (userIsAuthenticated()) {
      history.push('/profile')
    } else {
      setModalShow(true)
      setLoginOrRegister('login')
    }
  }



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
  }

  useEffect(() => {

  }, [query])

  const handleFormSubmit = (event) => {
    event.preventDefault()
    setModalShow(false)
    history.push(`/vehicles?${QueryString.stringify(query)}`)
  }



  return (
    <>
      <Container id="header-container" >
        {/* MOBILE RESPONSE NAVBAR */}
        <Navbar variant="dark" bg="transparent" expand="lg" className="offcanvas-navbar navbar">
          <Container fluid>
            <Navbar.Brand href="#home">
                CAR TRADER
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel"><Link to="/" className="text-black navbar-title">CAR TRADER</Link></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-flex-start align-items-start " style={{ width: '100%' }} navbarScroll>
                  <Link to="/vehicles" className="navbar-mobile-link">Browse cars</Link>
                  <Link to="/sell" className="navbar-mobile-link">Sell your car</Link>
                  <Link to="#" className="navbar-mobile-link">Car reviews</Link>
                  <Link to="#" className="navbar-mobile-link">About us</Link>
                  <Link to="#" className="navbar-mobile-link">Car finance</Link>
                  <Link to='#' className="navbar-mobile-link" onClick={myProfileClick}>{userIsAuthenticated() ? 'My profile' : 'My profile'}</Link>
                </Nav>
                <Form onSubmit={handleFormSubmit}>
                  <Row className="justify-content-center form-container navbar-form-container-row">
                    <Col xs={12} style={{ paddingBottom: '20px' }}>
                      <Form.Select id="navbar-select-make" className="navbar-select select-make" aria-label="Select make" onChange={(event) => {

                        formMakeChange(event)
                      }} >
                        <option>Select make</option>
                        {makes.map(make => {
                          return <option key={make} value={make}>{make}</option>
                        })}
                      </Form.Select>
                    </Col>
                    <Col xs={12}>
                      <Button id="home-form-button" className="form-button" variant="primary" type="submit">
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

        {/* DESKTOP NAVBAR */}
        <Container>
          <Navbar bg="transparent" expand={true} className="main-navbar navbar text-white">
            <Container fluid>
              <Link to="/" className="text-white navbar-title">CAR TRADER</Link>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="justify-content-around me-auto my-2 my-lg-0" style={{ maxHeight: '100px', width: '100%' }} navbarScroll>
                  <Link to="/vehicles" className="navbar-link">Browse cars</Link>
                  <Link to="/sell" className="navbar-link">Sell your car</Link>
                  <Link to="#" className="navbar-link">Car reviews</Link>
                  <Link to="#" className="navbar-link">About us</Link>
                  <Link to="#" className="navbar-link">Car finance</Link>
                </Nav>
                <Nav className="justify-content-end me-auto my-2 my-lg-0" style={{ maxHeight: '100px', width: '200px' }} navbarScroll>
                  <Nav.Link className="navbar-link" onClick={myProfileClick}>{userIsAuthenticated() ? 'My profile' : 'My profile'}</Nav.Link>
                  <Nav.Link className="navbar-profile-icon-container" onClick={myProfileClick}><FontAwesomeIcon className="navbar-profile-icon" icon={faUserCircle} /></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
        {location.pathname === '/' && <NavbarHome />}
        {location.pathname.includes('/profile') && <NavbarProfile />}
      </Container>
    </>
  )
}

export default NavbarMain