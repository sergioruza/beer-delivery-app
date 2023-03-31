import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { OrderDetails } from '../components';

export default class Order extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <OrderDetails history={ history } />
      </div>
    );
  }
}

Order.propTypes = {
  history: PropTypes.shape.isRequired,
};
