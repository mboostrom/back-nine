import React from "react"
import { useState } from "react"

import ErrorList from "../components/layout/ErrorList"

const GolfCourseForm = (props) => {
  const [newGolfCourse, setNewGolfCourse] = useState({
    name: "",
    location: "",
  })

  const handleChange = (event) => {
    setNewGolfCourse({
      ...newGolfCourse,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await props.postGolfCourse(newGolfCourse)
    if (result) {
      props.toggleCourseModal()
    }
  }

  return (
    <div>
      <div className="add-round">
        <h1>Add a Golf Course</h1>
      </div>
      <ErrorList errors={props.errors} />
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={newGolfCourse.name}
              placeholder="Course Name"
              className="form-text"
            />
          </label>
          <label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              value={newGolfCourse.location}
              placeholder="city, state"
              className="form-text"
            />
          </label>
          <input type="submit" name="submit" value="Add Course" className="button sign-button add-course-button" />
        </form>
      </div>
    </div>
  )
}

export default GolfCourseForm
