import React, { useEffect } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown, Offcanvas, Form, FormControl, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import NavbarHome from './NavbarHome'
import { userIsAuthenticated } from './helpers/auth.js'
import NavbarProfile from './NavbarProfile'




const NavbarMain = ({ setModalShow, setLoginOrRegister }) => {

  const location = useLocation()
  console.log(location)

  useEffect(() => {

  }, [location])

  const history = useHistory()

  const myProfileClick = () => {


    if (userIsAuthenticated()) {
      history.push('/profile')
    } else {
      setModalShow(true)
      setLoginOrRegister('login')
    }
    
  }

  

  return (
    <>
      <Container id="header-container" >
        {/* MOBILE RESPONSE NAVBAR */}
        <Navbar variant="dark"  bg="transparent" expand="lg" className="offcanvas-navbar navbar">
          <Container fluid>
            <Navbar.Brand href="#home">
              {/* <img
                  src="../../public/favicon.ico"
                  width="100"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Logo"
                /> */}
                CAR TRADER
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        
        {/* DESKTOP NAVBAR */}
        <Container>
          <Navbar bg="transparent" expand={true} className="main-navbar navbar text-white">
            <Container fluid>
              <Link to="/" className="text-white navbar-title">
                {/* <img
                  src="../../public/favicon.ico"
                  width="100"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Logo"
                /> */}
                CAR TRADER
              </Link>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="justify-content-around me-auto my-2 my-lg-0" style={{ maxHeight: '100px', width: '100%' }} navbarScroll>
                  <Link to="/vehicles" className="navbar-link">Browse cars</Link>
                  <Link to="/sell" className="navbar-link">Sell your car</Link>
                  <Link to="#action2" className="navbar-link">Car reviews</Link>
                  <Link to="#action2" className="navbar-link">About us</Link>
                  <Link to="#action2" className="navbar-link">Car finance</Link>
                </Nav>
                <Nav className="justify-content-end me-auto my-2 my-lg-0" style={{ maxHeight: '100px', width: '200px' }} navbarScroll>
                  <Nav.Link className="navbar-link" onClick={myProfileClick}>{userIsAuthenticated() ? 'My profile' : 'My profile'}</Nav.Link>
                  <Nav.Link className="navbar-profile-icon-container" onClick={myProfileClick}><FontAwesomeIcon className="navbar-profile-icon" icon={faUserCircle}/></Nav.Link>
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