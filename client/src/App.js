import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home.js'
import NavbarMain from './components/NavbarMain.js'
import FindVehicles from './components/FindVehicles.js'
// import { Modal, Button } from 'react-bootstrap'
import LoginOrRegister from './components/LoginOrRegister.js'
import VehicleShow from './components/VehicleShow.js'
import VehicleSellDecision from './components/VehicleSellDecision.js'
import VehiclePlaceAdvert from './components/VehiclePlaceAdvert.js'
import VehicleBuy from './components/VehicleBuy.js'


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
          <Route exact path='/sell' component={VehicleSellDecision} />
          <Route exact path='/place-advert' component={VehiclePlaceAdvert} />
          <Route exact path='/buy' component={VehicleBuy} />
        </section>
      </Switch>
    </BrowserRouter>
  )
}

export default App