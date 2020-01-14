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
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState(state => ({ view: { name, params } }));
  }

  render() {
    let productDisplay = null;
    if (this.state.view.name === 'catalog') {
      productDisplay = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      productDisplay = <ProductDetails productId={this.state.view.params.productId} setView={this.setView}/>;
    }
    return (
      <div className="main-container">
        <Title/>
        {productDisplay}
      </div>
    );
  }

}
