import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import categoryProducts from './components/CategoryProducts'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import NavBar from './components/NavBar'
import ProductsDetails from './components/ProductsDetails'
import ProfilePage from './components/ProfilePage'
import RegisterPage from './components/RegisterPage'

const App = () => {
  return (
    <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/product/:id" component={ProductsDetails} />
      <Route exact path="/category/:id" component={categoryProducts} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact component={HomePage} />
    </Switch>
    </BrowserRouter>
  )
}

export default App