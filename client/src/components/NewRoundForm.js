import React from "react"
import { useState } from "react"

import ErrorList from "../components/layout/ErrorList"

const NewRoundForm = (props) => {
  const [newGolfRound, setNewGolfRound] = useState({
    score: "",
    holesPlayed: "",
    courseId: "",
  })

  const handleChange = (event) => {
    setNewGolfRound({
      ...newGolfRound,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await props.postGolfRound(newGolfRound)
    if (result) {
      props.toggleModal()
    }
  }

  const courseOptions = props.courses.map((course) => {
    return (
      <option key={course.name} value={course.id}>
        {course.name}
      </option>
    )
  })

  return (
    <div>
      <div className="add-round">
        <h1>Add a Golf Round</h1>
      </div>
      <div>
        <ErrorList errors={props.errors} />
      </div>
      <div className="round-form">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="score"
              onChange={handleChange}
              value={newGolfRound.score}
              placeholder="score"
              className="form-text"
            />
          </label>
          <p>Holes Played:</p>
          <div className="radio">
            <input
              type="radio"
              name="holesPlayed"
              className="holesPlayed"
              value="9"
              checked={newGolfRound.holesPlayed === "9"}
              onChange={handleChange}
            />
             <span className="holes">9</span>
          </div>
          <div className="radio">
            <input
              type="radio"
              name="holesPlayed"
              className="holesPlayed"
              value="18"
              checked={newGolfRound.holesPlayed === "18"}
              onChange={handleChange}
            />
              <span className="holes">18</span>
          </div>
          <label className="course-select">
            <select
              name="courseId"
              onChange={handleChange}
              value={newGolfRound.courseId}
              placeholder="Pick a course"
              className="form-text"
            >
              <option>
                Select a course
              </option>
              {courseOptions}
            </select>
          </label>
          <div>
            <input type="submit" name="submit" value="Add Round" className="button sign-button add-round-button" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewRoundForm
