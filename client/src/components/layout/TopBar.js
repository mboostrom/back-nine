import React from "react"
import { Link } from "react-router-dom"
import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="nav-link">
        Sign In
      </Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button sign-button">
        Sign Up
      </Link>
    </li>,
  ]

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ]

  let userId = ''
  if(user){
    userId = user.id
  }


  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="home-link">
          <ul className="menu">
            <li>
              <Link to="/" className="home">
                <span className="back">Back</span>
                <span className="nine">Nine</span>
              </Link>
            </li>
            <li className="nav-left-tab">
              <Link to={`/users/${userId}`} className="nav-link">Profile</Link>
            </li>
            <li className="nav-left-tab">
              <Link to={`/find-courses`} className="nav-link">Find Courses</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  )
}

export default TopBar
