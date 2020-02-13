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
  }

  handleChange(event) {
    this.context.addToCart(this.props.cartItem.productId, event.target.value, 'update');
    this.setState({ quantity: event.target.value });
  }

  getOptions() {
    const array = [];
    for (let i = 1; i < 101; i++) {
      const option = <option key={i} value={i}>{i}</option>;
      array.push(option);
    }
    return array;
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
        Swal.fire(
          'Deleted!',
          'Item has been removed from your cart!',
          'success'
        );
        this.props.delete(deleteInfo);
      }
    });
  }

  render() {
    const item = this.props.cartItem;
    const quantity = item.quantity;
    const price = `$${(item.price * quantity / 100).toFixed(2)}`;
    const deleteInfo = { cartItemId: item.cartItemId, productId: item.productId };
    const options = this.getOptions();
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
              <select onChange={this.handleChange} value={this.state.quantity}>{options}</select>
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
