
// import react from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
// import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'



const Register = ({ setModalShow }) => {

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

  // const [validated, setValidated] = useState(false)

  // const handleSubmiting = (event) => {
  //   const form = event.currentTarget
  //   if (form.checkValidity() === false) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }

  //   setValidated(true)
  // }

  return (
    <>
      {/* <Form noValidate validated={validated} onSubmit={handleSubmiting}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              name="first_name"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              name="surname"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              aria-describedby="inputGroupPrepend"
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errorData.username}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="validationCustomEmail">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              email
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form> */}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="first_name" placeholder="Enter first name" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Surname</Form.Label>
          <Form.Control type="text" name="surname" placeholder="Enter surname" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChange} />
          <Form.Control.Feedback type='invalid'>
            { errorData.username }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"  name="email" placeholder="Enter email" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" name="password_confirmation" placeholder="Password" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}



export default Register