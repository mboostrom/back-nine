import express from "express"
import passport from "passport"
import { User } from "../../../models/index.js"
import UserSerializer from "../../../serializers/UserSerializer.js"

const usersRouter = new express.Router()

usersRouter.post("/", async (req, res) => {
  const { firstName, lastName, userName, email, password, passwordConfirmation } = req.body
  try {
    const persistedUser = await User.query().insertAndFetch({
      firstName,
      lastName,
      userName,
      email,
      password,
    })
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser })
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({ errors: error })
  }
})

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.query().findById(id)
    const serializedUser = await UserSerializer.getSummary(user)
    res.status(200).json({ serializedUser })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default usersRouter
