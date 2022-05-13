import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import categoryProducts from './components/CategoryProducts'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import NavBar from './components/NavBar'
import ProductsDetails from './components/ProductsDetails'
import Cart from './components/Cart'
import ProfilePage from './components/ProfilePage'
import RegisterPage from './components/RegisterPage'
import { domain, usertoken, header } from './env'
import Axios from 'axios'
import { useGlobalState } from './state/provider'

const App = () => {
  const [{ profile, pagereload, cartcomplit, cartuncomplit }, dispatch] = useGlobalState()
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
  }, [pagereload])

  useEffect(() => {
    const getcart = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/cart/`,
        headers: header
      }).then(res => {
        // console.log(res.data);
        {
          const all_data = []
          res?.data.map(data => {
            if (data.complit) {
              all_data.push(data)
              dispatch({
                type: "ADD_CARTCOMPLIT",
                cartcomplit: all_data
              })
              // console.log(true);
            }
            else {
              dispatch({
                type: "ADD_CARTUNCOMPLIT",
                cartuncomplit: data
              })
              // console.log(false)
            }
          })
        }
      })
    }
    getcart()
  }, [pagereload])

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/product/:id" component={ProductsDetails} />
        <Route exact path="/category/:id" component={categoryProducts} />

        {
          profile !== null ? (
            <>
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/cart" component={Cart} />

            </>
          ) :
            (
              <>
                <Route exact path="/login" component={LoginPage} />
              </>
            )
        }



        <Route exact component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App