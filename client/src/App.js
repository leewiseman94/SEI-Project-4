import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home.js'
import NavbarMain from './components/NavbarMain.js'
import FindVehicles from './components/FindVehicles.js'
// import { Modal, Button } from 'react-bootstrap'
import LoginOrRegister from './components/LoginOrRegister.js'
import VehicleShow from './components/VehicleShow.js'


const App = () => {
  const [modalShow, setModalShow] = useState(false)
  const [loginOrRegister, setLoginOrRegister] = useState('register')

  return (
    <BrowserRouter>
      <NavbarMain  setModalShow={setModalShow} setLoginOrRegister={setLoginOrRegister}  />
      <LoginOrRegister setModalShow={setModalShow} modalShow={modalShow} setLoginOrRegister={setLoginOrRegister} loginOrRegister={loginOrRegister} />
      <Switch>
        <section className="main-section">
          <Route exact path='/' component={Home} />
          <Route exact path='/vehicles' component={FindVehicles} />
          <Route exact path='/vehicles/:id' component={VehicleShow} />
        </section>
      </Switch>
    </BrowserRouter>
  )
}

export default App