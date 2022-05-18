import express from "express"
import { Course } from "../../../models/index.js"

const coursesRouter = new express.Router()

coursesRouter.get('/', async (req, res) => {
  try {
    const courses = await Course.query()
    res.status(200).json({ courses })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default coursesRouter