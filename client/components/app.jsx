import React from 'react';
import Title from './title';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.viewCart = this.viewCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  setView(name, params) {
    this.setState(state => ({ view: { name, params } }));
  }

  componentDidMount() {
    this.getCartItems();
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

  addToCart(productId) {
    const reqBody = { productId };
    const init = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-type': 'application/json' }
    };
    fetch('api/cart', init)
      .then(response => response.json())
      .then(data => {
        const cartCopy = [...this.state.cart];
        cartCopy.push(data);
        this.setState(state => ({ cart: cartCopy }));
      });
  }

  viewCart() {
    this.setState(state => ({ view: { name: 'cart', params: {} } }));
  }

  placeOrder(information) {
    const init = {
      method: 'POST',
      body: JSON.stringify(information),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('api/orders', init)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          this.setState(state => ({ view: { name: 'catalog', params: {} }, cart: [] }));
        }
      });
  }

  render() {
    let productDisplay = null;
    if (this.state.view.name === 'catalog') {
      productDisplay = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      productDisplay = <ProductDetails productId={this.state.view.params.productId} setView={this.setView} addToCart= {this.addToCart}/>;
    } else if (this.state.view.name === 'cart') {
      productDisplay = <CartSummary cart={this.state.cart} setView={this.setView}/>;
    } else if (this.state.view.name === 'checkout') {
      productDisplay = <CheckoutForm setView={this.setView} placeOrder={this.placeOrder}/>;
    }
    return (
      <div className="main-container">
        <Title cartNum={this.state.cart.length} viewCart={this.viewCart}/>
        {productDisplay}
      </div>
    );
  }

}
