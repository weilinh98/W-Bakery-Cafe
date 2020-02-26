import React from 'react';
import AppContext from '../lib/context';
import Title from './title';

class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <React.Fragment>
        <Title/>
        <p>
          {this.context.confirmationDetail}
        </p>
      </React.Fragment>
    );
  }
}

export default OrderConfirmation;
OrderConfirmation.contextType = AppContext;
