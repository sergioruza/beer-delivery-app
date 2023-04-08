import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  Box,
  TextField,
  FormControl,
} from '@mui/material';
import React, { Component } from 'react';
import { Header, OrderDetails } from '../components';
import { createSale } from '../services/requests';
import getLocalStorage from '../services/getLocalStorage';
import { AppConsumer } from '../context/appContext';
import getTotalPrice from '../utils/getTotalPrice';

const marginSX = {
  p: 2,
  backgroundColor: 'white',
  margin: ' 10px auto',
};
const containerFlex = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: ' 10px auto',
  width: '50vw',
};

export default class Checkout extends Component {
  state = {
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '',
    sellerName: 'Fulana Pereira',
  };

  componentDidMount() {
    this.setState({ totalPrice: getTotalPrice() });
  }

  createNewSale = async (setCarValue) => {
    const { history } = this.props;

    const user = getLocalStorage('user', { name: 'romulo' });
    const products = getLocalStorage('carrinho', []);

    const saleBody = { ...this.state, user, products };

    const sale = await createSale(saleBody);

    localStorage.removeItem('carrinho');
    setCarValue(getTotalPrice().toFixed(2));

    history.push(`/customer/orders/${sale.id}`);
  };

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  render() {
    const { history } = this.props;
    const { deliveryAddress, deliveryNumber, sellerName } = this.state;

    return (
      <AppConsumer>
        {({ setCarValue }) => (
          <>
            <Header history={ history } />
            <Container>
              <Typography
                variant="h4"
                sx={ { color: 'white', m: '20px 0' } }
              >
                Finalizar Pedido
              </Typography>
            </Container>

            <Container sx={ marginSX } size="small">
              <OrderDetails setCarValue={ setCarValue } history={ history } />
              <Typography variant="h5">Detalhes e Endereço para Entrega</Typography>
              <FormControl sx={ containerFlex }>
                <Box component="span">P.Vendedora Responsável</Box>
                <Select
                  sx={ { width: '50vw' } }
                  name="sellerName"
                  value={ sellerName }
                  size="small"
                  onClick={ this.handleChange }
                  data-testid="customer_checkout__select-seller"
                >
                  <MenuItem value="Fulana Pereira">Fulana Pereira</MenuItem>
                  {/* falta fazer require de sellers */}
                </Select>
                <TextField
                  sx={ { width: '24vw', m: '1vh 0.5vw' } }
                  name="deliveryAddress"
                  label="Endereço"
                  size="small"
                  focused
                  variant="filled"
                  color="secondary"
                  value={ deliveryAddress }
                  onChange={ this.handleChange }
                  data-testid="customer_checkout__input-address"
                />
                <TextField
                  sx={ { width: '24vw', m: '1vh 0.5vw' } }
                  name="deliveryNumber"
                  label="Número"
                  size="small"
                  focused
                  variant="filled"
                  color="secondary"
                  value={ deliveryNumber }
                  onChange={ this.handleChange }
                  data-testid="customer_checkout__input-address-number"
                />
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={ { width: '50vw', m: '1vh 0.5vw' } }
                  name="finishOrder"
                  onClick={ () => this.createNewSale(setCarValue) }
                  data-testid="customer_checkout__button-submit-order"
                >
                  FINALIZAR PEDIDO
                </Button>
              </FormControl>
            </Container>
          </>
        )}
      </AppConsumer>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape.isRequired,
};
