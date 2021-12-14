import axios from 'axios'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import FindVehicleCard from './FindVehiclesCard'
import { getPayload } from './helpers/auth'


const UserProfile = () => {
  document.title = 'CarTrader | My Profile'
  const [userSelling, setUserSelling] = useState([])
  const [userSold, setUserSold] = useState([])
  const [userBrought, setUserBrought] = useState([])
  const history = useHistory()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/auth/find/${payload.sub}`)
        // Get cars that the user is selling
        const salesData = await axios.get('/api/sales/')
        const allSales = salesData.data
        const selling = allSales.filter((sale) => sale.seller.id === data.id && sale.saleStatus.toLowerCase() === 'forsale')
        setUserSelling(selling)
        const sold = allSales.filter((sale) => sale.seller.id === data.id && sale.saleStatus.toLowerCase() === 'sold')
        setUserSold(sold)
        const buying = allSales.filter((sale) => sale.buyer && sale.buyer.id === data.id)
        setUserBrought(buying)
      } catch (err) {
        console.log(err)
        history.push('')
      }
    }
    getUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <section className="main-section">
      <Container style={{ paddingTop: '80px' }} >

        <Container style={{ margin: '40px 0', width: '100%' }} className="your-orders">
          <h2 className="place-advert-title">Cars you have purchased</h2>
          <Row className="vehicles-title">
            {userBrought.length > 0 ? userBrought.map((sale) => {
              return (
                <Col style={{ marginTop: '30px' }} key={sale.car.registrationNumber} xs="12" sm="6" md="4" lg="6" xl="4" xxl="3" >
                  <FindVehicleCard sale={sale} />
                </Col>
              )
            })
              :
              <Container style={{ margin: '40px', width: '100%' }}>
                <Row className="vehicles-title">
                  <Col>
                    You have not purchased anything yet.
                  </Col>
                </Row>
              </Container>
            }
          </Row>
        </Container>
        <Container style={{ margin: '40px 0', width: '100%' }} className="your-orders">
          <h2 className="place-advert-title">Cars you are selling</h2>
          <Row className="vehicles-title">
            {userSelling.length > 0 ? userSelling.map((sale) => {
              return (
                <Col style={{ marginTop: '30px' }} key={sale.car.registrationNumber} xs="12" sm="6" md="4" lg="6" xl="4" xxl="3" >
                  <FindVehicleCard sale={sale} />
                </Col>
              )
            })
              :
              <Container style={{ margin: '40px', width: '100%' }}>
                <Row className="vehicles-title">
                  <Col>
                    You are currently not selling anything.
                  </Col>
                </Row>
              </Container>
            }
          </Row>
        </Container>
        <Container style={{ margin: '40px 0', width: '100%' }} className="your-orders">
          <h2 className="place-advert-title">Cars you have sold</h2>
          <Row className="vehicles-title">
            {userSold.length > 0 ? userSold.map((sale) => {
              return (
                <Col style={{ marginTop: '30px' }} key={sale.car.registrationNumber} xs="12" sm="6" md="4" lg="6" xl="4" xxl="3" >
                  <FindVehicleCard sale={sale} />
                </Col>
              )
            })
              :
              <Container style={{ margin: '40px', width: '100%' }}>
                <Row className="vehicles-title">
                  <Col>
                    You have not sold anything yet.
                  </Col>
                </Row>
              </Container>
            }
          </Row>
        </Container>
      </Container>
    </section>
  )
}

export default UserProfile