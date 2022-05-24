import React from "react"

const GolfRoundTile = (props) => {

  const dateTime = new Date(props.round.createdAt)
  const date = dateTime.toLocaleDateString()

  return (
    <div className="golf-round-tile">
      <p className="date">{date}</p>
      <div className="tile-body">
        <div className="tile-score">
          <div className="score-top">
            <h4>Score:</h4>
          </div>
          <div className="score-box">
            <h2>{props.round.score}</h2>
          </div>
        </div>
        <div className="tile-info">
          <div className="holes-played">
            <p >Holes Played: {props.round.holesPlayed}</p>
          </div>
          <p>{props.course?.name}</p>
        </div>
      </div>
    </div>
  )
}

export default GolfRoundTile
