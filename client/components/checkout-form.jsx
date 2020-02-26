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
      nameOnCard: '',
      creditCardNumber: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      mm: new Date().getMonth() + 1,
      yy: new Date().getFullYear(),
      cvv: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const property = event.target.name;
    const value = event.target.value;
    if (property === 'state') {
      this.setState(state => ({ [property]: value.toUpperCase() }));
    } else if (property === 'city' || property === 'state' || property === 'firstName' || property === 'lastName') {
      if (isNaN(value.slice(-1)) || event.target.value === '') {
        this.setState(state => ({ [property]: value }));
      }
    } else if (property === 'nameOnCard') {
      if (isNaN(value.slice(-1)) || value.slice(-1) === ' ' || event.target.value === '') {
        this.setState(state => ({ [property]: value }));
      }
    } else {
      this.setState(state => ({ [property]: value }));
    }
  }

  handleNumberChange(event) {
    const property = event.target.name;
    const value = event.target.value;
    if (parseInt(value.slice(-1)) || event.target.value === '') {
      this.setState(state => ({ [property]: value }));
    }
  }

  getMonthSelect() {
    const array = [];
    let option;
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    if (this.state.yy === currentYear) {
      for (let i = currentMonth; i < 13; i++) {
        if (i.toString().length !== 1) {
          option = <option value={i} key={i}>{i}</option>;
        } else {
          option = <option value={i} key={i}>{`0${i}`}</option>;
        }
        array.push(option);
      }
    } else {
      for (let i = 1; i < 13; i++) {
        if (i.toString().length !== 1) {
          option = <option value = {i} key={i}>{i}</option>;
        } else {
          option = <option value = {i} key={i}>{`0${i}`}</option>;
        }
        array.push(option);
      }
    }
    return array;
  }

  getYearSelect() {
    const array = [];
    let option;
    const date = new Date();
    const currentYear = date.getFullYear();
    for (let i = currentYear; i < currentYear + 50; i++) {
      option = <option value = {i} key={i}>{i}</option>;
      array.push(option);
    }
    return array;
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

            <div className="col-8 shipping-info-container">
              <form onSubmit={this.handleSubmit}>

                <div className="form-group">
                  <p className="form-subtitle">Shipping Info</p>
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
                    <input type="text" required className="form-control" placeholder="Phone Number" autoComplete="off" name="phoneNumber" minLength="10" maxLength="10" value={this.state.phoneNumber} onChange={this.handleNumberChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label>Shipping Address</label>
                  <input type="text" required className="form-control" placeholder="Shipping Address" autoComplete="off" name="shippingAddress" minLength="6" maxLength="64" value={this.state.shippingAddress} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-3">
                      <label>City</label>
                      <input type="text" required className="form-control" placeholder="City" autoComplete="off" name="city" minLength="3" maxLength="50" value={this.state.city} onChange={this.handleChange} />
                    </div>
                    <div className="col-3">
                      <label>State</label>
                      <input type="text" required className="form-control" placeholder="State" autoComplete="off" name="state" minLength="2" maxLength="2" value={this.state.state} onChange={this.handleChange} />
                    </div>
                    <div className="col-3">
                      <label>Zip</label>
                      <input type="text" required className="form-control" placeholder="Zip Code" autoComplete="off" name="zipCode" minLength="5" maxLength="5" value={this.state.zipCode} onChange={this.handleNumberChange} />
                    </div>
                    <div className="col-3">
                      <label>Country</label>
                      <input type="text" required className="form-control" placeholder="Country" autoComplete="off" name="country" value="US"/>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <p className="form-subtitle">Payment Info</p>
                </div>

                <div className="form-group">
                  <label>Full Name On Card</label>
                  <input type="text" required className="form-control" placeholder="Full Name On Card" autoComplete="off" name="nameOnCard" minLength="5" maxLength="65" value={this.state.nameOnCard} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                  <label>Credit Card Number</label>
                  <input type="text" required className="form-control" placeholder="Credit Card Number" autoComplete="off" name="creditCardNumber" minLength="16" maxLength="16" value={this.state.creditCardNumber} onChange={this.handleNumberChange} />
                </div>

                <div className="form-group">
                  <label>Expiration Date</label>
                  <div className = "row col-10">
                    <select name="mm" value={this.state.mm} onChange={this.handleChange}>
                      {this.getMonthSelect()}
                    </select>
                    <select name="yy" value={this.state.yy} onChange={this.handleChange}>
                      {this.getYearSelect()}
                    </select>
                    <div className="col-6"><input type="text" className="form-control" placeholder="CVV" autoComplete="off" name="cvv" minLength="3" maxLength="3" value={this.state.cvv} onChange={this.handleNumberChange}/></div>
                  </div>
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
