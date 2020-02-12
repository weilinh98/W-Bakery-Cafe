import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ quantity: event.target.value });
  }

  getOptions() {
    const array = [];
    for (let i = 1; i < 101; i++) {
      const option = <option key= {i} value = {i}>{i}</option>;
      array.push(option);
    }
    return array;
  }

  render() {
    const item = this.props.cartItem;
    const price = `$${(item.price / 100).toFixed(2)}`;
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
                  this.props.delete(deleteInfo);
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
