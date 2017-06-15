import React from 'react';
import ReactDOM from 'react-dom';
import Cell from './Cell';

/* eslint-env jest */

it('renders without crashing', () => {
  const table = document.createElement('table');
  const tr = document.createElement('tr', table);
  ReactDOM.render(<Cell />, tr);
});
