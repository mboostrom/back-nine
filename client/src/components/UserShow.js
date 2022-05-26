import React from "react"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import GolfRoundTile from "./GolfRoundTile"
import translateServerErrors from "../services/translateServerErrors"
import Modal from "./Modal"
import averageScore from "../services/averageScore"
import Chart from "react-google-charts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlus,
  faRegular,
  faSquarePlus,
  faPencil,
  faFlag,
  faGolfBallTee,
} from "@fortawesome/free-solid-svg-icons"
import CourseModal from "./CourseModal"

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
  const [courseModal, setCourseModal] = useState(false)

  console.log(courses)

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

  const postGolfCourse = async (newCourse) => {
    try {
      const response = await fetch(`/api/v1/courses/new-course`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newCourse),
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
        const updatedGolfRounds = courses.concat(body.newGolfCourse)
        setErrors([])
        setCourses(updatedGolfRounds)
        return true
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
      return false
    }
  }

  useEffect(() => {
    fetchProfile(), fetchCourses()
  }, [])

  const toggleModal = () => {
    setModal(!modal)
  }

  const toggleCourseModal = () => {
    setCourseModal(!courseModal)
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

  let courseModalForm = ""
  if (courseModal) {
    courseModalForm = (
      <CourseModal
        postGolfCourse={postGolfCourse}
        errors={errors}
        toggleCourseModal={toggleCourseModal}
      />
    )
  }

  let oneHundred = []
  let ninety = []
  let eighty = []
  let seventy = []
  let sixtyEighteen = []

  profile.golfRounds.forEach((round) => {
    if (round.holesPlayed === 18 && round.score >= 100) {
      oneHundred.push(round)
    } else if (round.holesPlayed === 18 && round.score >= 90 && round.score <= 99) {
      ninety.push(round)
    } else if (round.holesPlayed === 18 && round.score >= 80 && round.score <= 89) {
      eighty.push(round)
    } else if (round.holesPlayed === 18 && round.score >= 70 && round.score <= 79) {
      seventy.push(round)
    } else if (round.holesPlayed === 18 && round.score >= 60 && round.score <= 69) {
      sixtyEighteen.push(round)
    }
  })

  let thirty = []
  let fourty = []
  let fifty = []
  let sixty = []

  profile.golfRounds.forEach((round) => {
    if (round.holesPlayed === 9 && round.score >= 60) {
      sixty.push(round)
    } else if (round.holesPlayed === 9 && round.score >= 50 && round.score <= 59) {
      fifty.push(round)
    } else if (round.holesPlayed === 9 && round.score >= 40 && round.score <= 49) {
      fourty.push(round)
    } else if (round.holesPlayed === 9 && round.score >= 30 && round.score <= 39) {
      thirty.push(round)
    }
  })

  const eighteenData = [
    ["Score", "amount of rounds"],
    ["100+", oneHundred.length],
    ["90 - 99", ninety.length],
    ["80 - 89", eighty.length],
    ["70 - 79", seventy.length],
    ["60 - 69", sixtyEighteen.length],
  ]

  const optionsEighteen = {
    title: "Scoring Percentages per 18 holes",
    is3D: true,
    colors: ["#8abc50", "#374108", "#6d7833", "#6BA03F", "#315A3A"],
    backgroundColor: "transparent",
    fontSize: 15,
    bold: true,
  }

  const nineData = [
    ["Score", "amount of rounds"],
    ["60+", sixty.length],
    ["50 - 59", fifty.length],
    ["40 - 49", fourty.length],
    ["30 - 39", thirty.length],
  ]

  const optionsNine = {
    title: "Scoring Percentages per 9 holes",
    is3D: true,
    colors: ["#8abc50", "#374108", "#6d7833", "#6BA03F", "#315A3A"],
    backgroundColor: "transparent",
    fontSize: 15,
    bold: true,
  }

  const golfRoundsByDate = profile.golfRounds.slice().reverse()
  const golfRounds = golfRoundsByDate.map((round) => {
    const course = courses.find(({ id }) => id === round.courseId)
    return <GolfRoundTile key={round.id} round={round} course={course} />
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
          <div className="profile-info">
            <div className="profile-header">
              <h1>
                {profile.userName}
                <Link to="/users/edit" title="Edit Profile">
                  <FontAwesomeIcon icon={faPencil} className="edit-icon" />
                </Link>
              </h1>
              <p>
                {profile.firstName} {profile.lastName}
              </p>
            </div>

            <h3 className="averages">Average Score per 18 holes: {avgEighteenScore}</h3>
            <h3 className="averages">Average Score per 9 holes: {avgNineScore}</h3>
          </div>
          <div className="chart-container">
            <div className="pie-chart">
              <Chart
                chartType="PieChart"
                data={eighteenData}
                options={optionsEighteen}
                width={"500px"}
                height={"300px"}
              />
            </div>
            <div className="pie-chart">
              <Chart
                chartType="PieChart"
                data={nineData}
                options={optionsNine}
                width={"500px"}
                height={"300px"}
              />
            </div>
          </div>
        </div>
        <div className="golf-round-container">
          <div className="golf-rounds-header">
            <p>
              <span className="golf">Golf</span>
              <span className="rounds">Rounds</span>
            </p>
            <div className="icons">
              <div class="new-course-container" onClick={toggleCourseModal} title="Add Course">
                <FontAwesomeIcon icon={faPlus} size="xl" className="add-course-icon" />
                <FontAwesomeIcon icon={faFlag} size="2x" className="add-course-icon" />
              </div>
              <div className="new-round-container" onClick={toggleModal} title="Add Round">
                <FontAwesomeIcon icon={faPlus} size="xl" className="add-round-icon" />
                <FontAwesomeIcon icon={faGolfBallTee} size="2x" className="add-round-icon" />
              </div>
            </div>
          </div>

          <div className="golf-rounds">{golfRounds}</div>
        </div>
        <div>{modalForm}</div>
        <div>{courseModalForm}</div>
      </div>
    </>
  )
}

export default UserShow
