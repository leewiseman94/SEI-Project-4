import React from 'react'
import { Card, Row } from 'react-bootstrap'
// import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const FindVehicleCard = ({ sale }) => {

  return (
    <Link style={{ textDecoration: 'none', marginTop: '20px' }} to={`/vehicles/${sale.id}`}>
      <Card className="car-card box" style={{ width: '100%' }}>
        {sale.saleStatus === 'sold' && <div className="ribbon ribbon-top-right"><span>SOLD</span></div>}
        <div className="car-card-image-container" style={{ height: 'auto', backgroundImage: `url(${sale.car.images.length > 0 ? sale.car.images[0] : 'https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg'})` }}>
          <Card.Img variant="top" style={{ height: 'auto', opacity: '0' }} src='https://res.cloudinary.com/dd0uzkplv/image/upload/v1638798496/images_rueb7e.jpg' />
        </div>
        <Card.Body className="car-card-body">
          <Card.Title className="car-card-title">
            <strong>{`${sale.car.yearOfManufacture}`}</strong> {`${sale.car.make.name} ${sale.car.model.name}`}
          </Card.Title>
          <Card.Text className="car-card-text">
            {`${sale.car.modelVariation} ${sale.car.doors}dr`}
          </Card.Text>
          <Row>
            <div className="car-card-tags-container">
              <div className="car-card-tags">{sale.car.fuelType}</div>
              <div className="car-card-tags">{sale.car.mileage} miles</div>
              <div className="car-card-tags">{sale.car.gearbox}</div>
            </div>
          </Row>
          <Card.Title id="car-card-price">
            {`£${(Math.round(sale.price * 100) / 100).toLocaleString()}`}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
    
  )
}

export default FindVehicleCard