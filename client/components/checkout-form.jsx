import React from 'react';
import AppContext from '../lib/context';
import Title from './title';
import Swal from 'sweetalert2';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      creditCardNumber: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const property = event.target.name;
    const value = event.target.value;
    this.setState(state => ({ [property]: value }));
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.context.cart.length) {
      Swal.fire("You can't check out with nothing in your cart! ");
    } else {
      this.context.placeOrder(this.state);
      this.props.history.push('/');
    }
  }

  render() {
    const cartItems = this.context.cart;
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return (
      <React.Fragment>
        <Title />
        <div className="form-container">
          <div className="check-out-box row">
            <div className="check-out-title mb-4 col-12">
              <p>Check Out</p>
              <p>{'*Please DO NOT enter any personal information'}</p>
            </div>

            <div className="order-summary col-4">
              <p>{`Item Total: $${(total / 100).toFixed(2)}`}</p>
            </div>

            <div className="col-8 shipping-info-conatiner">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <p className="shipping-info-title">Shipping Info</p>
                </div>
                <div className="form-group row">
                  <div className="col-6">
                    <label>First Name</label>
                    <input type="text" required className="form-control" placeholder="First Name" autoComplete="off" name="firstName" minLength="2" maxLength="32" value={this.state.firstName} onChange={this.handleChange}/>
                  </div>
                  <div className="col-6">
                    <label>Last Name</label>
                    <input type="text" required className="form-control" placeholder="First Name" autoComplete="off" name="lastName" minLength="2" maxLength="32" value={this.state.lastName} onChange={this.handleChange}/>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-6">
                    <label>Email Address</label>
                    <input type="text" required className="form-control" placeholder="Email Address" autoComplete="off" name="emailAddress" minLength="6" maxLength="254" value={this.state.emailAddress} onChange={this.handleChange}/>
                  </div>
                  <div className="col-6">
                    <label>Phone Number</label>
                    <input type="text" required className="form-control" placeholder="Phone Number" autoComplete="off" name="phoneNumber" minLength="10" maxLength="10" value={this.state.phoneNumber} onChange={this.handleChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inputAddress">Credit Card Number</label>
                  <textarea
                    required
                    type="text"
                    className="form-control"
                    name="creditCardNumber"
                    onChange={this.handleChange}
                    value={this.state.creditCardNumber}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress2">Shipping Address</label>
                  <textarea
                    required
                    type="text"
                    className="form-control"
                    name="shippingAddress"
                    onChange={this.handleChange}
                    value={this.state.shippingAddress}
                  />
                </div>
                <div className="form-footer row">
                  <p className="col-8" onClick={() => { this.props.history.push('/'); }}>{'< Continue Shopping'} </p>
                  <button type="submit" className="place-order-button col4">
                Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckoutForm;
CheckoutForm.contextType = AppContext;
