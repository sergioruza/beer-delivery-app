import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Login, Products, Register, Checkout, Order, Seller } from './pages';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><Redirect to="/login" /></Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/costumer/checkout" component={ Checkout } />
        <Route exact path="/costumer/orders" component={ Order } />
        <Route exact path="/costumer/orders/:id" component={ Order } />
        <Route exact path="/seller/products" component={ Products } />
        <Route exact path="/seller/orders" component={ Seller } />
        <Route exact path="/seller/orders/:id" component={ Seller } />
        <Route exact path="/administrator/products" component={ Products } />
      </Switch>
    </div>
  );
}

export default App;
