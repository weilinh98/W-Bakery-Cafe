import React from 'react';
import AppContext from '../lib/context';
import Title from './title';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails() {
    const productId = this.props.match.params.productid;
    const init = {
      method: 'GET'
    };
    fetch(`/api/products/${productId}`, init)
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({ product: data }));
      });
  }

  render() {
    const product = this.state.product;
    if (product === null) {
      return null;
    } else {
      const price = `$${(product.price / 100).toFixed(2)}`;
      return (
        <React.Fragment>
          <Title />
          <div className="product-detail-container">
            <div className="card">
              <div className="card-header back-to-catalog" onClick={() => { this.props.history.push('/'); }}>{'< Back to Catalog'}</div>
              <div className="card-body">
                <div>
                  <div className="product-image col">
                    <img src={product.image} />
                  </div>

                  <div className="short-description col">
                    <h4 className="card-title">{product.name}</h4>
                    <h5 className="price">{price}</h5>
                    <p className="description">{product.shortDescription}</p>
                    <button
                      type="button"
                      className="add-cart-button hvr-pulse"
                      onClick={() => {
                        this.context.addToCart(this.props.match.params.productid, 1, 'add');
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="long-description">
                  <p className="card-text">{product.longDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default ProductDetails;
ProductDetails.contextType = AppContext;
