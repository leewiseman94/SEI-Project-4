import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { headers } from '../lib/Headers'
import { getUser } from './helpers/auth'
import { ImageUploadField } from './ImageUploadField'


const VehiclePlaceAdvert = () => {
  document.title = 'CarTrader | Place advert'
  const [searchingVehicle, setSearchingVehicle] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [vehicleNotFound, setVehicleNotFound] = useState(false)
  const [findVehicle, setFindVehicle] = useState({
    registrationNumber: '',
  })
  const [vehicleForm, setVehicleForm] = useState({
    make: '',
    model: '',
    modelVariation: '',
    images: [],
    registrationNumber: '',
    colour: '',
    engineCapacity: null,
    yearOfManufacture: null,
    bodyType: '',
    fuelType: '',
    mileage: null,
    gearbox: '',
    doors: null,
    seats: null,
  })
  const [salesForm, setSalesForm] = useState({
    saleStatus: 'forSale',
    car: null,
    seller: 1,
    buyer: null,
    price: null,
  })
  const [bodyTypesOptions, setBodyTypesOptions] = useState([])
  const [fuelTypesOptions, setFuelTypesOptions] = useState([])
  const [gearboxOptions, setGearboxOptions] = useState([])
  const [doorOptions, setDoorOptions] = useState([])
  const [seatOptions, setSeatOptions] = useState([])
  const [makeOptions, setMakeOptions] = useState([])
  const [modelOptions, setModelOptions] = useState([])
  const [vehicleData, setVehicleData] = useState([])
  const [vehicleDuplicate, setVehicleDuplicate] = useState(null)
  const history = useHistory()


  useEffect(() => {
    const getVehicles = async () => {
      const { data } = await axios.get('api/cars/')
      setVehicleData(data)
    }
    getVehicles()


    const getOptions = async () => {
      try {
        const { data } = await axios.get('/api/cars/choices')
        for (let i = 0; i < data.length; i++) {
          if (data[i][0] === 'bodyTypeOptions') setBodyTypesOptions(data[i][1])
          if (data[i][0] === 'fuelTypeOptions') setFuelTypesOptions(data[i][1])
          if (data[i][0] === 'gearboxOptions') setGearboxOptions(data[i][1])
          if (data[i][0] === 'doorOptions') setDoorOptions(data[i][1])
          if (data[i][0] === 'seatOptions') setSeatOptions(data[i][1])
        }
      } catch (err) {
        console.log(err)
      }

    }
    const getMakes = async () => {
      try {
        const { data } = await axios.get('/api/cars/makes/')
        setMakeOptions(data)
      } catch (err) {
        console.log(err)
      }
    }
    const getModels = async () => {
      try {
        const { data } = await axios.get('/api/cars/models/')
        setModelOptions(data)
      } catch (err) {
        console.log(err)
      }
    }
    getOptions()
    getMakes()
    getModels()

  }, [])


  const handleVehicleSearchChange = (event) => {
    if (event.target.name === 'registrationNumber') {
      setSearchingVehicle(false)
      setVehicleFound(false)
      setVehicleNotFound(false)
      const newFindVehicle = { ...findVehicle, [event.target.name]: event.target.value.toUpperCase() }
      setFindVehicle(newFindVehicle)
    }

    const newSalesForm = { ...salesForm, [event.target.name]: event.target.value }
    const newVehicleForm = { ...vehicleForm, [event.target.name]: event.target.value }
    if (event.target.name === 'price') {
      setSalesForm(newSalesForm)
    } else {
      setVehicleForm(newVehicleForm)
    }
  }

  const handlePlaceAdvert = async (event) => {
    event.preventDefault()
    try {
      const user = await getUser()
      const newSalesForm = salesForm
      newSalesForm.seller = user.id
      console.log(vehicleForm)
      if (!vehicleDuplicate) {
        const { data } = await axios.post('http://localhost:8000/api/cars/', vehicleForm, headers)
        newSalesForm.car = data.id
      } else {
        newSalesForm.car = vehicleDuplicate.id
      }
      console.log(newSalesForm)
      setSalesForm(newSalesForm)
      await axios.post('http://localhost:8000/api/sales/', newSalesForm, headers)
      history.push('/profile')
    } catch (err) {
      console.log(err)
    }
  }


  const handleVehicleSearch = async (event) => {
    setSearchingVehicle(true)
    event.preventDefault()
    setVehicleDuplicate(null)
    const filteredVehicles = vehicleData.filter(vehicle => vehicle.registrationNumber.toUpperCase() === findVehicle.registrationNumber.toUpperCase())
    console.log(filteredVehicles)
    if (filteredVehicles.length > 0) {
      setVehicleDuplicate(filteredVehicles[0])
      delete vehicleForm.make
      delete vehicleForm.model
      delete vehicleForm.modelVariation
      delete vehicleForm.colour
      delete vehicleForm.engineCapacity
      delete vehicleForm.yearOfManufacture
      delete vehicleForm.fuelType
      delete vehicleForm.bodyType
      delete vehicleForm.gearbox
      delete vehicleForm.doors
      delete vehicleForm.seats

      const newVehicleForm = {
        ...vehicleForm,
        make: filteredVehicles[0].make.id,
        model: filteredVehicles[0].model.id,
        modelVariation: filteredVehicles[0].modelVariation,
        colour: filteredVehicles[0].colour,
        engineCapacity: filteredVehicles[0].engineCapacity,
        yearOfManufacture: filteredVehicles[0].yearOfManufacture,
        fuelType: filteredVehicles[0].fuelType,
        bodyType: filteredVehicles[0].bodyType,
        gearbox: filteredVehicles[0].gearbox,
        doors: filteredVehicles[0].doors,
        seats: filteredVehicles[0].seats,
      }
      setVehicleForm(newVehicleForm)
      setSearchingVehicle(false)
      setVehicleFound(true)

    } else {
      try {
        const { data } = await axios.post('http://localhost:8000/api/cars/details/', findVehicle)
        console.log(data.errors)
        // if (data.errors) throw new Error()
        delete vehicleForm.make
        delete vehicleForm.model
        delete vehicleForm.modelVariation
        delete vehicleForm.colour
        delete vehicleForm.engineCapacity
        delete vehicleForm.yearOfManufacture
        delete vehicleForm.fuelType
        delete vehicleForm.bodyType
        delete vehicleForm.gearbox
        delete vehicleForm.doors
        delete vehicleForm.seats

        const newVehicleForm = {
          ...vehicleForm,
          make: makeOptions.filter((option) => data.make.toLowerCase() === option.name.toLowerCase())[0].id,
          colour: data.colour.slice(0, 1).toUpperCase() + data.colour.slice(1).toLowerCase(),
          engineCapacity: data.engineCapacity,
          yearOfManufacture: data.yearOfManufacture,
          fuelType: fuelTypesOptions.filter((option) => data.fuelType.toLowerCase().includes(option[0].toLowerCase()))[0][0],
          // data.fuelType.slice(0, 1).toUpperCase() + data.fuelType.slice(1).toLowerCase(),
        }
        // console.log(newVehicleForm)
        setVehicleForm(newVehicleForm)
        setSearchingVehicle(false)
        setVehicleFound(true)
      } catch (err) {
        console.log(err)
        setVehicleNotFound(true)
        setSearchingVehicle(false)
        setVehicleFound(false)
      }
    }
  }

  const toInputUppercase = e => {
    e.target.value = ('' + e.target.value).toUpperCase()
  }

  const handleImageUrl = (url) => {
    setVehicleForm({ ...vehicleForm, images: url })
  }

  const handleImageChange = (response) => {
    const newVehicleForm = {
      ...vehicleForm,
      images: response,
    }
    setVehicleForm(newVehicleForm)

  }

  return (
    <section className="main-section">
      <Container style={{ paddingTop: '80px' }}>
        <Row>
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Form style={{ margin: '0px 0', maxWidth: '900px', width: '100%' }} onSubmit={handleVehicleSearch}>
              <Container style={{ margin: '40px 0', width: '100%' }} className="place-advert-header">
                <div className="place-advert-step"><div className="place-advert-number-container">1</div><h4 className="place-advert-title">Vehicle Details</h4></div>
              </Container>
              <Row>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3" controlId="formBasicReg">
                    <FloatingLabel controlId="floatingInput" label="Enter registration">
                      <Form.Control onInput={toInputUppercase} type="text" name="registrationNumber" placeholder="Enter registration" onChange={handleVehicleSearchChange} required />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3" controlId="formBasicMileage">
                    <FloatingLabel controlId="floatingInput" label="Enter mileage">
                      <Form.Control type="number" name="mileage" placeholder="Enter mileage" onChange={handleVehicleSearchChange} required />
                    </FloatingLabel>
                    <Form.Text>Please make sure mileage is accurate!</Form.Text>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Button className="place-advert-find-car-button" variant="primary" type="submit">
                    Find details
                  </Button>
                </Col>
              </Row>

            </Form>
          </Container>

        </Row>
        {(!searchingVehicle && vehicleFound) ?
          <Row>
            <Container className="place-advert-header">
              <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Form className="place-advert-form" style={{ marginTop: '10px', maxWidth: '900px', width: '100%' }} onSubmit={handlePlaceAdvert}>
                  <Row>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="formBasicMake">
                        <FloatingLabel controlId="floatingSelect" label="Make">
                          <Form.Select aria-label="Select make" name="make" onChange={handleVehicleSearchChange} required defaultValue={vehicleForm.make ? vehicleForm.make : ''} disabled>
                            <option value="" disabled>Select a make</option>
                            {makeOptions.map((makes) => {
                              return <option key={makes.id} value={makes.id}>{makes.name}</option>
                            })}
                          </Form.Select>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="formBasicModel">
                        <FloatingLabel controlId="floatingSelect" label="Model">
                          <Form.Select aria-label="Select model" name="model" onChange={handleVehicleSearchChange} required defaultValue={vehicleForm.model ? vehicleForm.model : ''}>
                            <option value="" disabled>Select a model</option>
                            {modelOptions.map((model) => {
                              return vehicleForm.make === model.make && <option key={model.id} value={model.id}>{model.name}</option>
                            })}
                          </Form.Select>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="formBasicModelVariation">
                        <FloatingLabel controlId="floatingInputModel" label="Model variation">
                          <Form.Control defaultValue={vehicleForm.modelVariation} type="text" name="modelVariation" placeholder="Enter model variation" onChange={handleVehicleSearchChange} required />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="formBasicColour">
                        <FloatingLabel controlId="floatingInput" label="Colour">
                          <Form.Control defaultValue={vehicleForm.colour} type="text" name="colour" placeholder="Enter colour" onChange={handleVehicleSearchChange} required disabled />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="formBasicEngineCapacity">
                        <FloatingLabel controlId="floatingInput" label="Engine capacity">
                          <Form.Control defaultValue={vehicleForm.engineCapacity} type="number" name="engineCapacity" placeholder="Enter engine capacity" onChange={handleVehicleSearchChange} required disabled />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="formBasicYear">
                        <FloatingLabel controlId="floatingInput" label="Year of manufacture">
                          <Form.Control defaultValue={vehicleForm.yearOfManufacture} type="number" name="yearOfManufacture" placeholder="Enter year of manufacture" onChange={handleVehicleSearchChange} required disabled />
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="formBasicFuelType">
                        <FloatingLabel controlId="floatingSelect" label="Fuel type">
                          <Form.Select aria-label="Select fuel type" name="fuelType" onChange={handleVehicleSearchChange} required disabled
                            defaultValue={vehicleForm.fuelType ? fuelTypesOptions.filter((option) => vehicleForm.fuelType.toLowerCase().includes(option[0].toLowerCase()))[0][0] : ''}>
                            <option value="" disabled>Select a fuel type</option>
                            {fuelTypesOptions.map((fuelType) => {
                              return <option key={fuelType[0]} value={fuelType[0]}>{fuelType[0]}</option>
                            })}
                          </Form.Select>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="formBasicBodyType">
                        <FloatingLabel controlId="floatingSelect" label="Body type">
                          <Form.Select aria-label="Select body type" name="bodyType" onChange={handleVehicleSearchChange} required
                            defaultValue={vehicleForm.bodyType ? bodyTypesOptions.filter((option) => option[0].toLowerCase() === vehicleForm.bodyType.toLowerCase())[0][0] : ''}>
                            <option value="" disabled>Select a body type</option>
                            {bodyTypesOptions.map((bodyType) => {
                              return <option key={bodyType[0]} value={bodyType[0]}>{bodyType[0]}</option>
                            })}
                          </Form.Select>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="formBasicGearbox">
                        <FloatingLabel controlId="floatingSelect" label="Gearbox">
                          <Form.Select aria-label="Select gearbox" name="gearbox" onChange={handleVehicleSearchChange} required
                            defaultValue={vehicleForm.gearbox ? gearboxOptions.filter((option) => option[0].toLowerCase() === vehicleForm.gearbox.toLowerCase())[0][0] : ''}>
                            <option value="" disabled>Select a gearbox type</option>
                            {gearboxOptions.map((gearbox) => {
                              return <option key={gearbox[0]} value={gearbox[0]}>{gearbox[0]}</option>
                            })}
                          </Form.Select>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6} md={3}>
                      <Form.Group className="mb-3" controlId="formBasicDoors">
                        <FloatingLabel controlId="floatingSelect" label="Doors">
                          <Form.Select aria-label="Select doors" name="doors" onChange={handleVehicleSearchChange} required
                            defaultValue={vehicleForm.doors ? doorOptions.filter((option) => vehicleForm.doors === option[0])[0] : ''}>
                            <option value="" disabled>Select doors</option>
                            {doorOptions.map((doors) => {
                              return <option key={doors[0]} value={doors[0]}>{doors[0]}</option>
                            })}
                          </Form.Select>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={6} md={3}>
                      <Form.Group className="mb-3" controlId="formBasicSeats">
                        <FloatingLabel controlId="floatingSelect" label="Seats">
                          <Form.Select aria-label="Select seats" name="seats" onChange={handleVehicleSearchChange} required
                            defaultValue={vehicleForm.seats ? doorOptions.filter((option) => vehicleForm.seats === option[0])[0] : ''}>
                            <option value="" disabled>Select seats</option>
                            {seatOptions.map((seats) => {
                              return <option key={seats[0]} value={seats[0]}>{seats[0]}</option>
                            })}
                          </Form.Select>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3" controlId="formBasicDoors">
                        <ImageUploadField
                          value={vehicleForm.images}
                          name="image"
                          handleImageUrl={handleImageUrl}
                          handleImageChange={handleImageChange}
                        />
                      </Form.Group>
                    </Col>

                  </Row>
                  <Row>
                    <Col sm={12} style={{ margin: '20px 0', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
                      Details not correct? Please check the registration number!
                    </Col>
                  </Row >
                  <Container style={{ margin: '40px 0', width: '100%' }} className="place-advert-header">
                    <div className="place-advert-step"><div className="place-advert-number-container">2</div><h4 className="place-advert-title">Advert Details</h4></div>
                  </Container>
                  <Row>
                    <Col sm={12} md={8}>
                      <Form.Group className="mb-3" controlId="formBasicPrice">
                        <FloatingLabel controlId="floatingInput" label="Sale Price £">
                          <Form.Control type="number" name="price" placeholder="Enter price" onChange={handleVehicleSearchChange} required />
                        </FloatingLabel>
                        <Form.Text></Form.Text>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Button className="place-advert-find-car-button" variant="primary" type="submit">
                        Place advert
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </Container>
          </Row>
          : vehicleNotFound ?
            <Row>
              <Container style={{ paddingTop: '30px', textAlign: 'center', color: 'red' }}>
                Vehicle not found. Please try again!
              </Container>
            </Row>
            : searchingVehicle &&
            <Row>
              <Container style={{ paddingTop: '30px', textAlign: 'center' }}>
                <Spinner animation="border" />
              </Container>
            </Row>
        }

      </Container>
      <section style={{ marginTop: '80px', paddingBottom: '0px' }}>

        <Container className="home-section-1 align-items-center">
          <Row>
            <Col md lg="8">
              <img className="fourteen-day-image" src={'https://res.cloudinary.com/dd0uzkplv/image/upload/v1638868601/toyota-corolla-blue_1x_ikrj7u.png'} />
            </Col>
            <Col md lg="4">
              <h5 className="text-left">Advertise to millions</h5>
              <h6 className="text-left">Free online valuation</h6>
              <p>
                Our powerful valuation tool helps you to price your car competitively so you can make sure you arere getting a fair price. 
                We will guide you through creating your advert and give helpful tips to make it stand out.
              </p>
              <Button className="fourteen-day-button">Find out more</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  )
}


export default VehiclePlaceAdvert