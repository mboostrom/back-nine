import React from "react"
import GolfCourseForm from "./GolfCourseForm"

const CourseModal = (props) => {
  return (
    <div className="modal-container" onClick={props.toggleCourseModal}>
      <div className="modal-body" onClick={event => event.stopPropagation()}>
        <div className="close">
          <p onClick={props.toggleCourseModal}>X</p>
        </div>
        <div className="modal-form">
          <GolfCourseForm
            postGolfCourse={props.postGolfCourse}
            errors={props.errors}
            toggleCourseModal={props.toggleCourseModal}
          />
        </div>
      </div>
    </div>
  )
}

export default CourseModal