import React from 'react';

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
    this.props.placeOrder(this.state);
  }

  render() {
    return (
      <div className="form-container">

        <div className="form-title mb-4">
          <p>My Cart</p>
          <p>Item Total: $84.28</p>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputEmail4">Full Name</label>
            <textarea required type="text" className="form-control" name="name" onChange={this.handleChange} value={this.state.name}/>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Credit Card Number</label>
            <textarea required type="text" className="form-control" name="creditCardNumber" onChange={this.handleChange} value={this.state.creditCardNumber}/>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Shipping Address</label>
            <textarea required type="text" className="form-control" name="shippingAddress" onChange={this.handleChange} value={this.state.shippingAddress}/>
          </div>
          <div className="form-footer row">
            <p className="col-10" onClick={() => { this.props.setView('catalog', {}); }}>{'< Continue Shopping'} </p>
            <button type="submit" className="btn btn-primary">Place Order</button>
          </div>
        </form>
      </div>

    );
  }
}

export default CheckoutForm;
