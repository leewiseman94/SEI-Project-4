import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home.js'
import NavbarMain from './components/NavbarMain.js'
import FindVehicles from './components/FindVehicles.js'
// import { Modal, Button } from 'react-bootstrap'
import LoginOrRegister from './components/LoginOrRegister.js'


const App = () => {
  const [modalShow, setModalShow] = useState(false)
  const [loginOrRegister, setLoginOrRegister] = useState('login')

  return (
    <BrowserRouter>
      <NavbarMain  setModalShow={setModalShow} setLoginOrRegister={setLoginOrRegister}  />
      <LoginOrRegister setModalShow={setModalShow} modalShow={modalShow} setLoginOrRegister={setLoginOrRegister} loginOrRegister={loginOrRegister} />
      <Switch>
        <section className="main-section">
          <Route exact path='/' component={Home} />
          <Route exact path='/find-vehicles' component={FindVehicles} />
        </section>
      </Switch>
    </BrowserRouter>
  )
}

export default App