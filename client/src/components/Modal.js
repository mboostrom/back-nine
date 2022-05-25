import React from "react"
import NewRoundForm from "./NewRoundForm"

const Modal = (props) => {
  return (
    <div className="modal-container" onClick={props.toggleModal}>
      <div className="modal-body" onClick={event => event.stopPropagation()}>
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
