
import React from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
// const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
// const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET


export const ImageUploadField = ({ handleImageUrl, handleImageChange }) => {
  let fileArray = []

  const handleUpload = async event => {
    fileArray = []
    for (let i = 0; i < event.target.files.length; i++) {
      const data = new FormData()
      data.append('file', event.target.files[i])
      data.append('upload_preset', 'lhk56zgk')
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dd0uzkplv/image/upload', data)
        handleImageUrl(response.data.url)
        fileArray.push(response.data.url)
      } catch (err) {
        console.log(err)
      }
    }
    handleImageChange(fileArray)
    
  }
  return (
    <>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Control type="file" onChange={handleUpload}  multiple required />
        <Form.Text>Upload at least 4 images</Form.Text>
      </Form.Group>
    </>
  )
}