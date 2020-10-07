import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import * as generalActions from '../../store/actions/generalActions';

import Login from '../../components/Login/Login';
import Dashboard from '../../components/Dashboard/Dashboard';
import Toys from '../../components/Toys/Toys';
import Categories from '../../components/Categories/Categories';
import Transactions from '../../components/Transactions/Transactions'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generalActions.start());
  }, [dispatch]);

  return (
    <div className='container'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/logout'>
            <Redirect to='/login' />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/toys'>
            <Toys />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route exact path="/transactions">
            <Transactions />
          </Route>
          <Route exact path='/'>
            <Redirect to='/login' />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
};

export default App;