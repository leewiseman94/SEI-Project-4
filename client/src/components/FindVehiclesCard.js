import React from 'react'
import { Card } from 'react-bootstrap'

const FindVehicleCard = ({ vehicle }) => {


  return (
    <Card style={{ width: '100%' }} className="mx-1 my-3">
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          {vehicle}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default FindVehicleCard