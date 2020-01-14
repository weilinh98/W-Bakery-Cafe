import React from 'react';
import Title from './title';
import ProductList from './product-list';
export default class App extends React.Component {

  render() {
    return (
      <div className="main-container">
        <Title/>
        <ProductList/>
      </div>
    );
  }
}
