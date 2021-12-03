webpackHotUpdate("main",{

/***/ "./src/components/FindVehicles.js":
/*!****************************************!*\
  !*** ./src/components/FindVehicles.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _FindVehiclesCard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FindVehiclesCard.js */ "./src/components/FindVehiclesCard.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/leewiseman/Development/Personal/GeneralAssemblyProjects/SEI-Project-4/client/src/components/FindVehicles.js",
    _s = __webpack_require__.$Refresh$.signature();









const FindVehicles = () => {
  _s();

  const [vehicles, setVehicles] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [filteredVehicles, setFilteredVehicles] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [makes, setMakes] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [models, setModels] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [minPrice, setMinPrice] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [maxPrice, setMaxPrice] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [miles, setMiles] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [bodyTypesOptions, setBodyTypesOptions] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [fuelTypesOptions, setFuelTypesOptions] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [gearboxOptions, setGearboxOptions] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [doorOptions, setDoorOptions] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [seatOptions, setSeatOptions] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [ageFilters, setAgeFilters] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const props = Object(react_router__WEBPACK_IMPORTED_MODULE_5__["useLocation"])();
  const history = Object(react_router__WEBPACK_IMPORTED_MODULE_5__["useHistory"])();
  const params = query_string__WEBPACK_IMPORTED_MODULE_4__["parse"](props.search);
  const [query, setQuery] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(query_string__WEBPACK_IMPORTED_MODULE_4__["parse"](props.search));
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const getVehicleData = async () => {
      const vehicleData = await axios__WEBPACK_IMPORTED_MODULE_3___default.a.get('/api/cars/');
      const allVehicles = vehicleData.data;
      setVehicles(allVehicles); // * Set Filtered Vehicles depending on query string

      const filtered = allVehicles.filter(vehicle => {
        if (params.doors) console.log(params.doors.includes(vehicle.doors));
        console.log(vehicle.doors);
        return (params.make ? params.make.toLowerCase() === vehicle.make.name.toLowerCase() || params.make.toLowerCase() === 'any' : vehicle) && (params.model ? params.model.toLowerCase() === vehicle.model.name.toLowerCase() || params.model.toLowerCase() === 'any' : vehicle) && (params.minPrice ? params.minPrice <= vehicle.price || params.minPrice.toLowerCase() === 'any' : vehicle) && (params.maxPrice ? params.maxPrice >= vehicle.price || params.maxPrice.toLowerCase() === 'any' : vehicle) && (params.minYear ? params.minYear <= vehicle.yearOfManufacture || params.minYear.toLowerCase() === 'any' : vehicle) && (params.maxYear ? params.maxYear >= vehicle.yearOfManufacture || params.maxYear.toLowerCase() === 'any' : vehicle) && (params.maxMiles ? params.maxMiles >= vehicle.mileage || params.maxMiles.toLowerCase() === 'any' : vehicle) && (params.bodyType ? params.bodyType.toLowerCase().includes(vehicle.bodyType.toLowerCase()) || params.bodyType.toLowerCase() === 'any' : vehicle) && (params.fuelType ? params.fuelType.toLowerCase().includes(vehicle.fuelType.toLowerCase()) || params.fuelType.toLowerCase() === 'any' : vehicle) && (params.gearbox ? params.gearbox.toLowerCase().includes(vehicle.gearbox.toLowerCase()) || params.gearbox.toLowerCase() === 'any' : vehicle) && (params.doors ? params.doors.includes(vehicle.doors) || params.doors.toLowerCase() === 'any' : vehicle) && (params.seats ? params.seats.includes(vehicle.seats) || params.seats.toLowerCase() === 'any' : vehicle);
      }); // * SET ALL FILTER OPTIONS

      const makesArray = ['Any'];
      const modelsArray = ['Any'];
      const year = new Date().getFullYear();
      let oldYear = year;

      for (let i = 0; i < allVehicles.length; i++) {
        if (!makesArray.includes(allVehicles[i].make.name)) makesArray.push(allVehicles[i].make.name);
        if (!modelsArray.includes(allVehicles[i].model.name)) modelsArray.push(allVehicles[i].model.name);
        if (parseInt(allVehicles[i].yearOfManufacture) < parseInt(oldYear)) oldYear = parseInt(allVehicles[i].yearOfManufacture);
      }

      setMakes(makesArray);
      setModels(modelsArray);
      setMinPrice(['Any', 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12500, 15000, 17500, 20000, 25000]);
      setMaxPrice(['Any', 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12500, 15000, 17500, 20000, 30000, 40000, 50000]);
      setMiles(['Any', 5000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000]);
      const ageFiltersArray = ['Any'];

      for (let i = oldYear; i <= year; i++) {
        ageFiltersArray.push(i);
      }

      setAgeFilters(ageFiltersArray);

      const getOptions = async () => {
        console.log('Testing');
        const options = await axios__WEBPACK_IMPORTED_MODULE_3___default.a.get('/api/cars/choices');
        return options.data;
      };

      const choices = await getOptions();
      console.log(choices);

      for (let i = 0; i < choices.length; i++) {
        if (choices[i][0] === 'bodyTypeOptions') setBodyTypesOptions(choices[i][1]);
        if (choices[i][0] === 'fuelTypeOptions') setFuelTypesOptions(choices[i][1]);
        if (choices[i][0] === 'gearboxOptions') setGearboxOptions(choices[i][1]);
        if (choices[i][0] === 'doorOptions') setDoorOptions(choices[i][1]);
        if (choices[i][0] === 'seatOptions') setSeatOptions(choices[i][1]);
      }

      setFilteredVehicles(filtered);
    };

    getVehicleData();
  }, [props]);

  const filterChange = event => {
    const queryParams = query_string__WEBPACK_IMPORTED_MODULE_4__["parse"](props.search);
    console.log(event.target.checked);

    if (event.target.value === 'Any' || event.target.value === 'any') {
      if (event.target.id === 'filter-make') {
        delete queryParams.make;
        delete queryParams.model;
      }

      if (event.target.id === 'filter-model') delete queryParams.model;
      if (event.target.id === 'filter-min-price') delete queryParams.minPrice;
      if (event.target.id === 'filter-max-price') delete queryParams.maxPrice;
      if (event.target.id === 'filter-min-year') delete queryParams.minYear;
      if (event.target.id === 'filter-max-year') delete queryParams.maxYear;
      if (event.target.id === 'filter-max-miles') delete queryParams.maxMiles;
      if (event.target.id === 'filter-body-type') delete queryParams.bodyType;
      if (event.target.id === 'filter-fuel-type') delete queryParams.fuelType;
      if (event.target.id === 'filter-gearbox') delete queryParams.gearbox;
      if (event.target.id === 'filter-doors') delete queryParams.doors;
      if (event.target.id === 'filter-seats') delete queryParams.seats;
    } else {
      if (event.target.id === 'filter-make') {
        queryParams.make = `${event.target.value.toLowerCase()}`;
        delete queryParams.model;
      }

      if (event.target.id === 'filter-model') queryParams.model = `${event.target.value.toLowerCase()}`;
      if (event.target.id === 'filter-min-price') queryParams.minPrice = `${event.target.value}`;
      if (event.target.id === 'filter-max-price') queryParams.maxPrice = `${event.target.value}`;
      if (event.target.id === 'filter-min-year') queryParams.minYear = `${event.target.value}`;
      if (event.target.id === 'filter-max-year') queryParams.maxYear = `${event.target.value}`;
      if (event.target.id === 'filter-max-miles') queryParams.maxMiles = `${event.target.value}`;
      if (queryParams.bodyType && event.target.checked && event.target.id === 'filter-body-type') queryParams.bodyType = queryParams.bodyType + ',' + event.target.value.toLowerCase();
      if (!queryParams.bodyType && event.target.checked && event.target.id === 'filter-body-type') queryParams.bodyType = event.target.value.toLowerCase();

      if (queryParams.bodyType && !event.target.checked && event.target.id === 'filter-body-type') {
        console.log(queryParams.bodyType.includes(',' + event.target.value.toLowerCase()));
        console.log(queryParams.bodyType);
        console.log(',' + event.target.value.toLowerCase());

        if (queryParams.bodyType.includes(',' + event.target.value.toLowerCase())) {
          queryParams.bodyType = queryParams.bodyType.replace(',' + event.target.value.toLowerCase(), '');
        } else if (queryParams.bodyType.includes(event.target.value.toLowerCase() + ',')) {
          queryParams.bodyType = queryParams.bodyType.replace(event.target.value.toLowerCase() + ',', '');
        } else {
          delete queryParams.bodyType;
        }
      }

      if (queryParams.fuelType && event.target.checked && event.target.id === 'filter-fuel-type') queryParams.fuelType = queryParams.fuelType + ',' + event.target.value.toLowerCase();
      if (!queryParams.fuelType && event.target.checked && event.target.id === 'filter-fuel-type') queryParams.fuelType = event.target.value.toLowerCase();

      if (queryParams.fuelType && !event.target.checked && event.target.id === 'filter-fuel-type') {
        if (queryParams.fuelType.includes(',' + event.target.value.toLowerCase())) {
          queryParams.fuelType = queryParams.fuelType.replace(',' + event.target.value.toLowerCase(), '');
        } else if (queryParams.fuelType.includes(event.target.value.toLowerCase() + ',')) {
          queryParams.fuelType = queryParams.fuelType.replace(event.target.value.toLowerCase() + ',', '');
        } else {
          delete queryParams.fuelType;
        }
      }

      if (queryParams.gearbox && event.target.checked && event.target.id === 'filter-gearbox') queryParams.gearbox = queryParams.gearbox + ',' + event.target.value.toLowerCase();
      if (!queryParams.gearbox && event.target.checked && event.target.id === 'filter-gearbox') queryParams.gearbox = event.target.value.toLowerCase();

      if (queryParams.gearbox && !event.target.checked && event.target.id === 'filter-gearbox') {
        if (queryParams.gearbox.includes(',' + event.target.value.toLowerCase())) {
          queryParams.gearbox = queryParams.gearbox.replace(',' + event.target.value.toLowerCase(), '');
        } else if (queryParams.gearbox.includes(event.target.value.toLowerCase() + ',')) {
          queryParams.gearbox = queryParams.gearbox.replace(event.target.value.toLowerCase() + ',', '');
        } else {
          delete queryParams.gearbox;
        }
      }

      if (queryParams.doors && event.target.checked && event.target.id === 'filter-doors') queryParams.doors = queryParams.doors + ',' + event.target.value.toLowerCase();
      if (!queryParams.doors && event.target.checked && event.target.id === 'filter-doors') queryParams.doors = event.target.value.toLowerCase();

      if (queryParams.doors && !event.target.checked && event.target.id === 'filter-doors') {
        if (queryParams.doors.includes(',' + event.target.value.toLowerCase())) {
          queryParams.doors = queryParams.doors.replace(',' + event.target.value.toLowerCase(), '');
        } else if (queryParams.doors.includes(event.target.value.toLowerCase() + ',')) {
          queryParams.doors = queryParams.doors.replace(event.target.value.toLowerCase() + ',', '');
        } else {
          delete queryParams.doors;
        }
      }

      if (queryParams.seats && event.target.checked && event.target.id === 'filter-seats') queryParams.seats = queryParams.seats + ',' + event.target.value.toLowerCase();
      if (!queryParams.seats && event.target.checked && event.target.id === 'filter-seats') queryParams.seats = event.target.value.toLowerCase();

      if (queryParams.seats && !event.target.checked && event.target.id === 'filter-seats') {
        if (queryParams.seats.includes(',' + event.target.value.toLowerCase())) {
          queryParams.seats = queryParams.seats.replace(',' + event.target.value.toLowerCase(), '');
        } else if (queryParams.seats.includes(event.target.value.toLowerCase() + ',')) {
          queryParams.seats = queryParams.seats.replace(event.target.value.toLowerCase() + ',', '');
        } else {
          delete queryParams.seats;
        }
      }
    }

    setQuery(queryParams);
  };

  const filterCount = (filterKey, filterValue) => {
    const withoutCurrentParams = { ...params
    };

    if (filterKey === 'make') {
      delete withoutCurrentParams.make;
      delete withoutCurrentParams.model;
    }

    if (filterKey === 'model') delete withoutCurrentParams.model;
    if (filterKey === 'minPrice') delete withoutCurrentParams.minPrice;
    if (filterKey === 'maxPrice') delete withoutCurrentParams.maxPrice;
    if (filterKey === 'minYear') delete withoutCurrentParams.minYear;
    if (filterKey === 'maxYear') delete withoutCurrentParams.maxYear;
    if (filterKey === 'maxMiles') delete withoutCurrentParams.maxMiles;
    if (filterKey === 'bodyType') delete withoutCurrentParams.bodyType;
    if (filterKey === 'fuelType') delete withoutCurrentParams.fuelType;
    if (filterKey === 'gearbox') delete withoutCurrentParams.gearbox;
    if (filterKey === 'doors') delete withoutCurrentParams.doors;
    if (filterKey === 'seats') delete withoutCurrentParams.seats;
    const filtered = vehicles.filter(vehicle => {
      return (withoutCurrentParams.make ? withoutCurrentParams.make.toLowerCase() === vehicle.make.name.toLowerCase() || withoutCurrentParams.make.toLowerCase() === 'any' : vehicle) && (withoutCurrentParams.model ? withoutCurrentParams.model.toLowerCase() === vehicle.model.name.toLowerCase() || withoutCurrentParams.model.toLowerCase() === 'any' : vehicle) && (withoutCurrentParams.minPrice ? withoutCurrentParams.minPrice <= vehicle.price || withoutCurrentParams.minPrice.toLowerCase() === 'any' : vehicle) && (withoutCurrentParams.maxPrice ? withoutCurrentParams.maxPrice >= vehicle.price || withoutCurrentParams.maxPrice.toLowerCase() === 'any' : vehicle) && (withoutCurrentParams.minYear ? withoutCurrentParams.minYear <= vehicle.yearOfManufacture || withoutCurrentParams.minYear.toLowerCase() === 'any' : vehicle) && (withoutCurrentParams.maxYear ? withoutCurrentParams.maxYear >= vehicle.yearOfManufacture || withoutCurrentParams.maxYear.toLowerCase() === 'any' : vehicle) && (withoutCurrentParams.maxMiles ? withoutCurrentParams.maxMiles >= vehicle.mileage || withoutCurrentParams.maxMiles.toLowerCase() === 'any' : vehicle) && (withoutCurrentParams.bodyType ? withoutCurrentParams.bodyType.toLowerCase().includes(vehicle.bodyType.toLowerCase()) || withoutCurrentParams.bodyType.toLowerCase() === 'any' : vehicle) && (withoutCurrentParams.fuelType ? withoutCurrentParams.fuelType.toLowerCase().includes(vehicle.fuelType.toLowerCase()) || withoutCurrentParams.fuelType.toLowerCase() === 'any' : vehicle) && (withoutCurrentParams.gearbox ? withoutCurrentParams.gearbox.toLowerCase().includes(vehicle.gearbox.toLowerCase()) || withoutCurrentParams.gearbox.toLowerCase() === 'any' : vehicle) && (withoutCurrentParams.doors ? withoutCurrentParams.doors.toLowerCase().includes(vehicle.doors) || withoutCurrentParams.doors.toLowerCase() === 'any' : vehicle) && (withoutCurrentParams.seats ? withoutCurrentParams.seats.toLowerCase().includes(vehicle.seats) || withoutCurrentParams.seats.toLowerCase() === 'any' : vehicle);
    });
    const count = filtered.filter(vehicle => {
      if (filterKey === 'make') return filterValue === vehicle.make.name || filterValue === 'Any' || filterValue === 'any';
      if (filterKey === 'model') return filterValue === vehicle.model.name || filterValue === 'Any' || filterValue === 'any';
      if (filterKey === 'minPrice') return filterValue <= vehicle.price || filterValue === 'Any' || filterValue === 'any';
      if (filterKey === 'maxPrice') return filterValue >= vehicle.price || filterValue === 'Any' || filterValue === 'any';
      if (filterKey === 'minYear') return filterValue <= vehicle.yearOfManufacture || filterValue === 'Any' || filterValue === 'any';
      if (filterKey === 'maxYear') return filterValue >= vehicle.yearOfManufacture || filterValue === 'Any' || filterValue === 'any';
      if (filterKey === 'maxMiles') return filterValue >= vehicle.mileage || filterValue === 'Any' || filterValue === 'any';
      if (filterKey === 'bodyType') return filterValue === vehicle.bodyType || filterValue === 'Any' || filterValue === 'any';
      if (filterKey === 'fuelType') return filterValue === vehicle.fuelType || filterValue === 'Any' || filterValue === 'any';
      if (filterKey === 'gearbox') return filterValue === vehicle.gearbox || filterValue === 'Any' || filterValue === 'any';
      if (filterKey === 'doors') return filterValue === vehicle.doors || filterValue === 'Any' || filterValue === 'any';
      if (filterKey === 'seats') return filterValue === vehicle.seats || filterValue === 'Any' || filterValue === 'any';
      return false;
    }).length;
    return `(${count})`;
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    history.push(`?${query_string__WEBPACK_IMPORTED_MODULE_4__["stringify"](query)}`);
  }, [query]); // console.log('All -> ', vehicles)
  // console.log('Filtered -> ', filteredVehicles)
  // console.log('Makes -> ', makes)
  // console.log('Models -> ', models)
  // console.log('AgeFilters', ageFilters)
  // console.log(bodyTypesOptions)
  // console.log(fuelTypesOptions)
  // console.log(gearboxOptions)
  // console.log(doorOptions)
  // console.log(seatOptions)

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("section", {
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        className: "filters-container",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"], {
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Item, {
            eventKey: "0",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Header, {
              children: "Make and model"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 270,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Body, {
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
                className: "mb-3",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
                    children: "Make"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 274,
                    columnNumber: 21
                  }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
                    id: "filter-make",
                    name: "make",
                    className: "filter-select select-make",
                    "aria-label": "Select make",
                    onChange: event => {
                      filterChange(event);
                    },
                    children: makes.map(make => {
                      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("option", {
                        value: make.toLowerCase(),
                        selected: make.toLowerCase() === params.make,
                        children: [make, " ", filterCount('make', make)]
                      }, make, true, {
                        fileName: _jsxFileName,
                        lineNumber: 279,
                        columnNumber: 32
                      }, undefined);
                    })
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 275,
                    columnNumber: 21
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 273,
                  columnNumber: 19
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 272,
                columnNumber: 17
              }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
                className: "mb-3",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
                    children: "Model"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 286,
                    columnNumber: 21
                  }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
                    id: "filter-model",
                    className: "filter-select select-model",
                    "aria-label": "Select model",
                    onChange: event => {
                      filterChange(event);
                    },
                    children: models.map(model => {
                      const selectedMake = document.querySelector('#filter-make');
                      const modelCount = vehicles.filter(vehicle => (vehicle.model.name.toLowerCase() === model.toLowerCase() || model.toLowerCase() === 'any') && vehicle.make.name.toLowerCase() === selectedMake.value.toLowerCase()).length;
                      return selectedMake.value === 'any' && model === 'Any' ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("option", {
                        value: model,
                        children: [model, " ", filterCount('model', model)]
                      }, model, true, {
                        fileName: _jsxFileName,
                        lineNumber: 293,
                        columnNumber: 82
                      }, undefined) : modelCount > 0 && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("option", {
                        value: model,
                        selected: model.toLowerCase() === params.model,
                        children: [model, " ", filterCount('model', model)]
                      }, model, true, {
                        fileName: _jsxFileName,
                        lineNumber: 294,
                        columnNumber: 45
                      }, undefined);
                    })
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 287,
                    columnNumber: 21
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 285,
                  columnNumber: 19
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 284,
                columnNumber: 17
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 271,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 269,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Item, {
            eventKey: "1",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Header, {
              children: "Price"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 303,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Body, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
                className: "mb-3",
                children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
                    children: "Min"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 307,
                    columnNumber: 21
                  }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
                    id: "filter-min-price",
                    className: "filter-select select-min-price",
                    defaultValue: "Any",
                    "aria-label": "Select Min Price",
                    onChange: event => {
                      filterChange(event);
                    },
                    children: minPrice.map(price => {
                      const maxPriceElement = document.querySelector('#filter-max-price');
                      const available = price < maxPriceElement.value || maxPriceElement.value === 'Any' || maxPriceElement.value === 'all';
                      return (available || price === 'Any' || price === 'any') && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("option", {
                        id: "min-price",
                        value: price,
                        selected: parseInt(price) === parseInt(params.minPrice),
                        children: `${price === 'Any' ? 'Any' : '£' + (Math.round(price * 100) / 100).toLocaleString()} ${filterCount('minPrice', price)}`
                      }, price, false, {
                        fileName: _jsxFileName,
                        lineNumber: 314,
                        columnNumber: 85
                      }, undefined);
                    })
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 308,
                    columnNumber: 21
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 306,
                  columnNumber: 19
                }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
                    children: "Max"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 319,
                    columnNumber: 21
                  }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
                    id: "filter-max-price",
                    className: "filter-select select-max-price",
                    defaultValue: "Any",
                    "aria-label": "Select Max Price",
                    onChange: event => {
                      filterChange(event);
                    },
                    children: maxPrice.map(price => {
                      const minPriceElement = document.querySelector('#filter-min-price');
                      const available = price > minPriceElement.value || minPriceElement.value === 'Any' || minPriceElement.value === 'all';
                      return (available || price === 'Any' || price === 'any') && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("option", {
                        id: "max-price",
                        value: price,
                        selected: parseInt(price) === parseInt(params.maxPrice),
                        children: `${price === 'Any' ? 'Any' : '£' + (Math.round(price * 100) / 100).toLocaleString()} ${filterCount('maxPrice', price)}`
                      }, price, false, {
                        fileName: _jsxFileName,
                        lineNumber: 326,
                        columnNumber: 85
                      }, undefined);
                    })
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 320,
                    columnNumber: 21
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 318,
                  columnNumber: 19
                }, undefined)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 305,
                columnNumber: 17
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 304,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 302,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Item, {
            eventKey: "2",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Header, {
              children: "Age"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 335,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Body, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
                className: "mb-3",
                children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
                    children: "From (oldest)"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 339,
                    columnNumber: 21
                  }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
                    id: "filter-min-year",
                    className: "filter-select select-min-year",
                    defaultValue: "Any",
                    "aria-label": "Select Min Year",
                    onChange: event => {
                      filterChange(event);
                    },
                    children: ageFilters.map(year => {
                      const maxYearElement = document.querySelector('#filter-max-year');
                      const available = year < maxYearElement.value || maxYearElement.value === 'Any' || maxYearElement.value === 'all';
                      return (available || year === 'Any' || year === 'any') && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("option", {
                        id: "min-year",
                        value: year,
                        selected: parseInt(year) === parseInt(params.minYear),
                        children: `${year} ${filterCount('minYear', year)}`
                      }, year, false, {
                        fileName: _jsxFileName,
                        lineNumber: 346,
                        columnNumber: 83
                      }, undefined);
                    })
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 340,
                    columnNumber: 21
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 338,
                  columnNumber: 19
                }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
                    children: "To (newest)"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 351,
                    columnNumber: 21
                  }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
                    id: "filter-max-year",
                    className: "filter-select select-max-year",
                    defaultValue: "Any",
                    "aria-label": "Select Max Year",
                    onChange: event => {
                      filterChange(event);
                    },
                    children: ageFilters.map(year => {
                      const minYearElement = document.querySelector('#filter-min-year');
                      const available = year > minYearElement.value || minYearElement.value === 'Any' || minYearElement.value === 'all';
                      return (available || year === 'Any' || year === 'any') && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("option", {
                        id: "max-year",
                        value: year,
                        selected: parseInt(year) === parseInt(params.maxYear),
                        children: `${year} ${filterCount('maxYear', year)}`
                      }, year, false, {
                        fileName: _jsxFileName,
                        lineNumber: 358,
                        columnNumber: 83
                      }, undefined);
                    })
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 352,
                    columnNumber: 21
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 350,
                  columnNumber: 19
                }, undefined)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 337,
                columnNumber: 17
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 336,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 334,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Item, {
            eventKey: "3",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Header, {
              children: "Mileage"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 367,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Body, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
                className: "mb-3",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
                    children: "Miles"
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 371,
                    columnNumber: 21
                  }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Select, {
                    id: "filter-max-miles",
                    name: "maxMiles",
                    className: "filter-select select-max-miles",
                    "aria-label": "Select max miles",
                    onChange: event => {
                      filterChange(event);
                    },
                    children: miles.map(mile => {
                      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("option", {
                        value: mile,
                        selected: mile === params.maxMiles,
                        children: [`${mile === 'Any' ? 'Any' : 'Up to ' + (Math.round(mile * 100) / 100).toLocaleString() + ' miles'}`, " ", filterCount('maxMiles', mile)]
                      }, mile, true, {
                        fileName: _jsxFileName,
                        lineNumber: 376,
                        columnNumber: 32
                      }, undefined);
                    })
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 372,
                    columnNumber: 21
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 370,
                  columnNumber: 19
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 369,
                columnNumber: 17
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 368,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 366,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Item, {
            eventKey: "4",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Header, {
              children: "Body Type"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 385,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Body, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
                className: "mb-3",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
                    className: "mb-3",
                    controlId: "formBasicCheckbox",
                    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
                      checked: !params.bodyType,
                      id: "filter-body-type",
                      value: "Any",
                      type: "switch",
                      onChange: event => {
                        filterChange(event);
                      },
                      label: `Any ${filterCount('bodyType', 'Any')}`
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 390,
                      columnNumber: 23
                    }, undefined), bodyTypesOptions.map(bodyType => {
                      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
                        checked: params.bodyType ? params.bodyType.includes(bodyType[1].toLowerCase()) : false,
                        id: "filter-body-type",
                        value: bodyType[0],
                        type: "switch",
                        onChange: event => {
                          filterChange(event);
                        },
                        label: `${bodyType[1]}'s ${filterCount('bodyType', bodyType[1])}`
                      }, bodyType[0], false, {
                        fileName: _jsxFileName,
                        lineNumber: 394,
                        columnNumber: 32
                      }, undefined);
                    })]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 389,
                    columnNumber: 21
                  }, undefined)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 388,
                  columnNumber: 19
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 387,
                columnNumber: 17
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 386,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 384,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Item, {
            eventKey: "5",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Header, {
              children: "Fuel Type"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 406,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Body, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
                className: "mb-3",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
                    className: "mb-3",
                    controlId: "formBasicCheckbox",
                    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
                      checked: !params.fuelType,
                      id: "filter-fuel-type",
                      value: "Any",
                      type: "switch",
                      onChange: event => {
                        filterChange(event);
                      },
                      label: `Any ${filterCount('fuelType', 'Any')}`
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 411,
                      columnNumber: 23
                    }, undefined), fuelTypesOptions.map(fuelType => {
                      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
                        checked: params.fuelType ? params.fuelType.includes(fuelType[1].toLowerCase()) : false,
                        id: "filter-fuel-type",
                        value: fuelType[0],
                        type: "switch",
                        onChange: event => {
                          filterChange(event);
                        },
                        label: `${fuelType[1]} ${filterCount('fuelType', fuelType[1])}`
                      }, fuelType[0], false, {
                        fileName: _jsxFileName,
                        lineNumber: 415,
                        columnNumber: 32
                      }, undefined);
                    })]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 410,
                    columnNumber: 21
                  }, undefined)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 409,
                  columnNumber: 19
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 408,
                columnNumber: 17
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 407,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 405,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Item, {
            eventKey: "6",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Header, {
              children: "Gearbox"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 426,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Body, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
                className: "mb-3",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
                    className: "mb-3",
                    controlId: "formBasicCheckbox",
                    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
                      checked: !params.gearbox,
                      id: "filter-gearbox",
                      value: "Any",
                      type: "switch",
                      onChange: event => {
                        filterChange(event);
                      },
                      label: `Any ${filterCount('gearbox', 'Any')}`
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 431,
                      columnNumber: 23
                    }, undefined), gearboxOptions.map(gearbox => {
                      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
                        checked: params.gearbox ? params.gearbox.includes(gearbox[1].toLowerCase()) : false,
                        id: "filter-gearbox",
                        value: gearbox[0],
                        type: "switch",
                        onChange: event => {
                          filterChange(event);
                        },
                        label: `${gearbox[1]} ${filterCount('gearbox', gearbox[1])}`
                      }, gearbox[0], false, {
                        fileName: _jsxFileName,
                        lineNumber: 435,
                        columnNumber: 32
                      }, undefined);
                    })]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 430,
                    columnNumber: 21
                  }, undefined)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 429,
                  columnNumber: 19
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 428,
                columnNumber: 17
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 427,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 425,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Item, {
            eventKey: "7",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Header, {
              children: "Doors"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 446,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Body, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
                className: "mb-3",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
                    className: "mb-3",
                    controlId: "formBasicCheckbox",
                    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
                      checked: !params.doors,
                      id: "filter-doors",
                      value: "Any",
                      type: "switch",
                      onChange: event => {
                        filterChange(event);
                      },
                      label: `Any ${filterCount('doors', 'Any')}`
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 451,
                      columnNumber: 23
                    }, undefined), doorOptions.map(doors => {
                      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
                        checked: params.doors ? params.doors.includes(doors[1].toLowerCase()) : false,
                        id: "filter-doors",
                        value: doors[0],
                        type: "switch",
                        onChange: event => {
                          filterChange(event);
                        },
                        label: `${doors[1]} ${filterCount('doors', doors[1])}`
                      }, doors[0], false, {
                        fileName: _jsxFileName,
                        lineNumber: 455,
                        columnNumber: 32
                      }, undefined);
                    })]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 450,
                    columnNumber: 21
                  }, undefined)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 449,
                  columnNumber: 19
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 448,
                columnNumber: 17
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 447,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 445,
            columnNumber: 13
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Item, {
            eventKey: "8",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Header, {
              children: "Seats"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 466,
              columnNumber: 15
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Accordion"].Body, {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
                className: "mb-3",
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
                  children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
                    className: "mb-3",
                    controlId: "formBasicCheckbox",
                    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
                      checked: !params.seats,
                      id: "filter-seats",
                      value: "Any",
                      type: "switch",
                      onChange: event => {
                        filterChange(event);
                      },
                      label: `Any ${filterCount('seats', 'Any')}`
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 471,
                      columnNumber: 23
                    }, undefined), seatOptions.map(seats => {
                      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Check, {
                        checked: params.seats ? params.seats.includes(seats[1].toLowerCase()) : false,
                        id: "filter-seats",
                        value: seats[1],
                        type: "switch",
                        onChange: event => {
                          filterChange(event);
                        },
                        label: `${seats[1]} ${filterCount('seats', seats[1])}`
                      }, seats[0], false, {
                        fileName: _jsxFileName,
                        lineNumber: 475,
                        columnNumber: 32
                      }, undefined);
                    })]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 470,
                    columnNumber: 21
                  }, undefined)
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 469,
                  columnNumber: 19
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 468,
                columnNumber: 17
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 467,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 465,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 268,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 267,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        className: "vehichles-show-container mx-5",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
          className: "vehicles-title mt-5",
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("h1", {
            children: "All Cars "
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 490,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 489,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("hr", {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 492,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
          className: "vehicles-title mt-5",
          children: filteredVehicles.length > 0 && filteredVehicles.map(vehicle => {
            return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
              xs: "12",
              sm: "6",
              md: "4",
              lg: "6",
              xl: "3",
              xxl: "3",
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_FindVehiclesCard_js__WEBPACK_IMPORTED_MODULE_2__["default"], {
                vehicle: vehicle
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 497,
                columnNumber: 19
              }, undefined)
            }, vehicle.registrationNumber, false, {
              fileName: _jsxFileName,
              lineNumber: 496,
              columnNumber: 17
            }, undefined);
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 493,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 488,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 266,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 265,
    columnNumber: 5
  }, undefined);
};

_s(FindVehicles, "2PQVM8d3icYpxN7vWoP9U87HdqE=", false, function () {
  return [react_router__WEBPACK_IMPORTED_MODULE_5__["useLocation"], react_router__WEBPACK_IMPORTED_MODULE_5__["useHistory"]];
});

_c = FindVehicles;
/* harmony default export */ __webpack_exports__["default"] = (FindVehicles);

var _c;

__webpack_require__.$Refresh$.register(_c, "FindVehicles");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ })

})
//# sourceMappingURL=main.219504714373369c40e1.hot-update.js.map