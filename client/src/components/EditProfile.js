import React from "react"
import { useState } from "react"
import { Redirect } from "react-router-dom"
import Dropzone from "react-dropzone"

const EditProfile = (props) => {
  const [editedProfile, setEditedProfile] = useState({
    firstName: "",
    lastName: "",
    profileImage: {},
  })

  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [uploadedImage, setUploadedImage] = useState({
    preview: "",
  })
  const [errors, setErrors] = useState([])

  const handleChange = (event) => {
    event.preventDefault()
    setEditedProfile({
      ...editedProfile,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleImageUpload = (acceptedImage) => {
    setEditedProfile({
      ...editedProfile,
      profileImage: acceptedImage[0],
    })

    setUploadedImage({
      preview: URL.createObjectURL(acceptedImage[0]),
    })
  }

  const editUserProfile = async (profileBody) => {
    console.log("profile body", profileBody)
    try {
      const response = await fetch("/api/v1/users/edit", {
        method: "PATCH",
        headers: {
          Accept: "image/jpeg",
        },
        body: profileBody,
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      } 
        setShouldRedirect(true)
    } catch (error) {
      console.log(error)
      console.error(`Error in fetch: ${error.message}`)
      return false
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const body = new FormData()
    body.append("firstName", editedProfile.firstName)
    body.append("lastName", editedProfile.lastName)
    body.append("profileImage", editedProfile.profileImage)
    
    editUserProfile(body)
  }

  if (shouldRedirect) {
    return <Redirect push to={`/users/${props.currentUser.id}`} />
  }

  return (
    <div className="sign-container">
      <div className="edit-left"></div>
      <div className="sign-form">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <input
                type="text"
                name="firstName"
                value={editedProfile.firstName}
                onChange={handleChange}
                placeholder='First Name'
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="text"
                name="lastName"
                value={editedProfile.lastName}
                onChange={handleChange}
                placeholder="last Name"
              />
            </label>
          </div>
          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p><span className="add-picture">Add Profile Picture</span></p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="profile-image-preview">
            <img src={uploadedImage.preview} className="profile-image" />
          </div>
          <div>
            <input type="submit" className="button sign-button" value="continue" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
