import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Button, Box } from '@mui/material';
import { OrderDetails, Header } from '../components';
import { getOrdersByUserId, patchSale } from '../services/requests';
import getLocalStorage from '../services/getLocalStorage';

const informationSX = {
  fontSize: '1.1em',
  color: 'white',
};

const emTransito = 'Em Trânsito';

const totalSX = {
  width: 'auto',
  backgroundColor: 'white',
  m: '20px auto',
  textAlign: 'center',
  fontSize: '2em',
  boxSizing: 'border-box',
};

export default class Order extends Component {
  state = {
    order: {},
    renderDetails: false,
    userType: '',
    status: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const pathName = history.location.pathname.split('/');
    const userId = getLocalStorage('user', { id: 3 }).id;
    const allOrders = await getOrdersByUserId(userId);
    const order = allOrders.find((o) => o.id === Number(pathName[3]));
    this.setState({
      order,
      renderDetails: true,
      userType: pathName.at(1),
      status: order.status,
    });
  }

  updateStatus = async (id, status) => {
    const user = getLocalStorage('user', { id: 3 });
    await patchSale('/orders', { id, status, token: user.token });
    this.setState({ status });
  };

  render() {
    const { history } = this.props;
    const { order, renderDetails, userType, status } = this.state;
    const ROUTE = `${userType}_order_details__`;
    const formatedDate = new Date(order.saleDate).toLocaleDateString('pt-BR');
    const ELEMENT_DETAILS = 'element-order-details-label-';
    return (
      <Box component="div">
        <Header history={ history } />
        <Container>
          <Container
            sx={ { display: 'flex', m: '40px 0', justifyContent: 'space-between' } }
          >
            <Box
              component="span"
              data-testid={ `${ROUTE}${ELEMENT_DETAILS}order-id` }
              sx={ informationSX }
            >
              {order.id}
            </Box>
            {userType === 'customer' && (
              <Box component="div" sx={ informationSX }>
                P. Vend:
                {' '}
                <Box
                  component="span"
                  data-testid={ `${ROUTE}${ELEMENT_DETAILS}seller-name` }
                >
                  {order.sellerName}
                </Box>
              </Box>
            )}
            <Box
              component="span"
              data-testid={ `${ROUTE}${ELEMENT_DETAILS}order-date` }
              sx={ informationSX }
            >
              {formatedDate}
            </Box>
            <Box
              component="span"
              data-testid={ `${ROUTE}${ELEMENT_DETAILS}delivery-status` }
              sx={ informationSX }
            >
              { status}
            </Box>
            {userType === 'customer' && (

              <Button
                variant="contained"
                color="secondary"
                type="button"
                disabled={ status !== emTransito }
                onClick={ () => this.updateStatus(order.id, 'Entregue') }
                data-testid={ `${ROUTE}button-delivery-check` }
              >
                {status !== 'Entregue' ? 'Marcar como entregue' : 'Ja foi entregue'}
              </Button>
            )}
            {userType === 'seller' && (
              <Box component="div">
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={ () => this.updateStatus(order.id, 'Preparando') }
                  data-testid="seller_order_details__button-preparing-check"
                  disabled={ status !== 'Pendente' }
                >
                  PREPARAR PEDIDO
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={ () => this.updateStatus(order.id, emTransito) }
                  data-testid="seller_order_details__button-dispatch-check"
                  disabled={ status !== 'Preparando' }
                >
                  SAIU PARA ENTREGA
                </Button>
              </Box>
            )}
          </Container>
        </Container>
        <Container>
          {
            renderDetails && (
              <OrderDetails
                orderProducts={ order.products }
                totalOrder={ order.totalPrice }
                history={ history }
              />)
          }
        </Container>
        <Container sx={ totalSX }>
          Total: R$
          { order.totalPrice}
        </Container>
      </Box>
    );
  }
}

Order.propTypes = {
  history: PropTypes.shape.isRequired,
};
