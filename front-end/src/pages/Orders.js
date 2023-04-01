import React from 'react';
import PropTypes from 'prop-types';
import SaleCard from '../components/SaleCard';
import getLocalStorage from '../services/getLocalStorage';
import { getSalesByUserId } from '../services/requests';

export default class Orders extends React.Component {
  state = {
    orders: [],
  };

  async componentDidMount() {
    const userId = getLocalStorage('user', { id: 3 }).id;
    const newOrders = await getSalesByUserId(userId);
    this.setState({ orders: newOrders });
  }

  render() {
    const { history } = this.props;
    const { orders } = this.state;
    return (
      <div>
        {
          orders.map((s) => <SaleCard key={ s.id } details={ s } history={ history } />)
        }
      </div>
    );
  }
}

Orders.propTypes = {
  history: PropTypes.shape.isRequired,
};
