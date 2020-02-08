import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../lib/context';

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: null
    };
  }

  render() {
    return (
      <div className="title p-3">
        <div className="store-name glow">♥ .W Bakery & Cafe. ♥ </div>
        <div className="shopping-cart">
          <Link to={'/cart'}>
            <img
              className="cart-logo"
              src="https://img.icons8.com/dusk/64/000000/shopping-cart.png"
            />
          </Link>
          <p className="cart-amount">{this.context.cart.length}</p>
        </div>
      </div>
    );
  }
}

export default Title;
Title.contextType = AppContext;