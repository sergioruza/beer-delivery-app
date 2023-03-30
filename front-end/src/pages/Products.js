import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from '../components/Header';
import getLocalStorage from '../services/getLocalStorage';

export default class Products extends Component {
  render() {
    const { history } = this.props;
    const type = history.location.pathname.split('/')[1];
    const username = getLocalStorage('name', 'Matheus');
    // console.log(type);

    return (
      <div>
        <Header userName={ username } type={ type } history={ history } />
      </div>

    );
  }
}

Products.propTypes = {
  history: PropTypes.shape.isRequired,
};
