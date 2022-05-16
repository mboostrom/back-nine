import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

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
      setProfile(responseBody.user)
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div>
      <h1>{profile.userName}</h1>
    </div>
  )
}

export default UserShow
