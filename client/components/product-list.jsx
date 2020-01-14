import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const init = {
      method: 'GET'
    };
    fetch('/api/products', init)
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({ products: data }));
      })
    ;
  }

  render() {
    const data = this.state.products;
    const products = data.map(product => (<ProductListItem key={product.productId} productInfo={product} setView={this.props.setView}/>));
    return (
      <div className="products-container">
        <div className="row">
          {products}
        </div>
      </div>
    );
  }
}

export default ProductList;
