import React from 'react';
import Game from './Game';
import {shallow} from 'enzyme';

/* eslint-env jest */

describe('<Game>', () => {

  it('renders without crashing', () => {
    shallow(<Game width={10} height={10} numMines={10}/>);
  });

  it('has header', () => {
    const cell = shallow(<Game width={0} height={0} numMines={0}/>);
    expect(cell).toMatchSnapshot();
    expect(cell.find('.header')).toHaveLength(1);
  });

  it('creates grid based on width and height', () => {
    const cell = shallow(<Game width={2} height={2} numMines={2}/>);
    expect(cell).toMatchSnapshot();
    expect(cell.find('tr')).toHaveLength(2); //Height 2.
    expect(cell.find('Cell')).toHaveLength(4); //Height 2 X Width 2.
  });

  it('shows number of mines in header', () => {
    const cell = shallow(<Game width={1} height={2} numMines={1}/>);
    expect(cell).toMatchSnapshot();
    const numMines = cell.find('.header .numMines');
    expect(numMines).toHaveLength(1);
    expect(numMines.text()).toEqual('1');
  });
});
