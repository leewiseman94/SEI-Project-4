import React, { useEffect, useState } from 'react'
import { Accordion, Row, Col, Form, Button, Offcanvas, Container, NavLink } from 'react-bootstrap'
import FindVehicleCard from './FindVehiclesCard.js'
import axios from 'axios'
import * as QueryString from 'query-string'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'


const FindVehicles = () => {
  document.title = 'CarTrader | Find Vehicle'
  // const [vehicles, setVehicles] = useState([])
  // const [filteredVehicles, setFilteredVehicles] = useState([])
  const [sales, setSales] = useState([])
  const [filteredSales, setFilteredSales] = useState([])
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
    const getSalesData = async () => {
      const salesData = await axios.get('/api/sales/')
      let allSales = salesData.data
      allSales = allSales.filter(sale => {
        return ((!params.sold || params.sold === false) ? sale.saleStatus.toLowerCase() !== 'sold' : sale)
      })
      setSales(allSales)

      const filtered = allSales.filter(sale => {
        return (
          (params.make ? params.make.toLowerCase() === sale.car.make.name.toLowerCase() || params.make.toLowerCase() === 'any' : sale) &&
          (params.model ? params.model.toLowerCase() === sale.car.model.name.toLowerCase() || params.model.toLowerCase() === 'any' : sale) &&
          (params.minPrice ? params.minPrice <= sale.price || params.minPrice.toLowerCase() === 'any' : sale) &&
          (params.maxPrice ? params.maxPrice >= sale.price || params.maxPrice.toLowerCase() === 'any' : sale) &&
          (params.minYear ? params.minYear <= sale.car.yearOfManufacture || params.minYear.toLowerCase() === 'any' : sale) &&
          (params.maxYear ? params.maxYear >= sale.car.yearOfManufacture || params.maxYear.toLowerCase() === 'any' : sale) &&
          (params.maxMiles ? params.maxMiles >= sale.car.mileage || params.maxMiles.toLowerCase() === 'any' : sale) &&
          (params.bodyType ? params.bodyType.toLowerCase().includes(sale.car.bodyType.toLowerCase()) || params.bodyType.toLowerCase() === 'any' : sale) &&
          (params.fuelType ? params.fuelType.toLowerCase().includes(sale.car.fuelType.toLowerCase()) || params.fuelType.toLowerCase() === 'any' : sale) &&
          (params.gearbox ? params.gearbox.toLowerCase().includes(sale.car.gearbox.toLowerCase()) || params.gearbox.toLowerCase() === 'any' : sale) &&
          (params.doors ? params.doors.includes(sale.car.doors) || params.doors.toLowerCase() === 'any' : sale) &&
          (params.seats ? params.seats.includes(sale.car.seats) || params.seats.toLowerCase() === 'any' : sale)
        )
      })
      setFilteredSales(filtered)


      // * SET ALL FILTER OPTIONS
      const makesArray = ['Any']
      const modelsArray = ['Any']
      const year = new Date().getFullYear()
      let oldYear = year
      for (let i = 0; i < allSales.length; i++) {
        if (!makesArray.includes(allSales[i].car.make.name)) makesArray.push(allSales[i].car.make.name)
        if (!modelsArray.includes(allSales[i].car.model.name)) modelsArray.push(allSales[i].car.model.name)
        if (parseInt(allSales[i].car.yearOfManufacture) < parseInt(oldYear)) oldYear = parseInt(allSales[i].car.yearOfManufacture)
      }
      setMakes(makesArray)
      setModels(modelsArray)
      setMinPrice(['Any', 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12500, 15000, 17500, 20000, 25000])
      setMaxPrice(['Any', 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12500, 15000, 17500, 20000, 30000, 40000, 50000])
      setMiles(['Any', 5000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000])
      const ageFiltersArray = ['Any']
      for (let i = oldYear; i <= year; i++) {
        ageFiltersArray.push(i)
      }
      setAgeFilters(ageFiltersArray)
      const getOptions = async () => {
        const options = await axios.get('/api/cars/choices')
        return options.data
      }

      const choices = await getOptions()
      for (let i = 0; i < choices.length; i++) {
        if (choices[i][0] === 'bodyTypeOptions') setBodyTypesOptions(choices[i][1])
        if (choices[i][0] === 'fuelTypeOptions') setFuelTypesOptions(choices[i][1])
        if (choices[i][0] === 'gearboxOptions') setGearboxOptions(choices[i][1])
        if (choices[i][0] === 'doorOptions') setDoorOptions(choices[i][1])
        if (choices[i][0] === 'seatOptions') setSeatOptions(choices[i][1])
      }
    }
    getSalesData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])


  const filterChange = (event) => {
    event.preventDefault()
    const queryParams = QueryString.parse(props.search)
    if (event.target.value === 'Any' || event.target.value === 'any' || event.target.checked === false) {
      if (event.target.id === 'filter-make') {
        delete queryParams.make
        delete queryParams.model
      }
      if (event.target.id === 'filter-sold') delete queryParams.sold
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
      if (event.target.id === 'filter-sold') queryParams.sold = event.target.checked
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
    console.log(withoutCurrentParams)
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

    const filtered = sales.filter(sale => {
      return (
        (withoutCurrentParams.make ? withoutCurrentParams.make.toLowerCase() === sale.car.make.name.toLowerCase() || withoutCurrentParams.make.toLowerCase() === 'any' : sale) &&
        (withoutCurrentParams.model ? withoutCurrentParams.model.toLowerCase() === sale.car.model.name.toLowerCase() || withoutCurrentParams.model.toLowerCase() === 'any' : sale) &&
        (withoutCurrentParams.minPrice ? withoutCurrentParams.minPrice <= sale.price || withoutCurrentParams.minPrice.toLowerCase() === 'any' : sale) &&
        (withoutCurrentParams.maxPrice ? withoutCurrentParams.maxPrice >= sale.price || withoutCurrentParams.maxPrice.toLowerCase() === 'any' : sale) &&
        (withoutCurrentParams.minYear ? withoutCurrentParams.minYear <= sale.car.yearOfManufacture || withoutCurrentParams.minYear.toLowerCase() === 'any' : sale) &&
        (withoutCurrentParams.maxYear ? withoutCurrentParams.maxYear >= sale.car.yearOfManufacture || withoutCurrentParams.maxYear.toLowerCase() === 'any' : sale) &&
        (withoutCurrentParams.maxMiles ? withoutCurrentParams.maxMiles >= sale.car.mileage || withoutCurrentParams.maxMiles.toLowerCase() === 'any' : sale) &&
        (withoutCurrentParams.bodyType ? withoutCurrentParams.bodyType.toLowerCase().includes(sale.car.bodyType.toLowerCase()) || withoutCurrentParams.bodyType.toLowerCase() === 'any' : sale) &&
        (withoutCurrentParams.fuelType ? withoutCurrentParams.fuelType.toLowerCase().includes(sale.car.fuelType.toLowerCase()) || withoutCurrentParams.fuelType.toLowerCase() === 'any' : sale) &&
        (withoutCurrentParams.gearbox ? withoutCurrentParams.gearbox.toLowerCase().includes(sale.car.gearbox.toLowerCase()) || withoutCurrentParams.gearbox.toLowerCase() === 'any' : sale) &&
        (withoutCurrentParams.doors ? withoutCurrentParams.doors.toLowerCase().includes(sale.car.doors) || withoutCurrentParams.doors.toLowerCase() === 'any' : sale) &&
        (withoutCurrentParams.seats ? withoutCurrentParams.seats.toLowerCase().includes(sale.car.seats) || withoutCurrentParams.seats.toLowerCase() === 'any' : sale)
      )
    })

    const count = filtered.filter(sale => {
      if (filterKey === 'make') return filterValue === sale.car.make.name || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'model') return filterValue === sale.car.model.name || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'minPrice') return filterValue <= sale.price || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'maxPrice') return filterValue >= sale.price || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'minYear') return filterValue <= sale.car.yearOfManufacture || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'maxYear') return filterValue >= sale.car.yearOfManufacture || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'maxMiles') return filterValue >= sale.car.mileage || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'bodyType') return filterValue === sale.car.bodyType || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'fuelType') return filterValue === sale.car.fuelType || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'gearbox') return filterValue === sale.car.gearbox || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'doors') return filterValue === sale.car.doors || filterValue === 'Any' || filterValue === 'any'
      if (filterKey === 'seats') return filterValue === sale.car.seats || filterValue === 'Any' || filterValue === 'any'
      return false
    }).length
    return `(${count})`
  }

  useEffect(() => {
    history.push(`?${QueryString.stringify(query)}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const removeFilter = (event) => {
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
  }

  const FilterSidebar = () => {
    return (
      <>
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
                  <Form.Select id="filter-make" name="make" className="filter-select select-make" aria-label="Select make"
                    defaultValue={params.make ? makes.filter(make => make.toLowerCase() === params.make.toLowerCase())[0] : 'any' || 'Any'}
                    onChange={(event) => filterChange(event)} >
                    {makes.map(make => {
                      return <option key={make} value={make}>{make} {filterCount('make', make)}</option>
                    })}
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Model</Form.Label>
                  <Form.Select id="filter-model" className="filter-select select-model" aria-label="Select model"
                    defaultValue={params.model ? models.filter(model => model.toLowerCase() === params.model.toLowerCase())[0] : 'any' || 'Any'}
                    onChange={(event) => filterChange(event)}>
                    {models.map(model => {
                      const selectedMake = document.querySelector('#filter-make')
                      const modelCount = sales.filter(sale => (sale.car.model.name.toLowerCase() === model.toLowerCase() || model.toLowerCase() === 'any') && (sale.car.make.name.toLowerCase() === selectedMake.value.toLowerCase())).length
                      return selectedMake.value.toLowerCase() === 'any' && model === 'Any' ? <option key={model} value={model}>{model} {filterCount('model', model)}</option> :
                        modelCount > 0 && <option key={model} value={model}>{model} {filterCount('model', model)}</option>
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
                  <Form.Select id="filter-min-price" className="filter-select select-min-price" aria-label="Select Min Price"
                    defaultValue={params.minPrice ? minPrice.filter(price => parseInt(price) === parseInt(params.minPrice))[0] : 'any' || 'Any'}
                    onChange={(event) => filterChange(event)} >
                    {minPrice.map(price => {
                      const maxPriceElement = document.querySelector('#filter-max-price')
                      const available = parseInt(price) < parseInt(maxPriceElement.value) || maxPriceElement.value === 'Any' || maxPriceElement.value === 'all'
                      return (available || price === 'Any' || price === 'any') && <option id="min-price" key={price} value={price}>{`${price === 'Any' ? 'Any' : '£' + (Math.round(price * 100) / 100).toLocaleString()} ${filterCount('minPrice', price)}`}</option>
                    })}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Max</Form.Label>
                  <Form.Select id="filter-max-price" className="filter-select select-max-price" aria-label="Select Max Price"
                    defaultValue={params.maxPrice ? maxPrice.filter(price => parseInt(price) === parseInt(params.maxPrice))[0] : 'any' || 'Any'}
                    onChange={(event) => filterChange(event)}>
                    {maxPrice.map(price => {
                      const minPriceElement = document.querySelector('#filter-min-price')
                      const available = parseInt(price) > parseInt(minPriceElement.value) || minPriceElement.value === 'Any' || minPriceElement.value === 'all'
                      return (available || price === 'Any' || price === 'any') && <option id="max-price" key={price} value={price}>{`${price === 'Any' ? 'Any' : '£' + (Math.round(price * 100) / 100).toLocaleString()} ${filterCount('maxPrice', price)}`}</option>
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
                  <Form.Select id="filter-min-year" className="filter-select select-min-year" aria-label="Select Min Year"
                    defaultValue={params.minYear ? ageFilters.filter(year => parseInt(year) === parseInt(params.minYear))[0] : 'any' || 'Any'}
                    onChange={(event) => filterChange(event)} >
                    {ageFilters.map(year => {
                      const maxYearElement = document.querySelector('#filter-max-year')
                      const available = parseInt(year) < parseInt(maxYearElement.value) || maxYearElement.value === 'Any' || maxYearElement.value === 'all'
                      return (available || year === 'Any' || year === 'any') && <option id="min-year" key={year} value={year} >{`${year} ${filterCount('minYear', year)}`}</option>
                    })}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>To (newest)</Form.Label>
                  <Form.Select id="filter-max-year" className="filter-select select-max-year" aria-label="Select Max Year"
                    defaultValue={params.maxYear ? ageFilters.filter(year => parseInt(year) === parseInt(params.maxYear))[0] : 'any' || 'Any'}
                    onChange={(event) => filterChange(event)} >
                    {ageFilters.map(year => {
                      const minYearElement = document.querySelector('#filter-min-year')
                      const available = parseInt(year) > parseInt(minYearElement.value) || minYearElement.value === 'Any' || minYearElement.value === 'all'
                      return (available || year === 'Any' || year === 'any') && <option id="max-year" key={year} value={year} >{`${year} ${filterCount('maxYear', year)}`}</option>
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
                  <Form.Select id="filter-max-miles" name="maxMiles" className="filter-select select-max-miles" aria-label="Select max miles"
                    defaultValue={params.maxMiles ? miles.filter(mile => parseInt(mile) === parseInt(params.maxMiles))[0] : 'any' || 'Any'}
                    onChange={(event) => filterChange(event)} >
                    {miles.map(mile => {
                      return <option key={mile} value={mile} >{`${mile === 'Any' ? 'Any' : 'Up to ' + (Math.round(mile * 100) / 100).toLocaleString() + ' miles'}`} {filterCount('maxMiles', mile)}</option>
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
    <section className="main-section">
      <>
        <Row>
          <Col className="filters-container">
            <Container style={{ paddingTop: '40px' }}>
              <h4>Filters ({activeFilters().length})</h4>
            </Container>
            <FilterSidebar />
          </Col>
          <Col className="vehichles-show-container mx-5">
            <Row className="vehicles-title mt-5">
              <p>
                <strong style={{ fontSize: '32px' }}>{sales.length === filteredSales.length ? 'All cars' : 'Matching results'} </strong>
                ({filteredSales.length} of {sales.length})
              </p>
            </Row>
            <Button className="filters-offcanvas" variant="primary" onClick={handleShow}>
              Filter
            </Button>
            <Offcanvas closeButton filter-sidebar scroll={false} show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Container style={{ paddingTop: '40px' }}>
                  <h4>Filters ({activeFilters().length})</h4>
                </Container>
              </Offcanvas.Header>
              <FilterSidebar />
            </Offcanvas>
            <hr></hr>
            <Form.Check checked={params.sold ? params.sold === 'true' : false} id="filter-sold" type="switch" onChange={(event => {
              filterChange(event)
            })} label={'Include Sold'} />
            <Row className="vehicles-title mt-5">
              {filteredSales.length > 0 && filteredSales.map((sale) => {
                return (
                  <Col style={{ marginTop: '30px' }} key={sale.car.registrationNumber} xs="12" sm="6" md="4" lg="6" xl="4" xxl="3" >
                    <FindVehicleCard sale={sale} />
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