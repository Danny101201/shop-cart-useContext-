import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { formatCurrency } from '../utility/formatCurrency'
import { useShoppingCart } from '../context/ShopCartContext'
type StorItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}
function StoreItem({ id, name, price, imgUrl }: StorItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart
  } = useShoppingCart()
  const quantity = getItemQuantity(id) as React.ReactNode

  return (
    <Card style={{ padding: 0 }} className="h-100">
      <Card.Img
        variant='top'
        height="200px"
        style={{
          objectFit: 'cover'
        }}
        src={imgUrl} />
      <Card.Body>
        <Card.Title
          className="d-flex align-items-center justify-content-between mb-4"
        >
          <span className="fs-2">{name}</span>
          <span className="text-muted ms-3">{formatCurrency(price)}</span>
        </Card.Title>
        {quantity === 0 ?
          <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add To Cart</Button>
          :
          <div className="d-flex flex-column align-items-center justify-content-center gap-2">
            <div className="d-flex gap-2">
              <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              <div><span className="fs-2">{quantity}</span> in Cart</div>
              <Button onClick={() => increaseCartQuantity(id)}>+</Button>
            </div>
            <Button variant="danger" onClick={() => removeFromCart(id)}>Remove</Button>
          </div>
        }
      </Card.Body>
    </Card>
  )
}

export default StoreItem