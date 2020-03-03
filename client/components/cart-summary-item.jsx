import React from 'react';
import Swal from 'sweetalert2';
import AppContext from '../lib/context';
class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.cartItem.quantity
    };
    this.handleChange = this.handleChange.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  handleChange(event) {
    const value = parseInt(event.target.value);
    if (value === 0 || value < 0 || isNaN(value)) {
      this.setState(state => ({ quantity: ' ' }));
    } else {
      this.context.addToCart(this.props.cartItem.productId, parseInt(event.target.value), 'update');
      this.setState({ quantity: value });
    }
  }

  increment() {
    const quantity = this.state.quantity + 1;
    this.context.addToCart(this.props.cartItem.productId, quantity, 'update');
    this.setState({ quantity });
  }

  decrement() {
    if (this.state.quantity > 1) {
      const quantity = this.state.quantity - 1;
      this.context.addToCart(this.props.cartItem.productId, quantity, 'update');
      this.setState({ quantity });
    }
  }

  confirmDelete(deleteInfo, productName) {
    Swal.fire({
      title: 'Really?',
      text: `Are you sure to remove ${productName} from your cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then(result => {
      if (result.value) {
        this.context.deleteItem(deleteInfo);
      }
    });
  }

  render() {
    const item = this.props.cartItem;
    const quantity = item.quantity;
    const price = `$${(item.price * quantity / 100).toFixed(2)}`;
    const deleteInfo = { cartItemId: item.cartItemId, productId: item.productId };
    return (
      <div className="card">
        <div className="card-body row">
          <div className="product-image col-5 mr-1">
            <img src={item.image} />
          </div>
          <div className="description col-6">
            <h4 className="card-title">{item.name}</h4>
            <h5 className="price">{price}</h5>
            <div className="row justify-content-center align-items-center
            ">
              <button
                className="delete-button mr-2"
                onClick={() => {
                  this.confirmDelete(deleteInfo, item.productName);
                }}
              >
                remove
              </button>
              <div className="quantity buttons_added">
                <input type="button" value="-" className="minus" onClick={this.decrement}/><input className="input-text qty text" value={this.state.quantity} onChange={this.handleChange}/><input type="button" value="+" className="plus" onClick={this.increment}/>
              </div>
            </div>
            <p className="short-description">{item.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
CartSummaryItem.contextType = AppContext;
