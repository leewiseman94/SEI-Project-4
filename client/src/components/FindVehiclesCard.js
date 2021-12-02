import React from 'react'
import { Card } from 'react-bootstrap'

const FindVehicleCard = ({ vehicle }) => {


  return (
    <Card style={{ width: '100%' }} className="mx-1 my-3">
      <Card.Img variant="top" src={vehicle.images[0]} />
      <Card.Body>
        <Card.Title>
          <strong>{`${vehicle.yearOfManufacture}`}</strong> {`${vehicle.make.name} ${vehicle.model.name}`}
        </Card.Title>
        <Card.Text>
          {`${vehicle.doors} dr`}
        </Card.Text>
        
      </Card.Body>
    </Card>
  )
}

export default FindVehicleCard