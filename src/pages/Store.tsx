import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from '../data/items.json'
import StoreItem from '../components/StoreItem'

function Store() {
  console.log()
  return (
    <>
      <h1>Store</h1>

      <Row md={2} xs={1} lg={3} className="gap-3">
        {data.map(item => (
          <Row key={item.id}>
            <StoreItem  {...item} />
          </Row>
        ))}
      </Row>

    </>
  )
}

export default Store