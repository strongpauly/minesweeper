import React from 'react';
import Cell from './Cell';
import renderer from 'react-test-renderer';

/* eslint-env jest */

describe('Cell', () => {

  function render(){
    return renderer.create(<Cell x={0} y={0}/>);
  }

  it('renders without crashing', () => {
    render();
  });

  it('has not changed', () => {
    let cell = render().toJSON();
    expect(cell).toMatchSnapshot();
  });
});
