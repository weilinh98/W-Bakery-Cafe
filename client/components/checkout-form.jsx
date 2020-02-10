import React from 'react';
import AppContext from '../lib/context';
import Title from './title';
import Swal from 'sweetalert2';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
      total += item.price;
    });
    return (
      <React.Fragment>
        <Title />
        <div className="form-container">
          <div className="form-title mb-4">
            <p>{"Enter Your Info Below (Please don't enter any personal information)"}</p>
            <p>{`Item Total: $${(total / 100).toFixed(2)}`}</p>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputEmail4">Full Name</label>
              <textarea
                required
                type="text"
                className="form-control"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
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
              <button type="submit" className="check-out-button col4">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckoutForm;
CheckoutForm.contextType = AppContext;
