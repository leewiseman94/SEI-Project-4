// import react from 'react'
// import axios from 'axios'

import { Modal, Form, Button } from 'react-bootstrap'
import DjangoCSRFToken from 'django-react-csrftoken'

const LoginOrRegister = ({ setModalShow, modalShow, setLoginOrRegister, loginOrRegister }) => {



  const LoginForm = () => {
    return (
      <>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" />
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
      </>
    )
  }

  const RegisterForm = () => {
    return (
      <>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Surname</Form.Label>
          <Form.Control type="text" placeholder="Enter surname" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </>
    )
  }




  if (loginOrRegister === 'Hello') {
    setLoginOrRegister('check')


  }

  
  

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {/* <LoginForm /> */}
          <Modal.Title id="contained-modal-title-vcenter">
            {loginOrRegister === 'login' ? 'Login' : 'Register' } 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <DjangoCSRFToken />
            {loginOrRegister === 'login' ? <LoginForm /> : <RegisterForm /> }
            
            
            
          </Form>
        </Modal.Body>
      </Modal>
    )
  }


  // console.log(formData)

  return (
    <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
  )
}

export default LoginOrRegister