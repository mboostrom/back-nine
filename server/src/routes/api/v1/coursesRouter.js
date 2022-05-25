import express from "express"
import { Course } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"


const coursesRouter = new express.Router()

coursesRouter.get('/', async (req, res) => {
  try {
    const courses = await Course.query()
    res.status(200).json({ courses })
  } catch (error) {
    res.status(500).json({ error })
  }
})

coursesRouter.post('/new-course', async (req, res) => {
  const formInput = cleanUserInput(req.body)
  console.log(formInput)
  try {
    const newGolfCourse = await Course.query().insertAndFetch(formInput)                  
    res.status(201).json({ newGolfCourse })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data } )
    } else {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
})

export default coursesRouter