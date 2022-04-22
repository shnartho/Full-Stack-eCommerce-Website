import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import ProductsDetails from './components/ProductsDetails'

const App = () => {
  return (
    <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/product/:id" component={ProductsDetails} />
      <Route exact component={HomePage} />
    </Switch>
    </BrowserRouter>
  )
}

export default App