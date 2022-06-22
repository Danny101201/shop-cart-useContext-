import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShopCartContext'
import CartItem from './CartItem'
import ShopItems from '../data/items.json'
import { formatCurrency } from '../utility/formatCurrency'
function ShoppingCart() {
  const { closeCart, isOpen, cartItems } = useShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.map(cartItem => (
          <CartItem key={cartItem.id} {...cartItem} />
        ))}
        <div
          style={{
            textAlign: 'right'
          }}
          className=" fw-bold fs-5">
          Total{" "}
          {formatCurrency(
            cartItems.reduce((acc, cartItem) => {
              const item = ShopItems.find(item => item.id === cartItem.id)
              return acc + cartItem.quantity * (item?.price || 0)
            }, 0)
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart