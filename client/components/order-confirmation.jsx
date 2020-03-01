import React from 'react';
import AppContext from '../lib/context';
import Title from './title';

class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paidCartItems: {}
    };
  }

  getOrderItems() {
    return this.context.confirmationDetail.cartItems.map((item, index) => `${item.name}*${item.quantity} `);
  }

  render() {
    let total = 0;
    this.context.confirmationDetail.cartItems.forEach(item => { total += item.price * item.quantity; });
    const { orderId, shippingAddress, firstName, lastName, emailAddress, phoneNumber, city, state, zipCode, country } = this.context.confirmationDetail.userInfo;
    return (
      <React.Fragment>
        <Title/>
        <div className="confirmation-container row">
          <div className="confirmation-title w-100 text-center font-weight-bold">
          Thank You For Your Order! {firstName} !
          </div>
          <div className="shipping-info-container">
            <p>Order Number: {orderId}</p>
            <p>Order items: {this.getOrderItems()}</p>
            <p>Total: {`$${(total / 100).toFixed(2)}`}</p>
            <p>Name: {`${firstName} ${lastName}`}</p>
            <p>Phone Number: {phoneNumber}</p>
            <p>Email Address: {emailAddress} </p>
            <p>Shipping Adreess: {shippingAddress}, {city}, {state}, {zipCode}, {country}</p>
          </div>
        </div>
        <button className="confirmation-back-button font-weight-bold mt-2 text-center"onClick={() => { this.props.history.push('/'); }}>{'Back to Catalog'} </button>
      </React.Fragment>
    );
  }
}

export default OrderConfirmation;
OrderConfirmation.contextType = AppContext;
