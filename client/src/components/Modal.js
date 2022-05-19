import React from "react"
import NewRoundForm from "./newRoundForm"

const Modal = (props) => {
  return (
    <div className="modal-container">
      <div className="modal-body">
        <div className="close">
          <p onClick={props.toggleModal}>X</p>
        </div>
        <div className="modal-form">
          <NewRoundForm
            postGolfRound={props.postGolfRound}
            courses={props.courses}
            errors={props.errors}
            toggleModal={props.toggleModal}
          />
        </div>
      </div>
    </div>
  )
}

export default Modal
