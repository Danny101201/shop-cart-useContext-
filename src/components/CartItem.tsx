import React from 'react'
import { Stack, Button } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShopCartContext'
import StoreItem from '../data/items.json'
import { formatCurrency } from '../utility/formatCurrency'
type CartItemProp = {
  id: number,
  quantity: number
}
function CartItem({ id, quantity }: CartItemProp) {
  const { removeFromCart } = useShoppingCart()
  const item = StoreItem.find(item => item.id === id)
  if (!item) return null
  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="mb-3 d-flex align-items-center justify-content-between">
      <img
        src={item.imgUrl}
        style={{
          width: '125px',
          height: '75px',
          objectFit: 'cover'
        }}
        alt="" />

      <div className="me-auto">
        {item.name}{' '}
        <span className="text-muted" style={{ fontSize: ".65rem" }}>
          x{quantity}
        </span>
        <div>
          {formatCurrency(item.price)}
        </div>
      </div>

      <div>
        {formatCurrency(item.price * quantity)}
        <Button
          className="ms-2"
          variant='outline-danger'
          onClick={() => removeFromCart(id)}
        >X</Button>
      </div>
    </Stack>
  )
}

export default CartItem