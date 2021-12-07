import React from 'react'
import { Card } from 'react-bootstrap'
// import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const FindVehicleCard = ({ vehicle }) => {

  return (
    <Link to={`/vehicles/${vehicle.id}`}>
      <Card style={{ width: '100%' }} className="mx-1 my-3">
        <Card.Img variant="top" style={{ height: 'auto' }} src={vehicle.images.length > 0 ? vehicle.images[0] : 'https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg' } />
        <Card.Body>
          <Card.Title>
            <strong>{`${vehicle.yearOfManufacture}`}</strong> {`${vehicle.make.name} ${vehicle.model.name}`}
          </Card.Title>
          <Card.Text>
            {`${vehicle.modelVariation} ${vehicle.doors}dr`}
          </Card.Text>
          <Card.Header>
            {`£${(Math.round(vehicle.price * 100) / 100).toLocaleString()}`}
          </Card.Header>
        </Card.Body>
      </Card>
    </Link>
    
  )
}

export default FindVehicleCard