import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import GolfRoundTile from "./GolfRoundTile"
import translateServerErrors from "../services/translateServerErrors"
import Modal from "./Modal"
import averageScore from "../services/averageScore"

const UserShow = (props) => {
  const [profile, setProfile] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    profileImage: "",
    golfRounds: [],
  })

  const [courses, setCourses] = useState([])
  const [errors, setErrors] = useState([])
  const [modal, setModal] = useState(false)

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

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/v1/courses")
      if (!response.ok) {
        const error = new Error(`${response.status} (${response.statusText})`)
        throw error
      }
      const responseBody = await response.json()
      setCourses(responseBody.courses)
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`)
    }
  }

  const postGolfRound = async (newRound) => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/golfRound`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newRound),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          setErrors(newErrors)
          return false
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
          return false
        }
      } else {
        const body = await response.json()
        const updatedGolfRounds = profile.golfRounds.concat(body.newGolfRound)
        setErrors([])
        setProfile({ ...profile, golfRounds: updatedGolfRounds })
        return true
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
      return false
    }
  }

  useEffect(() => {
    fetchProfile(), 
    fetchCourses()
  }, [])

  const toggleModal = () => {
    setModal(!modal)
  }

  let modalForm = ""
  if (modal) {
    modalForm = (
      <Modal
        postGolfRound={postGolfRound}
        courses={courses}
        errors={errors}
        toggleModal={toggleModal}
      />
    )
  }

  const golfRoundsByDate = profile.golfRounds.reverse()
  const golfRounds = golfRoundsByDate.map((round) => {
    return <GolfRoundTile key={round.id} round={round} courses={courses} />
  })

  let eighteenHoles = profile.golfRounds.filter((round) => round.holesPlayed === 18)
  let avgEighteenScore = averageScore(eighteenHoles)

  let nineHoles = profile.golfRounds.filter((round) => round.holesPlayed === 9)
  let avgNineScore = averageScore(nineHoles)

  return (
    <>
      <div className="user-show">
        <div className="user-info">
          <div className="profile-image-container">
            <img src={profile.profileImage} alt="profile picture" className="profile-image" />
          </div>
          <h1>{profile.userName}</h1>
          <h3>Average Score per 18 holes: {avgEighteenScore}</h3>
          <h3>Average Score per 9 holes: {avgNineScore}</h3>
        </div>
        <div className="golf-round-container">
          <div className="golf-rounds-header">
            <p><span className="golf">Golf</span><span className="rounds">Rounds</span></p>
            <button className="button add-round-button sign-button" onClick={toggleModal}>
              add new round
            </button>
          </div>

          <div className="golf-rounds">{golfRounds}</div>
        </div>
        <div>{modalForm}</div>
      </div>
    </>
  )
}

export default UserShow
