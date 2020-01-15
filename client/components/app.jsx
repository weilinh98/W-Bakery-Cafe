import React from 'react';
import Title from './title';
import ProductList from './product-list';
import ProductDetails from './product-details';
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

  render() {
    let productDisplay = null;
    if (this.state.view.name === 'catalog') {
      productDisplay = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      productDisplay = <ProductDetails productId={this.state.view.params.productId} setView={this.setView} addToCart= {this.addToCart}/>;
    }
    return (
      <div className="main-container">
        <Title cartNum={this.state.cart.length}/>
        {productDisplay}
      </div>
    );
  }

}
