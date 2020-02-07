import React from 'react';
import AppContext from '../lib/context';
import { Link } from 'react-router-dom';
import Title from './title';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null
    };
  }

  render() {
    const cartItems = this.context.cart;
    let total = 0;
    cartItems.forEach(item => { total += item.price; });
    const display = cartItems.map(item => (<CartSummaryItem key={item.cartItemId} cartItem={item}/>));
    return (
      <React.Fragment>
        <Title />
        <div className="cart-container">
          <div className="cart-title">
            <Link to={'/'}>
              <p>{'< Back to Catalog'}</p>
            </Link>
            <p>My Cart</p>
          </div>
          {display}
          <div className="checkout-container row">
            <p className="total-price font-weight-bold col-9">
              Item Total: {`$${(total / 100).toFixed(2)}`}
            </p>
            <div className="checkout-button-container col-3">
              <Link to={'/checkout'}>
                <button type="button" className="btn btn-info">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CartSummary;
CartSummary.contextType = AppContext;
