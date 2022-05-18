import React from "react";

const GolfRoundTile = props => {
  return(
    <div>
      <h2>{props.round.score}</h2>
      <p>{props.round.holesPlayed}</p>
      <hr></hr>
    </div>
  )
}

export default GolfRoundTile