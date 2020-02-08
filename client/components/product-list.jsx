import React from 'react';
import Carousel from './carousel';
import ProductListItem from './product-list-item';
import Title from './title';

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
    const products = data.map(product => (<ProductListItem key={product.productId} productInfo={product} push={this.props.history.push}/>));
    return (
      <React.Fragment>
        <Title />
        <Carousel />
        <div className="products-container container">
          <div className="row">{products}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductList;
