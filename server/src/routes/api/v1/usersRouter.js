import express from "express"
import passport from "passport"
import { User } from "../../../models/index.js"
import UserSerializer from "../../../serializers/UserSerializer.js"
import userRoundRouter from "./userRoundRouter.js"
import uploadImage from "../../../services/uploadImage.js"
import cleanUserInput from "../../../services/cleanUserInput.js"


const usersRouter = new express.Router()

usersRouter.post("/", async (req, res) => {
  const { userName, email, password, passwordConfirmation } = req.body
  try {
    const persistedUser = await User.query().insertAndFetch({
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

usersRouter.patch("/edit", uploadImage.single("profileImage"), async (req, res) => {
  try {
    const bodyInput = await cleanUserInput(req.body)
    const formData = {
      ...bodyInput,
      profileImage: req.file.location,
      email: req.user.email,
      userName: req.user.userName
    }
    const profile = await User.query().findById(req.user.id)
    const updatedProfile = await profile.$query().updateAndFetch(formData)
    return res.status(201).json({ updatedProfile })
  } catch (error) {
      return res.status(500).json({ errors: error })
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

usersRouter.use('/:userId/golfRound', userRoundRouter)

export default usersRouter
