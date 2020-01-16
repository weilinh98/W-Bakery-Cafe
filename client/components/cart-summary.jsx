import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  const cartItems = props.cart;
  const display = cartItems.map(item => (<CartSummaryItem key={item.cartItemId} cartItem={item}/>));
  return (
    <div className="cart-container">
      <div className="cart-title">
        <p onClick={() => { props.setView('catalog', {}); }}>{'< Back to Catalog'}</p>
        <p>My Cart</p>
      </div>
      {display}
    </div>
  );
}

export default CartSummary;
