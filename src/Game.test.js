import React from 'react';
import Game from './Game';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

import generateMines from './lib/generateMines';
import getCellKey from './lib/getCellKey';

/* eslint-env jest */

describe('<Game>', () => {
  jest.useFakeTimers();
  it('renders without crashing', () => {
    shallow(<Game mines={generateMines(10, 10, 10)}/>);
  });

  it('has header', () => {
    const game = shallow(<Game mines={generateMines(0, 0, 0)}/>);
    expect(game).toMatchSnapshot();
    expect(game.find('.header')).toHaveLength(1);
  });

  it('creates grid based on width and height', () => {
    const game = shallow(<Game mines={generateMines(0, 2, 2)}/>);
    expect(game).toMatchSnapshot();
    expect(game.find('tr')).toHaveLength(2); //Height 2.
    expect(game.find('Cell')).toHaveLength(4); //Height 2 x Width 2.
  });

  it('shows number of mines in header', () => {
    const game = shallow(<Game mines={generateMines(1, 1, 2)}/>);
    const numMines = game.find('.header .numMines');
    expect(numMines).toHaveLength(1);
    expect(numMines.text()).toEqual('1');
  });

  it('has completed class when game is won', () => {
    const game = shallow(<Game mines={generateMines(1, 1, 1)}/>);
    expect(game).toMatchSnapshot();
    const completed = game.find('.completed');
    expect(completed).toHaveLength(1);
  });

  function placeMines(width, height, theMines) {
    let mines = new Map();
    theMines.forEach( coord => {
      mines.set(getCellKey(coord.x, coord.y), coord);
    });
    return {
      width,
      height,
      mines
    };
  }

  it('will win loose game if mine is clicked', () => {
    const game = mount(<Game mines={placeMines(2, 1, [{x:1, y:0}])}/>);
    game.find('Cell td').at(1).simulate('click');
    expect(game.state('completed')).toEqual(true);
    expect(game.state('exploded')).toEqual(true);
  });

  it('will win game if empty cell is clicked', () => {
    const game = mount(<Game mines={placeMines(2, 1, [{x:1, y:0}])}/>);
    game.find('Cell td').at(0).simulate('click');
    expect(game.state('completed')).toEqual(true);
    expect(game.state('exploded')).toEqual(false);
  });

  it('will expand to win game if empty cell is clicked', () => {
    const game = mount(<Game mines={placeMines(30, 30, [{x:15, y:15}])}/>);
    game.find('Cell td').at(0).simulate('click');
    expect(game.state('completed')).toEqual(true);
    expect(game.state('exploded')).toEqual(false);
  });

  it('will call restart handler when status button is clicked', () => {
    const onRestart = sinon.spy();
    const game = mount(<Game mines={generateMines(1, 30, 30)} onRestart={onRestart}/>);
    game.find('.status').simulate('click');
    expect(onRestart.calledOnce).toEqual(true);
  });

  it('will update mine count to match number marked', () => {
    const game = mount(<Game mines={generateMines(4, 30, 30)}/>);
    const numMines = game.find('.header .numMines');
    expect(numMines).toHaveLength(1);
    expect(numMines.text()).toEqual('4');
    game.find('Cell td').at(0).simulate('contextMenu');
    expect(numMines.text()).toEqual('3');
    game.find('Cell td').at(0).simulate('contextMenu');
    expect(numMines.text()).toEqual('4');
  });

  it('will update timer after game starts', () => {
    const game = mount(<Game mines={generateMines(2, 3, 3)}/>);
    const timer = game.find('.header .timer');
    expect(timer).toHaveLength(1);
    expect(timer.text()).toEqual(' ');
    game.find('Cell td').at(0).simulate('contextMenu');
    expect(timer.text()).toEqual('1');
    jest.runTimersToTime(1000);
    expect(timer.text()).toEqual('2');
  });

  it('wont update timer after game completed', () => {
    const game = mount(<Game mines={generateMines(1, 1, 1)}/>);
    const timer = game.find('.header .timer');
    expect(timer.text()).toEqual(' ');
    game.find('Cell td').at(0).simulate('contextMenu');
    expect(timer.text()).toEqual(' ');
    jest.runTimersToTime(1000);
    expect(timer.text()).toEqual(' ');
  });

});
