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

  render() {
    console.log(this.context.confirmationDetail);
    const { orderId, shippingAddress, firstName, lastName, emailAddress, phoneNumber, city, state, zipCode, country } = this.context.confirmationDetail.userInfo;
    return (
      <React.Fragment>
        <Title/>
        <div className="confirmation-container row">
          <div className="confirmation-title w-100 text-center">
          Thank You For Your Order! {firstName} !
          </div>
          <div className="shipping-info-container">
            <div className="shipping-info-title">Your Order Information:</div>
            <p>Order Number: {orderId}</p>
            <p>Name: {`${firstName} ${lastName}`}</p>
            <p>Phone Number: {phoneNumber}</p>
            <p>Email Address: {emailAddress} </p>
            <p>Shipping Adreess: {shippingAddress}, {city}, {state}, {zipCode}, {country}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OrderConfirmation;
OrderConfirmation.contextType = AppContext;
