import React from 'react';

function Title(props) {
  return (
    <div className="title p-3 mb-5 bg-dark text-white">
      <p className="store-name">$Wicked Sales</p>
      <div className="shopping-cart">
        <i className="fas fa-shopping-cart"></i>
        <p className="cart-amount">{props.cartNum}</p>
      </div>
    </div>
  );
}

export default Title;
