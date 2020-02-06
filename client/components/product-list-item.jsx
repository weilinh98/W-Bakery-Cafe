import React from 'react';

function ProductListItem(props) {
  const data = props.productInfo;
  const price = `$${(data.price / 100).toFixed(2)}`;
  return (
    <div
      className="card col-md-5 p-2 mb-2 mr-2"
      onClick={() => {
        props.setView('details', { productId: data.productId });
      }}
    >
      <img src={data.image} className="card-img-top" />
      <div className="card-body">
        <div className="card-title">{data.name}</div>
        <div className="card-subtitle mb-2">{price}</div>
        <p className="card-text">{data.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
