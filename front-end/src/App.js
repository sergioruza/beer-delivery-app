import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Login, Products, Register, Checkout, Order, Orders } from './pages';
import ManagementAdm from './pages/ManagementAdm';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><Redirect to="/login" /></Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/orders" component={ Orders } />
        <Route exact path="/customer/orders/:id" component={ Order } />
        <Route exact path="/seller/orders" component={ Orders } />
        <Route exact path="/seller/orders/:id" component={ Order } />
        <Route exact path="/administrator/products" component={ Products } />
        <Route exact path="/admin/manage" component={ ManagementAdm } />
      </Switch>
    </div>
  );
}

export default App;
