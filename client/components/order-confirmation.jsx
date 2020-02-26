import React from 'react';
import AppContext from '../lib/context';
import Title from './title';

class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { orderId, shippingAddress, firstName, lastName, emailAddress, phoneNumber, city, state, zipCode, country } = this.context.confirmationDetail;
    return (
      <React.Fragment>
        <Title/>
        <div className="confirmation-container row">
          <div className="confirmation-title w-100 text-center">
          Thank You For Your Order! {firstName} !
          </div>
          <div className="shipping-info-container">
            <div className="shipping-info-title">Shipping Information:</div>
            <p>Name: {`${firstName} ${lastName}`}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OrderConfirmation;
OrderConfirmation.contextType = AppContext;
