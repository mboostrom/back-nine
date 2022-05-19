import React from "react"

const GolfRoundTile = (props) => {
  const course = props.courses.find(({ id }) => id === props.round.courseId)

  return (
    <div>
      <h2>{props.round.score}</h2>
      <p>{props.round.holesPlayed}</p>
      <p>{course.name}</p>
      <hr></hr>
    </div>
  )
}

export default GolfRoundTile
