import express  from "express"
import GolfRound from "../../../models/GolfRound.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"

const userRoundRouter = express.Router({ mergeParams: true })

userRoundRouter.post("/", async (req, res) => {
  const formInput = cleanUserInput(req.body)
  try {
    const newGolfRound = await GolfRound.query().insertAndFetch({ ...formInput, userId: req.params.userId })                  
    res.status(201).json({ newGolfRound })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data } )
    } else {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
})

export default userRoundRouter