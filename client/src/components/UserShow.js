import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import GolfRoundTile from "./GolfRoundTile"

const UserShow = (props) => {
  const [profile, setProfile] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    golfRounds: [],
  })

  const params = useParams()
  const userId = params.id
  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`)
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`)
        throw error
      }
      const responseBody = await response.json()
      setProfile(responseBody.serializedUser)
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const golfRounds = profile.golfRounds.map((round) => {
    return <GolfRoundTile key={round.id} round={round} />
  })

  return (
    <div>
      <h1>{profile.userName}</h1>
      <div>{golfRounds}</div>
    </div>
  )
}

export default UserShow
