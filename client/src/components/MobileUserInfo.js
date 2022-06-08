import React from "react"
import { Link } from "react-router-dom"
import Chart from "react-google-charts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"

const MobileUserInfo = (props) => {
  const optionsEighteen = {
    title: "Scoring per 18 holes",
    is3D: true,
    colors: ["#8abc50", "#374108", "#6d7833", "#6BA03F", "#315A3A"],
    backgroundColor: "transparent",
    fontSize: 8,
    bold: false,
  }

  const optionsNine = {
    title: "Scoring per 9 holes",
    is3D: true,
    colors: ["#8abc50", "#374108", "#6d7833", "#6BA03F", "#315A3A"],
    backgroundColor: "transparent",
    fontSize: 8,
    bold: false,
  }

  return (
    <div className="mobile-user-info">
      <div className="mobile-profile-left">
        <div className="mobile-picture-header">
          <div className="profile-image-container">
            <img src={props.profile.profileImage} alt="profile picture" className="profile-image" />
          </div>
          <div className="mobile-profile-header">
            <h1>
              {props.profile.userName}
              <Link to="/users/edit" title="Edit Profile">
                <FontAwesomeIcon icon={faPencil} className="edit-icon" />
              </Link>
            </h1>
            <p>
              {props.profile.firstName} {props.profile.lastName}
            </p>
          </div>
        </div>
        <div className="averages-container">
        <h3 className="averages">
          avg 18: <span>{props.avgEighteenScore}</span>
        </h3>
        <h3 className="averages">
          avg 9: <span>{props.avgNineScore}</span>
        </h3>
        </div>
      </div>
      <div className="mobile-chart-container">
        <div className="pie-chart">
          <Chart
            chartType="PieChart"
            data={props.eighteenData}
            options={optionsEighteen}
            width={"225px"}
            height={"150px"}
          />
        </div>
        <div className="pie-chart">
          <Chart
            chartType="PieChart"
            data={props.nineData}
            options={optionsNine}
            width={"225px"}
            height={"150px"}
          />
        </div>
      </div>
    </div>
  )
}

export default MobileUserInfo
