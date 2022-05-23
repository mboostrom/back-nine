import React, { useState } from "react"
import FormError from "../layout/FormError"
import config from "../../config"

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  })

  const [errors, setErrors] = useState({})

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const validateInput = (payload) => {
    setErrors({})
    const { firstName, lastName, userName, email, password, passwordConfirmation } = payload
    const emailRegexp = config.validation.email.regexp.emailRegex
    let newErrors = {}
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      }
    }

    if (userName.trim() == "") {
      newErrors = {
        ...newErrors,
        userName: "is required",
      }
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      }
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        }
      }
    }

    setErrors(newErrors)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    validateInput(userPayload)
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
        const userData = await response.json()
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  if (shouldRedirect) {
    location.href = "/users/edit"
  }

  return (
    <div className="sign-container">
      <div className="sign-up-left"></div>
      <div className="sign-form">
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>
              <input
                type="text"
                name="userName"
                value={userPayload.userName}
                onChange={onInputChange}
                placeholder="username"
              />
              <FormError error={errors.userName} />
            </label>
          </div>
          <div>
            <label>
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} placeholder="email"/>
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label>
              <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
                placeholder="password"
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div>
            <label>
              <input
                type="password"
                name="passwordConfirmation"
                value={userPayload.passwordConfirmation}
                onChange={onInputChange}
                placeholder="confirm password"
              />
              <FormError error={errors.passwordConfirmation} />
            </label>
          </div>
          <div>
            <input type="submit" className="button sign-button" value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
