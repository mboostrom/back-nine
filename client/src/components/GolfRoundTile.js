import React from "react";

const GolfRoundTile = props => {
  return(
    <div>
      <h2>{props.round.score}</h2>
      <p>{props.round.holesPlayed}</p>
      <p>{props.round.coursePlayed}</p>
    </div>
  )
}

export default GolfRoundTile