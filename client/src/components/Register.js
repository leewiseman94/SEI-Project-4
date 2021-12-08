
// import react from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
// import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'



const Register = ({ setModalShow, setLoginOrRegister }) => {

  const [formData, setFormData] = useState({
    first_name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [errorData, setErrorData] = useState({
    first_name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log(newFormData)
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formData)
    try {
      await axios.post('http://localhost:8000/api/auth/register/', formData)
      handleResetForm()
      setLoginOrRegister('login')
    } catch (err) {
      console.log(err.response)
      setErrorData(err.response.data)
    }
  }

  const handleResetForm = () => {
    setFormData({
      first_name: '',
      surname: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    })
    setModalShow(false)
  }

  console.log(errorData)

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <FloatingLabel controlId="floatingInput" label="First name">
            <Form.Control type="text" name="first_name" placeholder="Enter first name" onChange={handleChange} required />
          </FloatingLabel>
          <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSurname">
          <FloatingLabel controlId="floatingInput" label="Surname">
            <Form.Control type="text" name="surname" placeholder="Enter surname" onChange={handleChange} required />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <FloatingLabel controlId="floatingInput" label="Username">
            <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChange} required />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel controlId="floatingInput" label="Email">
            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId="floatingInput" label="Password">
            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId="floatingInput" label="Password confirmation">
            <Form.Control type="password" name="password_confirmation" placeholder="Password" onChange={handleChange} required />
          </FloatingLabel>
        </Form.Group>
        <Button className="register-button" variant="primary" type="submit">
          Submit
        </Button>
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>Already got an account?
            <Button className="go-to-register-form" variant="primary" type="button" onClick={() => setLoginOrRegister('login')}>
              Click here
            </Button>
          </Form.Label>
        </Form.Group>
      </Form>
    </>
  )
}



export default Register