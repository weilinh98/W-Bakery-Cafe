import React from 'react';

function ProductListItem(props) {
  const data = props.productInfo;
  const price = `$${(data.price / 100).toFixed(2)}`;
  return (
    <div className="card col-md-3 mr-5 mb-5">
      <img src={data.image} className="card-img-top"/>
      <div className="card-body" >
        <h5 className="card-title">{data.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{price}</h6>
        <p className="card-text">{data.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
