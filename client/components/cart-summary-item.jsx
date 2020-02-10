import React from 'react';

function CartSummaryItem(props) {
  const item = props.cartItem;
  const price = `$${(item.price / 100).toFixed(2)}`;
  const deleteInfo = { cartItemId: item.cartItemId, productId: item.productId };
  return (
    <div className="card">
      <div className="card-body row">

        <div className="product-image col-5 mr-1">
          <img src={item.image}/>
        </div>
        <div className="description col-6">
          <h4 className="card-title">{item.name}</h4>
          <div className= "row">
            <h5 className="price col-8">{price}</h5>
            <button className="delete-button" onClick={() => { props.delete(deleteInfo); }}>remove</button>
          </div>
          <p className="short-description">{item.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
