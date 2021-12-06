// import react from 'react'
// import axios from 'axios'

import { Modal } from 'react-bootstrap'
import Login from './Login'
import Register from './Register'
// import DjangoCSRFToken from 'django-react-csrftoken'

const LoginOrRegister = ({ setModalShow, modalShow, setLoginOrRegister, loginOrRegister }) => {
  
  

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
          {loginOrRegister === 'login' ? <Login setLoginOrRegister={setLoginOrRegister} setModalShow={setModalShow} /> : <Register setLoginOrRegister={setLoginOrRegister} setModalShow={setModalShow} />} 
          
            
            
            

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