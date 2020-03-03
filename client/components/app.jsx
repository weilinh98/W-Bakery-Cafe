import React from 'react';
import AppContext from '../lib/context';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Swal from 'sweetalert2';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import OrderConfirmation from './order-confirmation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      confirmationDetail: {}
    };
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
    this.warningUp();
  }

  warningUp() {
    Swal.fire({
      title: 'Hey there!',
      text:
        "This is a demo site and no real purchase will be made. Please don't enter any personal information. ",
      background: 'pink',
      confirmButtonColor: 'rgb(114, 162, 250)',
      confirmButtonText: 'Cool'
    });
  }

  getCartItems() {
    const init = {
      method: 'GET'
    };
    fetch('/api/cart', init)
      .then(response => response.json())
      .then(cartData => {
        this.setState(state => ({ cart: cartData }));
      });
  }

  addToCart(productId, quantity, condition) {
    const reqBody = { productId: parseInt(productId), quantity: parseInt(quantity), condition };
    const init = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-type': 'application/json' }
    };
    fetch('/api/cart', init)
      .then(response => response.json())
      .then(data => {

        const cartCopy = [...this.state.cart];
        const cartItem = cartCopy.find(element => element.cartItemId === data.cartItemId);
        if (cartItem) {
          const index = cartCopy.findIndex(element => element.cartItemId === data.cartItemId);
          cartCopy[index] = data;
        } else {
          cartCopy.push(data);
        }
        this.setState(state => ({ cart: cartCopy }));
      });
  }

  placeOrder(information, callback) {
    const init = {
      method: 'POST',
      body: JSON.stringify(information),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('api/orders', init)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          this.setState(({ cart: [], confirmationDetail: data }), callback);
        } else {
          Swal.fire(data.error);
        }
      });
  }

  deleteItem(deleteInfo) {
    const init = {
      method: 'DELETE',
      body: JSON.stringify(deleteInfo),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('api/item', init)
      .then(data => {
        if (data.status === 204) {
          Swal.fire(
            'Deleted!',
            'Item has been removed from your cart!',
            'success'
          );
          const index = this.state.cart.findIndex(element => element.cartItemId === deleteInfo.cartItemId);
          const newCart = [...this.state.cart];
          newCart.splice(index, 1);
          this.setState(({ cart: newCart }));
        } else {
          Swal.fire(data.error);
        }
      });
  }

  render() {

    const context = {
      cart: this.state.cart,
      confirmationDetail: this.state.confirmationDetail,
      addToCart: this.addToCart,
      placeOrder: this.placeOrder,
      deleteItem: this.deleteItem
    };
    return (
      <AppContext.Provider value={context}>
        <div className="donuts-sales-container">
          <Router>
            <Route exact path="/" component={ProductList} />
            <Route path="/product-detail/:productid" component={ProductDetails} />
            <Route exact path="/cart" component={CartSummary} />
            <Route exact path="/checkout" component={CheckoutForm} />
            <Route exact path="/order-confirmation" component={OrderConfirmation} />
          </Router>
        </div>
      </AppContext.Provider>
    );
  }

}
