import React from "react"
import { useState } from "react"
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
      } else {
        const body = await response.json()
        setEditedProfile({ body })
        return true
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
      return false
    }
  }

  if (shouldRedirect) {
    location.href = "/"
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const body = new FormData()
    body.append("firstName", editedProfile.firstName)
    body.append("lastName", editedProfile.lastName)
    body.append("profileImage", editedProfile.profileImage)
    const result = editUserProfile(body)
    if (result) {
      setShouldRedirect(true)
    }
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
                placeholder="First Name"
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
          <p>Profile Picture</p>
          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Upload a profile picture here - drag 'n' drop or click to upload</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="profile-image-container">
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
