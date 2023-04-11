import React from 'react';
import PropTypes from 'prop-types';
import SaleCard from '../components/orderCard';
import getLocalStorage from '../services/getLocalStorage';
import { getOrdersByUserId } from '../services/requests';
import { Header } from '../components';
import '../css/Orders.css';

export default class Orders extends React.Component {
  state = {
    orders: [],
  };

  async componentDidMount() {
    const userId = getLocalStorage('user', { id: 3 }).id;
    const newOrders = await getOrdersByUserId(userId);
    this.setState({ orders: newOrders });
  }

  render() {
    const { history } = this.props;
    const { orders } = this.state;
    return (
      <div>
        <Header history={ history } />
        <div className="orders-all-cards">
          {
            orders.map((s) => <SaleCard key={ s.id } details={ s } history={ history } />)
          }
        </div>
      </div>
    );
  }
}

Orders.propTypes = {
  history: PropTypes.shape.isRequired,
};
