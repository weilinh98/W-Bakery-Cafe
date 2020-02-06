import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  const cartItems = props.cart;
  let total = 0;
  cartItems.forEach(item => { total += item.price; });
  const display = cartItems.map(item => (<CartSummaryItem key={item.cartItemId} cartItem={item}/>));
  return (
    <div className="cart-container">
      <div className="cart-title">
        <p onClick={() => { props.setView('catalog', {}); }}>{'< Back to Catalog'}</p>
        <p>My Cart</p>
      </div>
      {display}
      <div className="checkout-container row">
        <p className="total-price font-weight-bold col-9">Item Total: {`$${(total / 100).toFixed(2)}`}</p>
        <div className="checkout-button-container col-3">
          <button type="button" className="btn btn-info" onClick={() => { props.setView('checkout', {}); }}>Check Out</button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
