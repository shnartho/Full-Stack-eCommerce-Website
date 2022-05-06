import React, { useEffect } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import categoryProducts from './components/CategoryProducts'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import NavBar from './components/NavBar'
import ProductsDetails from './components/ProductsDetails'
import ProfilePage from './components/ProfilePage'
import RegisterPage from './components/RegisterPage'
import { domain, usertoken, header } from './env'
import Axios from 'axios'
import { useGlobalState } from './state/provider'

const App = () => {
  const [{profile},dispatch] = useGlobalState()
  //console.log(profile, "this is profile")
  useEffect(() => {
    if (usertoken !== null) {
      const getdata = async () => {
        await Axios({
          method: "get",
          url: `${domain}/api/profile/`,
          headers: header
        }).then(response => {
          //console.log(response.data["data"], " Profile Data")
          dispatch({
            type: "ADD_PROFILE",
            profile: response.data["data"]

          })
        })
      }
      getdata()
    }
  },[])
          
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