import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { TextField, Button } from '@material-ui/core';

import * as authActions from '../../store/actions/authActions';

const Login = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (state.email && state.password) {
        dispatch(authActions.login(state));
        setState(initialState);
      }

      if (state.email === 'user@example.com' && state.password === '1234567890') {
        history.push('/dashboard');
      }
    },
    [state, setState, initialState, dispatch, history]
  );

  const onFormChange = useCallback(
    e =>
      setState({
        ...state,
        [e.target.name]: e.target.value,
      }),
    [state, setState]
  );

  const { email, password } = state;

  return (
    <div className='login-form'>
      <div className='login-form__wrap'>
        <form className='login-form__inner' method='POST' onSubmit={ onFormSubmit }>
          <TextField
            name='email'
            type='email'
            label='Email'
            placeholder='user@example.com'
            value={email}
            onChange={ onFormChange }
            variant="outlined"
          />
          <TextField
            name='password'
            type='password'
            label='Password'
            placeholder='1234567890'
            value={password}
            onChange={ onFormChange }
            variant="outlined"
          />
          <Button 
            type='submit'
            variant="outlined"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
