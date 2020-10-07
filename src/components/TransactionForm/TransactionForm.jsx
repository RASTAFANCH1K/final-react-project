import React, { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { TextField, NativeSelect, InputLabel, Button } from '@material-ui/core';

const TransactionForm = ({ toys, onAddTransaction }) => {
  const initialState = {
    toys: [
      {
        id: "",
        name: "",
        quantity: 0,
        formId: uuidv4(),
      },
    ],
    type: 'incoming',
  };
  const [state, setState] = useState(initialState);

  const onFormSubmit = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      const transactionType = state.type;
      const transactionToys = state.toys
        .filter(toy => toy.id && toy.quantity)
        .map(toy => ({ id: toy.id, quantity: toy.quantity }));

      console.log('handleSubmit', { transactionType, transactionToys });

      if (transactionType && transactionToys.length) {
        onAddTransaction({ toys: transactionToys, type: transactionType });
        setState(initialState);
      }
    },
    [state, setState, initialState, onAddTransaction]
  );

  const onAddToy = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      setState({
        ...state,
        toys: [
          ...state.toys,
          {
            id: "",
            name: "",
            quantity: 0,
            formId: uuidv4(),
          },
        ],
      });
    },
    [state, setState]
  );

  const onDeleteToy = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      setState({
        ...state,
        toys: state.toys.filter((t) => t.formId !== e.target.name),
      });
    },
    [state, setState]
  );

  const onNameChange = useCallback(
    (e) => {
      const newStateToys = state.toys.map((t) => {
        if (e.target.name === `name${t.formId}`) {
          const toy = toys.find((toy) => toy.name === e.target.value);

          return {
            ...t,
            name: e.target.value,
            id: toy ? toy.id : "",
          };
        }

        return t;
      });

      setState({
        ...state,
        toys: newStateToys,
      });
    },
    [state, setState, toys]
  );

  const onQuantityChange = useCallback(
    (e) => {
      const newStateToys = state.toys.map((t) => {
        if (e.target.name === `quantity${t.formId}`) {
          return {
            ...t,
            quantity: parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value),
          };
        }

        return t;
      });

      setState({
        ...state,
        toys: newStateToys,
      });
    },
    [state, setState]
  );

  const onTypeChange = useCallback(
    (e) =>
      setState({
        ...state,
        type: e.target.value,
      }),
    [state, setState]
  );

  return (
    <form method="POST" onSubmit={onFormSubmit}>
      <div>
        <Button variant="outlined" onClick={onAddToy}>Add</Button>
      </div>
      {state.toys.map((toyState) => (
        <div className='transaction-form' key={toyState.formId}>
          <div className='form-control'>
            <InputLabel id="a">Categories</InputLabel>
            <NativeSelect
              id='a'
              name={`name${toyState.formId}`}
              value={toyState.name}
              onChange={onNameChange}
            >
              <option key='none' value=''></option>
              {toys.map((toy) => (
                <option key={toy.name} value={toy.name}>
                  {toy.name}
                </option>
              ))}
            </NativeSelect>
          </div>
          <div className='form-control'>
            <TextField
              label='Quantity'
              type="number"
              name={`quantity${toyState.formId}`}
              value={toyState.quantity}
              onChange={onQuantityChange}
              variant='outlined'
            />
          </div>
          <div className='form-control'>
            <InputLabel id="b">Type</InputLabel>
            <NativeSelect id='b' name="type" value={state.type} onChange={onTypeChange}>
              <option key='incoming' value='incoming'>
                incoming
              </option>
              <option key='outcoming' value='outcoming'>
                outcoming
              </option>
            </NativeSelect>
          </div>
          <div className='form-control'>
            <button name={toyState.formId } onClick={onDeleteToy}>Delete</button>
          </div>  
        </div>
      ))}
      <div>
        <Button variant="outlined" type="submit">Send</Button>
      </div>
    </form>
  );
};

export default TransactionForm;