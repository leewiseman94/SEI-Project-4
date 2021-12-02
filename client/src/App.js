import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home.js'
import NavbarMain from './components/NavbarMain.js'
import FindVehicles from './components/FindVehicles.js'


const App = () => {

  return (
    <BrowserRouter>
      <NavbarMain />
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