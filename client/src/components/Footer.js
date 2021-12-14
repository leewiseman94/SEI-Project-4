import { Col, Row } from 'react-bootstrap'



const Footer = () => {

  return (
    <section style={{ backgroundColor: '#013e70', marginTop: '150px', padding: '60px 10px' }}>
      <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Col style={{ maxWidth: '800px' }}>
          <h6 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Need a hand? We are ready to help 8am-8pm, 7 days a week</h6>
          <p style={{ color: 'white', textAlign: 'center', fontSize: '12px', marginBottom: '20px' }}>All finance applications are subject to status, terms and conditions apply, UK residents only, 18s or over, Guarantees may be required.</p>
          <p style={{ color: 'white', textAlign: 'center', fontSize: '12px', marginBottom: '20px' }}>We accept all major Visa, Mastercard and American Express debit or credit cards.</p>
        </Col>
      </Row>
    </section>

  )
}

export default Footer