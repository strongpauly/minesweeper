import React from 'react';
import Cell from './Cell';
import {mount, shallow} from 'enzyme';
import sinon from 'sinon';

/* eslint-env jest */

describe('<Cell>', () => {

  it('renders without crashing', () => {
    shallow(<Cell x={0} y={0}/>);
  });

  it('has "cell" css class', () => {
    const cell = shallow(<Cell x={0} y={0}/>);
    expect(cell).toMatchSnapshot();
    expect(cell.find('.cell')).toHaveLength(1);
  });

  it('initialised with checked has "checked" class', () => {
    const cell = shallow(<Cell x={0} y={0} checked={true}/>);
    expect(cell).toMatchSnapshot();
    expect(cell.find('.checked')).toHaveLength(1);
  });

  it('initialised with mine has "mine" class', () => {
    const cell = shallow(<Cell x={0} y={0} mine={true}/>);
    expect(cell).toMatchSnapshot();
    expect(cell.find('.mine')).toHaveLength(1);
  });

  it('initialised with mine shows mine img', () => {
    const cell = shallow(<Cell x={0} y={0} mine={true}/>);
    expect(cell).toMatchSnapshot();
    expect(cell.find('img')).toHaveLength(1);
  });

  it('initialised with marked has "marked" class', () => {
    const cell = shallow(<Cell x={0} y={0} marked={true}/>);
    expect(cell).toMatchSnapshot();
    expect(cell.find('.marked')).toHaveLength(1);
  });

  it('with a marked mine show an X', () => {
    const cell = shallow(<Cell x={0} y={0} mine={true} marked={true}/>);
    expect(cell).toMatchSnapshot();
    expect(cell.find('td').text()).toEqual('X');
  });

  it('initialised with an adjacent count, renders that count with "count-" class', () => {
    const cell = shallow(<Cell x={0} y={0} checked={true} adjacentCount={1}/>);
    expect(cell).toMatchSnapshot();
    expect(cell.find('.count-1')).toHaveLength(1);
    expect(cell.find('td').text()).toEqual('1');
  });

  it('click fires onCheck handler', () => {
    const onCheck = sinon.spy();
    let table = mount(<table><tbody><tr><Cell x={0} y={0} onCheck={onCheck}/></tr></tbody></table>);
    table.find('td').simulate('click');
    expect(onCheck.calledOnce).toEqual(true);
  });

  it('context menu fires onMarked handler', () => {
    const onMark = sinon.spy();
    let table = mount(<table><tbody><tr><Cell x={0} y={0} onMark={onMark}/></tr></tbody></table>);
    table.find('td').simulate('contextMenu');
    expect(onMark.calledOnce).toEqual(true);
  });

  it('click won\'t fire onCheck if checked is true', () => {
    const onCheck = sinon.spy();
    let table = mount(<table><tbody><tr><Cell x={0} y={0} onCheck={onCheck} checked={true}/></tr></tbody></table>);
    let td = table.find('td');
    td.simulate('click');
    expect(onCheck.calledOnce).toEqual(false);
  });

  it('click won\'t fire onCheck if marked is true', () => {
    const onCheck = sinon.spy();
    let table = mount(<table><tbody><tr><Cell x={0} y={0} onCheck={onCheck} marked={true}/></tr></tbody></table>);
    let td = table.find('td');
    td.simulate('click');
    expect(onCheck.calledOnce).toEqual(false);
  });

  it('click won\'t fire onMark if checked is true', () => {
     const onMark = sinon.spy();
    let table = mount(<table><tbody><tr><Cell x={0} y={0} onMark={onMark} checked={true}/></tr></tbody></table>);
    table.find('td').simulate('contextMenu');
    expect(onMark.calledOnce).toEqual(false);
  });
});
