import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import UserShow from "./UserShow"
import LandingPage from "./LandingPage"
import EditProfile from "./EditProfile"
import FindCourses from "./FindCourses"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/users/edit">
          <EditProfile currentUser={currentUser} />
        </Route>
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/users/:id">
          <UserShow currentUser={currentUser} />
        </Route>
        <Route exact path="/find-courses">
          <div style={{ width: 300, height: 300 }}>
            <FindCourses />
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default hot(App)
