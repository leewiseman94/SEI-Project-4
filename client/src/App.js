import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home.js'
import NavbarMain from './components/NavbarMain.js'
import FindVehicles from './components/FindVehicles.js'
import LoginOrRegister from './components/LoginOrRegister.js'
import VehicleShow from './components/VehicleShow.js'
import VehicleSellDecision from './components/VehicleSellDecision.js'
import VehiclePlaceAdvert from './components/VehiclePlaceAdvert.js'
import VehicleBuy from './components/VehicleBuy.js'
import UserProfile from './components/UserProfile.js'
import Footer from './components/Footer.js'


const App = () => {
  const [modalShow, setModalShow] = useState(false)
  const [loginOrRegister, setLoginOrRegister] = useState('register')

  return (
    <BrowserRouter>
      <NavbarMain setModalShow={setModalShow} setLoginOrRegister={setLoginOrRegister} />
      <LoginOrRegister setModalShow={setModalShow} modalShow={modalShow} setLoginOrRegister={setLoginOrRegister} loginOrRegister={loginOrRegister} />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/vehicles' component={FindVehicles} />
        <Route exact path='/vehicles/:id' component={VehicleShow} />
        <Route exact path='/sell' component={VehicleSellDecision} />
        <Route exact path='/place-advert' component={VehiclePlaceAdvert} />
        <Route exact path='/buy/:id' component={VehicleBuy} />
        <Route exact path='/profile' component={UserProfile} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App