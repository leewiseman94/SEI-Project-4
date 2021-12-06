// import react from 'react'
// import axios from 'axios'

import axios from 'axios'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
// import DjangoCSRFToken from 'django-react-csrftoken'
const Login = ({ setModalShow, setLoginOrRegister }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState(false)

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log(newFormData)
    setFormData(newFormData)
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formData)
    try {
      const { data } = await axios.post('http://localhost:8000/api/auth/login/', formData)
      setModalShow(false)
      setTokenToLocalStorage(data.token)
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  console.log(error)
  return (
    <>
      <Form noValidate validated={error} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" name="email" placeholder="Enter email" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" name="password" placeholder="Password" onChange={handleChange}/>
        </Form.Group>
        <Form.Group hasValidation>
          <Form.Control.Feedback type="invalid">
            Incorrect email or password
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Need to create an account?</Form.Label>
          <Button variant="primary" type="button" onClick={() => setLoginOrRegister('register')}>
            Click here
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default Login