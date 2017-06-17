import React from 'react';
import Game from './Game';
import {shallow} from 'enzyme';

/* eslint-env jest */

describe('<Game>', () => {

  it('renders without crashing', () => {
    shallow(<Game width={10} height={10} numMines={10}/>);
  });

  it('has header', () => {
    const game = shallow(<Game width={0} height={0} numMines={0}/>);
    expect(game).toMatchSnapshot();
    expect(game.find('.header')).toHaveLength(1);
  });

  it('creates grid based on width and height', () => {
    const game = shallow(<Game width={2} height={2} numMines={0}/>);
    expect(game).toMatchSnapshot();
    expect(game.find('tr')).toHaveLength(2); //Height 2.
    expect(game.find('Cell')).toHaveLength(4); //Height 2 x Width 2.
  });

  it('shows number of mines in header', () => {
    const game = shallow(<Game width={1} height={2} numMines={1}/>);
    const numMines = game.find('.header .numMines');
    expect(numMines).toHaveLength(1);
    expect(numMines.text()).toEqual('1');
  });

  it('has completed class when game is won', () => {
    const game = shallow(<Game width={1} height={1} numMines={1}/>);
    expect(game).toMatchSnapshot();
    const numMines = game.find('.completed');
    expect(numMines).toHaveLength(1);
  });

});
