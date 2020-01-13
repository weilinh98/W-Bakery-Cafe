import React from 'react';
import Title from './title';
import ProductBoard from './product';
export default class App extends React.Component {
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
    return (
      <div className="main-container">
        <Title/>
        <ProductBoard productData={this.state.products}/>
      </div>
    );
  }
}
