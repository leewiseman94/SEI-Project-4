import React, { useEffect, useState } from 'react'
import { Accordion, Row, Col, Form, Button, Offcanvas, Container, NavLink } from 'react-bootstrap'
import FindVehicleCard from './FindVehiclesCard.js'
import axios from 'axios'
import * as QueryString from 'query-string'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'


const FindVehicles = () => {

  const [vehicles, setVehicles] = useState([])
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [makes, setMakes] = useState([])
  const [models, setModels] = useState([])
  const [minPrice, setMinPrice] = useState([])
  const [maxPrice, setMaxPrice] = useState([])
  const [miles, setMiles] = useState([])
  const [bodyTypesOptions, setBodyTypesOptions] = useState([])
  const [fuelTypesOptions, setFuelTypesOptions] = useState([])
  const [gearboxOptions, setGearboxOptions] = useState([])
  const [doorOptions, setDoorOptions] = useState([])
  const [seatOptions, setSeatOptions] = useState([])
  const [ageFilters, setAgeFilters] = useState([])
  const props = useLocation()
  const history = useHistory()
  const params = QueryString.parse(props.search)
  const [query, setQuery] = useState(QueryString.parse(props.search))

  
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    const getVehicleData = async () => {
      const vehicleData = await axios.get('/api/cars/')
      const allVehicles = vehicleData.data
      setVehicles(allVehicles)

      // * Set Filtered Vehicles depending on query string
      const filtered = allVehicles.filter(vehicle => {

        if (params.doors) console.log(params.doors.includes(vehicle.doors))
        console.log(vehicle.doors)
        return (
          (params.make ? params.make.toLowerCase() === vehicle.make.name.toLowerCase() || params.make.toLowerCase() === 'any' : vehicle ) &&
          (params.model ? params.model.toLowerCase() === vehicle.model.name.toLowerCase() || params.model.toLowerCase() === 'any' : vehicle ) &&
          (params.minPrice ? params.minPrice <= vehicle.price || params.minPrice.toLowerCase() === 'any' : vehicle ) &&
          (params.maxPrice ? params.maxPrice >= vehicle.price || params.maxPrice.toLowerCase() === 'any' : vehicle ) && 
          (params.minYear ? params.minYear <= vehicle.yearOfManufacture || params.minYear.toLowerCase() === 'any' : vehicle ) && 
          (params.maxYear ? params.maxYear >= vehicle.yearOfManufacture || params.maxYear.toLowerCase() === 'any' : vehicle ) &&
          (params.maxMiles ? params.maxMiles >= vehicle.mileage || params.maxMiles.toLowerCase() === 'any' : vehicle ) &&
          (params.bodyType ? params.bodyType.toLowerCase().includes(vehicle.bodyType.toLowerCase()) || params.bodyType.toLowerCase() === 'any' : vehicle ) &&
          (params.fuelType ? params.fuelType.toLowerCase().includes(vehicle.fuelType.toLowerCase()) || params.fuelType.toLowerCase() === 'any' : vehicle ) &&
          (params.gearbox ? params.gearbox.toLowerCase().includes(vehicle.gearbox.toLowerCase()) || params.gearbox.toLowerCase() === 'any' : vehicle ) &&
          (params.doors ? params.doors.includes(vehicle.doors) || params.doors.toLowerCase() === 'any' : vehicle ) &&
          (params.seats ? params.seats.includes(vehicle.seats) || params.seats.toLowerCase() === 'any' : vehicle )
        )
      })

      // * SET ALL FILTER OPTIONS
      const makesArray = ['Any']
      const modelsArray = ['Any']
      const year = new Date().getFullYear()
      let oldYear = year
      for (let i = 0; i < allVehicles.length; i++) {
        if (!makesArray.includes(allVehicles[i].make.name)) makesArray.push(allVehicles[i].make.name)
        if (!modelsArray.includes(allVehicles[i].model.name)) modelsArray.push(allVehicles[i].model.name)
        if (parseInt(allVehicles[i].yearOfManufacture) < parseInt(oldYear)) oldYear = parseInt(allVehicles[i].yearOfManufacture)
      }
      setMakes(makesArray)
      setModels(modelsArray)
      setMinPrice(['Any',500,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,12500,15000,17500,20000,25000])
      setMaxPrice(['Any',1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,12500,15000,17500,20000,30000,40000,50000])
      setMiles(['Any',5000,10000,20000,30000,40000,50000,60000,70000,80000])
      const ageFiltersArray = ['Any']
      for (let i = oldYear; i <= year; i++) {
        ageFiltersArray.push(i)
      }
      setAgeFilters(ageFiltersArray)
      const getOptions = async () => {
        console.log('Testing')
        const options = await axios.get('/api/cars/choices')
        return options.data
      }

      const choices = await getOptions()
      
      console.log(choices)
      for (let i = 0; i < choices.length; i++) {
        if (choices[i][0] === 'bodyTypeOptions') setBodyTypesOptions(choices[i][1])
        if (choices[i][0] === 'fuelTypeOptions') setFuelTypesOptions(choices[i][1])
        if (choices[i][0] === 'gearboxOptions') setGearboxOptions(choices[i][1])
        if (choices[i][0] === 'doorOptions') setDoorOptions(choices[i][1])
        if (choices[i][0] === 'seatOptions') setSeatOptions(choices[i][1])
      }

      setFilteredVehicles(filtered)
    }
    getVehicleData()
  }, [props])


  const filterChange = (event) => {
    event.preventDefault()
    const queryParams = QueryString.parse(props.search)
    if (event.target.value === 'Any' || event.target.value === 'any') {
      if (event.target.id === 'filter-make') { 
        delete queryParams.make
        delete queryParams.model 
      }
      if (event.target.id === 'filter-model') delete queryParams.model
      if (event.target.id === 'filter-min-price') delete queryParams.minPrice
      if (event.target.id === 'filter-max-price') delete queryParams.maxPrice
      if (event.target.id === 'filter-min-year') delete queryParams.minYear
      if (event.target.id === 'filter-max-year') delete queryParams.maxYear
      if (event.target.id === 'filter-max-miles') delete queryParams.maxMiles
      if (event.target.id === 'filter-body-type') delete queryParams.bodyType
      if (event.target.id === 'filter-fuel-type') delete queryParams.fuelType
      if (event.target.id === 'filter-gearbox') delete queryParams.gearbox
      if (event.target.id === 'filter-doors') delete queryParams.doors
      if (event.target.id === 'filter-seats') delete queryParams.seats

    } else {

      if (event.target.id === 'filter-make') {
        queryParams.make = `${event.target.value.toLowerCase()}`
        delete queryParams.model
      }
      if (event.target.id === 'filter-model') queryParams.model = `${event.target.value.toLowerCase()}`
      if (event.target.id === 'filter-min-price') queryParams.minPrice = `${event.target.value}`
      if (event.target.id === 'filter-max-price') queryParams.maxPrice = `${event.target.value}`
      if (event.target.id === 'filter-min-year') queryParams.minYear = `${event.target.value}`
      if (event.target.id === 'filter-max-year') queryParams.maxYear = `${event.target.value}`
      if (event.target.id === 'filter-max-miles') queryParams.maxMiles = `${event.target.value}`
      if (queryParams.bodyType && event.target.checked && event.target.id === 'filter-body-type') queryParams.bodyType = queryParams.bodyType + ',' + event.target.value.toLowerCase()
      if (!queryParams.bodyType && event.target.checked && event.target.id === 'filter-body-type') queryParams.bodyType = event.target.value.toLowerCase()
      if (queryParams.bodyType && !event.target.checked && event.target.id === 'filter-body-type') {
        console.log(queryParams.bodyType.includes(',' + event.target.value.toLowerCase()))
        console.log(queryParams.bodyType)
        console.log(',' + event.target.value.toLowerCase())
        if (queryParams.bodyType.includes(',' + event.target.value.toLowerCase())) {
          queryParams.bodyType = queryParams.bodyType.replace(',' + event.target.value.toLowerCase(), '')
        } else if (queryParams.bodyType.includes(event.target.value.toLowerCase() + ',')) {
          queryParams.bodyType = queryParams.bodyType.replace(event.target.value.toLowerCase() + ',', '')
        } else {
          delete queryParams.bodyType
        }
      }
      if (queryParams.fuelType && event.target.checked && event.target.id === 'filter-fuel-type') queryParams.fuelType = queryParams.fuelType + ',' + event.target.value.toLowerCase()
      if (!queryParams.fuelType && event.target.checked && event.target.id === 'filter-fuel-type') queryParams.fuelType = event.target.value.toLowerCase()
      if (queryParams.fuelType && !event.target.checked && event.target.id === 'filter-fuel-type') {
        if (queryParams.fuelType.includes(',' + event.target.value.toLowerCase())) {
          queryParams.fuelType = queryParams.fuelType.replace(',' + event.target.value.toLowerCase(), '')
        } else if (queryParams.fuelType.includes(event.target.value.toLowerCase() + ',')) {
          queryParams.fuelType = queryParams.fuelType.replace(event.target.value.toLowerCase() + ',', '')
        } else {
          delete queryParams.fuelType
        }
      }
      if (queryParams.gearbox && event.target.checked && event.target.id === 'filter-gearbox') queryParams.gearbox = queryParams.gearbox + ',' + event.target.value.toLowerCase()
      if (!queryParams.gearbox && event.target.checked && event.target.id === 'filter-gearbox') queryParams.gearbox = event.target.value.toLowerCase()
      if (queryParams.gearbox && !event.target.checked && event.target.id === 'filter-gearbox') {
        if (queryParams.gearbox.includes(',' + event.target.value.toLowerCase())) {
          queryParams.gearbox = queryParams.gearbox.replace(',' + event.target.value.toLowerCase(), '')
        } else if (queryParams.gearbox.includes(event.target.value.toLowerCase() + ',')) {
          queryParams.gearbox = queryParams.gearbox.replace(event.target.value.toLowerCase() + ',', '')
        } else {
          delete queryParams.gearbox
        }
      }
      if (queryParams.doors && event.target.checked && event.target.id === 'filter-doors') queryParams.doors = queryParams.doors + ',' + event.target.value.toLowerCase()
      if (!queryParams.doors && event.target.checked && event.target.id === 'filter-doors') queryParams.doors = event.target.value.toLowerCase()
      if (queryParams.doors && !event.target.checked && event.target.id === 'filter-doors') {
        if (queryParams.doors.includes(',' + event.target.value.toLowerCase())) {
          queryParams.doors = queryParams.doors.replace(',' + event.target.value.toLowerCase(), '')
        } else if (queryParams.doors.includes(event.target.value.toLowerCase() + ',')) {
          queryParams.doors = queryParams.doors.replace(event.target.value.toLowerCase() + ',', '')
        } else {
          delete queryParams.doors
        }
      }
      if (queryParams.seats && event.target.checked && event.target.id === 'filter-seats') queryParams.seats = queryParams.seats + ',' + event.target.value.toLowerCase()
      if (!queryParams.seats && event.target.checked && event.target.id === 'filter-seats') queryParams.seats = event.target.value.toLowerCase()
      if (queryParams.seats && !event.target.checked && event.target.id === 'filter-seats') {
        if (queryParams.seats.includes(',' + event.target.value.toLowerCase())) {
          queryParams.seats = queryParams.seats.replace(',' + event.target.value.toLowerCase(), '')
        } else if (queryParams.seats.includes(event.target.value.toLowerCase() + ',')) {
          queryParams.seats = queryParams.seats.replace(event.target.value.toLowerCase() + ',', '')
        } else {
          delete queryParams.seats
        }
      }

    }
    
    setQuery(queryParams)
  } 

  const filterCount = (filterKey, filterValue) => {

    const withoutCurrentParams = { ...params }
    if (filterKey === 'make') {
      delete withoutCurrentParams.make
      delete withoutCurrentParams.model
    }
    if (filterKey === 'model') delete withoutCurrentParams.model
    if (filterKey === 'minPrice') delete withoutCurrentParams.minPrice
    if (filterKey === 'maxPrice') delete withoutCurrentParams.maxPrice
    if (filterKey === 'minYear') delete withoutCurrentParams.minYear
    if (filterKey === 'maxYear') delete withoutCurrentParams.maxYear
    if (filterKey === 'maxMiles') delete withoutCurrentParams.maxMiles
    if (filterKey === 'bodyType') delete withoutCurrentParams.bodyType
    if (filterKey === 'fuelType') delete withoutCurrentParams.fuelType
    if (filterKey === 'gearbox') delete withoutCurrentParams.gearbox
    if (filterKey === 'doors') delete withoutCurrentParams.doors
    if (filterKey === 'seats') delete withoutCurrentParams.seats

    const filtered = vehicles.filter(vehicle => {
      return (
        (withoutCurrentParams.make ? withoutCurrentParams.make.toLowerCase() === vehicle.make.name.toLowerCase() || withoutCurrentParams.make.toLowerCase() === 'any' : vehicle ) &&
        (withoutCurrentParams.model ? withoutCurrentParams.model.toLowerCase() === vehicle.model.name.toLowerCase() || withoutCurrentParams.model.toLowerCase() === 'any' : vehicle ) &&
        (withoutCurrentParams.minPrice ? withoutCurrentParams.minPrice <= vehicle.price || withoutCurrentParams.minPrice.toLowerCase() === 'any' : vehicle ) &&
        (withoutCurrentParams.maxPrice ? withoutCurrentParams.maxPrice >= vehicle.price || withoutCurrentParams.maxPrice.toLowerCase() === 'any' : vehicle ) && 
        (withoutCurrentParams.minYear ? withoutCurrentParams.minYear <= vehicle.yearOfManufacture || withoutCurrentParams.minYear.toLowerCase() === 'any' : vehicle ) && 
        (withoutCurrentParams.maxYear ? withoutCurrentParams.maxYear >= vehicle.yearOfManufacture || withoutCurrentParams.maxYear.toLowerCase() === 'any' : vehicle ) &&
        (withoutCurrentParams.maxMiles ? withoutCurrentParams.maxMiles >= vehicle.mileage || withoutCurrentParams.maxMiles.toLowerCase() === 'any' : vehicle ) &&
        (withoutCurrentParams.bodyType ? withoutCurrentParams.bodyType.toLowerCase().includes(vehicle.bodyType.toLowerCase()) || withoutCurrentParams.bodyType.toLowerCase() === 'any' : vehicle ) && 
        (withoutCurrentParams.fuelType ? withoutCurrentParams.fuelType.toLowerCase().includes(vehicle.fuelType.toLowerCase()) || withoutCurrentParams.fuelType.toLowerCase() === 'any' : vehicle ) &&
        (withoutCurrentParams.gearbox ? withoutCurrentParams.gearbox.toLowerCase().includes(vehicle.gearbox.toLowerCase()) || withoutCurrentParams.gearbox.toLowerCase() === 'any' : vehicle ) &&
        (withoutCurrentParams.doors ? withoutCurrentParams.doors.toLowerCase().includes(vehicle.doors) || withoutCurrentParams.doors.toLowerCase() === 'any' : vehicle ) &&
        (withoutCurrentParams.seats ? withoutCurrentParams.seats.toLowerCase().includes(vehicle.seats) || withoutCurrentParams.seats.toLowerCase() === 'any' : vehicle )
      )
    })

    const count = filtered.filter(vehicle => {
      if (filterKey === 'make') return filterValue === vehicle.make.name || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'model') return filterValue === vehicle.model.name || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'minPrice') return filterValue <= vehicle.price || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'maxPrice') return filterValue >= vehicle.price || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'minYear') return filterValue <= vehicle.yearOfManufacture || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'maxYear') return filterValue >= vehicle.yearOfManufacture || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'maxMiles') return filterValue >= vehicle.mileage || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'bodyType') return filterValue === vehicle.bodyType || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'fuelType') return filterValue === vehicle.fuelType || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'gearbox') return filterValue === vehicle.gearbox || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'doors') return filterValue === vehicle.doors || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'seats') return filterValue === vehicle.seats || filterValue === 'Any' || filterValue === 'any'
      return false
    }).length
    return `(${count})`
  }

  useEffect(() => {
    history.push(`?${QueryString.stringify(query)}`)
  }, [query])

  const activeFilters = () => {
    const active = []
    if (params.make) active.push(['make', params.make, params.make])
    if (params.model) active.push(['model', params.model, params.model])
    if (params.minPrice) active.push(['minPrice', params.minPrice, `From £${params.minPrice}`])
    if (params.maxPrice) active.push(['maxPrice', params.maxPrice, `Up to £${params.maxPrice}`])
    if (params.minYear) active.push(['minYear', params.minYear, `From ${params.minYear}`])
    if (params.maxYear) active.push(['maxYear', params.maxYear, `To ${params.maxYear}`])
    if (params.maxMiles) active.push(['maxMiles', params.maxMiles, `Up to ${params.maxMiles} miles`])
    if (params.bodyType) params.bodyType.split(',').map((type) => active.push(['bodyType', type, type]))
    if (params.fuelType) params.fuelType.split(',').map((type) => active.push(['fuelType', type, type]))
    if (params.gearbox) params.gearbox.split(',').map((type) => active.push(['gearbox', type, type]))
    if (params.doors) params.doors.split(',').map((type) => active.push(['doors', type, `${type} doors`]))
    if (params.seats) params.seats.split(',').map((type) => active.push(['seats', type, `${type} seats`]))
    return active
  }
  activeFilters()

  console.log(activeFilters())

  const removeFilter = (event) => {
    console.log(params)
    if (event.target.id.includes('make')) delete params.make
    if (event.target.id.includes('model')) delete params.model
    if (event.target.id.includes('minPrice')) delete params.minPrice
    if (event.target.id.includes('maxPrice')) delete params.maxPrice
    if (event.target.id.includes('minYear')) delete params.minYear
    if (event.target.id.includes('maxYear')) delete params.maxYear
    if (event.target.id.includes('maxMiles')) delete params.maxMiles
    if (event.target.id.includes('bodyType')) {
      if (params.bodyType.includes(',' + event.target.id.split('-')[1].toLowerCase())) {
        params.bodyType = params.bodyType.replace(',' + event.target.id.split('-')[1].toLowerCase(), '')
      } else if (params.bodyType.includes(event.target.id.split('-')[1].toLowerCase() + ',')) {
        params.bodyType = params.bodyType.replace(event.target.id.split('-')[1].toLowerCase() + ',', '')
      } else {
        delete params.bodyType
      }
    }
    if (event.target.id.includes('fuelType')) {
      if (params.fuelType.includes(',' + event.target.id.split('-')[1].toLowerCase())) {
        params.fuelType = params.fuelType.replace(',' + event.target.id.split('-')[1].toLowerCase(), '')
      } else if (params.fuelType.includes(event.target.id.split('-')[1].toLowerCase() + ',')) {
        params.fuelType = params.fuelType.replace(event.target.id.split('-')[1].toLowerCase() + ',', '')
      } else {
        delete params.fuelType
      }
    }
    if (event.target.id.includes('gearbox')) {
      if (params.gearbox.includes(',' + event.target.id.split('-')[1].toLowerCase())) {
        params.gearbox = params.gearbox.replace(',' + event.target.id.split('-')[1].toLowerCase(), '')
      } else if (params.gearbox.includes(event.target.id.split('-')[1].toLowerCase() + ',')) {
        params.gearbox = params.gearbox.replace(event.target.id.split('-')[1].toLowerCase() + ',', '')
      } else {
        delete params.gearbox
      }
    }
    if (event.target.id.includes('doors')) {
      if (params.doors.includes(',' + event.target.id.split('-')[1].toLowerCase())) {
        params.doors = params.doors.replace(',' + event.target.id.split('-')[1].toLowerCase(), '')
      } else if (params.doors.includes(event.target.id.split('-')[1].toLowerCase() + ',')) {
        params.doors = params.doors.replace(event.target.id.split('-')[1].toLowerCase() + ',', '')
      } else {
        delete params.doors
      }
    }
    if (event.target.id.includes('seats')) {
      if (params.seats.includes(',' + event.target.id.split('-')[1].toLowerCase())) {
        params.seats = params.seats.replace(',' + event.target.id.split('-')[1].toLowerCase(), '')
      } else if (params.seats.includes(event.target.id.split('-')[1].toLowerCase() + ',')) {
        params.seats = params.seats.replace(event.target.id.split('-')[1].toLowerCase() + ',', '')
      } else {
        delete params.seats
      }
    }

    
    setQuery(params)
    console.dir(event.target.id)
  }


  const FilterSidebar = () => {
    return (
      <>
        <Container style={{ paddingTop: '40px' }}>
          <h4>Filters ({activeFilters().length})</h4>
        </Container>
        {activeFilters().length > 0 &&
        <>
          <Container className="current-filter-links">
            {activeFilters().map(filter => {
              return (
                <div key={filter} className="current-filters">
                  <div id={`${filter[0]}-${filter[1]}`} className="active-name-filter current-filter-container">{filter[2]}<NavLink id={`${filter[0]}-${filter[1]}`} onClick={(event) => removeFilter(event)} className="remove-filter"><i id={`${filter[0]}-${filter[1]}`} className="far fa-times-circle remove-filter-icon"></i></NavLink></div>
                </div>
              )
            })}
            
          </Container>
          <Container style={{ margin: '10px 0' }}>
            <Link to='/vehicles'>Clear all</Link> 
          </Container>
        </>
        }
        
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Make and model</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Make</Form.Label>
                  <Form.Select id="filter-make" name="make" className="filter-select select-make" aria-label="Select make" onChange={(event) => {
                    filterChange(event)
                  }} >
                    {makes.map(make => {
                      return <option key={make} value={make.toLowerCase()} selected={make.toLowerCase() === params.make}>{make} {filterCount('make', make)}</option>
                    })}
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Model</Form.Label>
                  <Form.Select id="filter-model" className="filter-select select-model" aria-label="Select model" onChange={(event) => {
                    filterChange(event)
                  }} >
                    {models.map(model => {
                      const selectedMake = document.querySelector('#filter-make')
                      const modelCount = vehicles.filter(vehicle => (vehicle.model.name.toLowerCase() === model.toLowerCase() || model.toLowerCase() === 'any') && (vehicle.make.name.toLowerCase() === selectedMake.value.toLowerCase())).length
                      return selectedMake.value === 'any' && model === 'Any' ? <option key={model} value={model}>{model} {filterCount('model', model)}</option> :
                        modelCount > 0 && <option key={model} value={model} selected={model.toLowerCase() === params.model}>{model} {filterCount('model', model)}</option>
                    })}
                  </Form.Select>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Price</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Min</Form.Label>
                  <Form.Select id="filter-min-price" className="filter-select select-min-price" defaultValue="Any" aria-label="Select Min Price" onChange={(event) => {
                    filterChange(event)
                  }} >
                    {minPrice.map(price => {
                      const maxPriceElement = document.querySelector('#filter-max-price')
                      const available = price < maxPriceElement.value || maxPriceElement.value === 'Any' || maxPriceElement.value === 'all'
                      return (available || price === 'Any' || price === 'any') && <option id="min-price" key={price} value={price} selected={parseInt(price) === parseInt(params.minPrice)}>{`${price === 'Any' ? 'Any' : '£' + (Math.round(price * 100) / 100).toLocaleString()} ${filterCount('minPrice', price)}`}</option>
                    })}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Max</Form.Label>
                  <Form.Select id="filter-max-price" className="filter-select select-max-price" defaultValue="Any" aria-label="Select Max Price" onChange={(event) => {
                    filterChange(event)
                  }} >
                    {maxPrice.map(price => {
                      const minPriceElement = document.querySelector('#filter-min-price')
                      const available = price > minPriceElement.value || minPriceElement.value === 'Any' || minPriceElement.value === 'all'
                      return (available || price === 'Any' || price === 'any') && <option id="max-price" key={price} value={price} selected={parseInt(price) === parseInt(params.maxPrice)}>{`${price === 'Any' ? 'Any' : '£' + (Math.round(price * 100) / 100).toLocaleString()} ${filterCount('maxPrice', price)}`}</option>
                    })}
                  </Form.Select>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Age</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Label>From (oldest)</Form.Label>
                  <Form.Select id="filter-min-year" className="filter-select select-min-year" defaultValue="Any" aria-label="Select Min Year" onChange={(event) => {
                    filterChange(event)
                  }} >
                    {ageFilters.map(year => {
                      const maxYearElement = document.querySelector('#filter-max-year')
                      const available = year < maxYearElement.value || maxYearElement.value === 'Any' || maxYearElement.value === 'all'
                      return (available || year === 'Any' || year === 'any') && <option id="min-year" key={year} value={year} selected={parseInt(year) === parseInt(params.minYear)}>{`${year} ${filterCount('minYear', year)}`}</option>
                    })}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>To (newest)</Form.Label>
                  <Form.Select id="filter-max-year" className="filter-select select-max-year" defaultValue="Any" aria-label="Select Max Year" onChange={(event) => {
                    filterChange(event)
                  }} >
                    {ageFilters.map(year => {
                      const minYearElement = document.querySelector('#filter-min-year')
                      const available = year > minYearElement.value || minYearElement.value === 'Any' || minYearElement.value === 'all'
                      return (available || year === 'Any' || year === 'any') && <option id="max-year" key={year} value={year} selected={parseInt(year) === parseInt(params.maxYear)}>{`${year} ${filterCount('maxYear', year)}`}</option>
                    })}
                  </Form.Select>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Mileage</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Miles</Form.Label>
                  <Form.Select id="filter-max-miles" name="maxMiles" className="filter-select select-max-miles" aria-label="Select max miles" onChange={(event) => {
                    filterChange(event)
                  }} >
                    {miles.map(mile => {
                      return <option key={mile} value={mile} selected={mile === params.maxMiles}>{`${mile === 'Any' ? 'Any' : 'Up to ' + (Math.round(mile * 100) / 100).toLocaleString() + ' miles'}`} {filterCount('maxMiles', mile)}</option>
                    })}
                  </Form.Select>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>Body Type</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check checked={!params.bodyType} id="filter-body-type" value="Any" type="switch" onChange={(event => {
                      filterChange(event)
                    })} label={`Any ${filterCount('bodyType', 'Any')}`} />
                    {bodyTypesOptions.map(bodyType => {
                      return <Form.Check key={bodyType[0]} checked={params.bodyType ? params.bodyType.includes(bodyType[1].toLowerCase()) : false} id="filter-body-type" value={bodyType[0]} type="switch" onChange={(event => {
                        filterChange(event)
                      })} label={`${bodyType[1]}'s ${filterCount('bodyType', bodyType[1])}`} />
                    })}
                    
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>Fuel Type</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check checked={!params.fuelType} id="filter-fuel-type" value="Any" type="switch" onChange={(event => {
                      filterChange(event)
                    })} label={`Any ${filterCount('fuelType', 'Any')}`} />
                    {fuelTypesOptions.map(fuelType => {
                      return <Form.Check key={fuelType[0]} checked={params.fuelType ? params.fuelType.includes(fuelType[1].toLowerCase()) : false} id="filter-fuel-type" value={fuelType[0]} type="switch" onChange={(event => {
                        filterChange(event)
                      })} label={`${fuelType[1]} ${filterCount('fuelType', fuelType[1])}`} />
                    })}
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>Gearbox</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check checked={!params.gearbox} id="filter-gearbox" value="Any" type="switch" onChange={(event => {
                      filterChange(event)
                    })} label={`Any ${filterCount('gearbox', 'Any')}`} />
                    {gearboxOptions.map(gearbox => {
                      return <Form.Check key={gearbox[0]} checked={params.gearbox ? params.gearbox.includes(gearbox[1].toLowerCase()) : false} id="filter-gearbox" value={gearbox[0]} type="switch" onChange={(event => {
                        filterChange(event)
                      })} label={`${gearbox[1]} ${filterCount('gearbox', gearbox[1])}`} />
                    })}
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>Doors</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check checked={!params.doors} id="filter-doors" value="Any" type="switch" onChange={(event => {
                      filterChange(event)
                    })} label={`Any ${filterCount('doors', 'Any')}`} />
                    {doorOptions.map(doors => {
                      return <Form.Check key={doors[0]} checked={params.doors ? params.doors.includes(doors[0]) : false} id="filter-doors" value={doors[0]} type="switch" onChange={(event => {
                        filterChange(event)
                      })} label={`${doors[1]} ${filterCount('doors', doors[0])}`} />
                    })}
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="8">
            <Accordion.Header>Seats</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check checked={!params.seats} id="filter-seats" value="Any" type="switch" onChange={(event => {
                      filterChange(event)
                    })} label={`Any ${filterCount('seats', 'Any')}`} />
                    {seatOptions.map(seats => {
                      return <Form.Check key={seats[0]} checked={params.seats ? params.seats.includes(seats[0]) : false} id="filter-seats" value={seats[0]} type="switch" onChange={(event => {
                        filterChange(event)
                      })} label={`${seats[1]} ${filterCount('seats', seats[0])}`} />
                    })}
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      </>

    )
  }

 

  return (
    <section>
      <>
        <Row>
          <Col className="filters-container">
            <FilterSidebar />
          </Col>
          <Col className="vehichles-show-container mx-5">
            <Row className="vehicles-title mt-5">
              <p>
                <strong style={{ fontSize: '32px' }}>{vehicles.length === filteredVehicles.length ? 'All cars' : 'Matching results'} </strong>
                ({filteredVehicles.length} of {vehicles.length})
              </p>
            </Row>
            <Button className="filters-offcanvas" variant="primary" onClick={handleShow}>
              Filter
            </Button>   
            <Offcanvas filter-sidebar scroll={false} show={show} onHide={handleClose}>
              <FilterSidebar />
            </Offcanvas>
            <hr></hr>
            <Row className="vehicles-title mt-5">
              {filteredVehicles.length > 0 && filteredVehicles.map((vehicle) => {
                return (
                  <Col key={vehicle.registrationNumber} xs="12" sm="6" md="4" lg="6" xl="4" xxl="3" >
                    <FindVehicleCard vehicle={vehicle} />
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
      </>
    </section>
  )
}

export default FindVehicles