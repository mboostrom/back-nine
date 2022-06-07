import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import SignOutButton from "../authentication/SignOutButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const TopBar = ({ user }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="nav-link" onClick={toggleOpen}>
        Sign In
      </Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button sign-button sign-up-button" onClick={toggleOpen}>
        Sign Up
      </Link>
    </li>,
  ]

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ]

  let userId = ""
  if (user) {
    userId = user.id
  }


  let hamburgerMenu
  if (open) {
    hamburgerMenu = (
      <div className="hamburger-menu">
        <ul>
          <li>
            <Link to={`/users/${userId}`} onClick={toggleOpen}>Profile</Link>
          </li>
          <li>
            <Link to={`/find-courses`} onClick={toggleOpen}>Find Courses</Link>
          </li>
          {user ? authenticatedListItems : unauthenticatedListItems}
        </ul>
      </div>
    )
  }

  return (
    <>
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
                <Link to={`/users/${userId}`} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-left-tab">
                <Link to={`/find-courses`} className="nav-link">
                  Find Courses
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="top-bar-right">
          <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
        </div>
        <div className="hamburger" onClick={toggleOpen}>
          <FontAwesomeIcon icon={faBars} size="xl" />
        </div>
      </div>
      {hamburgerMenu}
    </>
  )
}

export default TopBar
