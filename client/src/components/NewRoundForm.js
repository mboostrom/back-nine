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
        <h1>Add a Golf Round:</h1>
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
            />
          </label>
          <p>Holes Played:</p>
          <div>
            <input
              type="radio"
              name="holesPlayed"
              value="9"
              checked={newGolfRound.holesPlayed === "9"}
              onChange={handleChange}
            />
            9
          </div>
          <div>
            <input
              type="radio"
              name="holesPlayed"
              value="18"
              checked={newGolfRound.holesPlayed === "18"}
              onChange={handleChange}
            />
            18
          </div>
          <label>
            course:
            <select
              name="courseId"
              onChange={handleChange}
              value={newGolfRound.courseId}
              placeholder="Pick a course"
            >
              <option>
                Select a course
              </option>
              {courseOptions}
            </select>
          </label>
          <div>
            <input type="submit" name="submit" value="Add Round" className="button sign-button" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewRoundForm
