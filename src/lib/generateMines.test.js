/* eslint-env jest */
import generateMines from './generateMines';

describe('generateMines', () => {
  it('will generate 1 x 1', () => {
    let mines = generateMines(1, 1, 1);
    expect(mines.width).toEqual(1);
    expect(mines.height).toEqual(1);
    expect(mines.mines.has('0,0')).toEqual(true);
  });

  it('will generate larger grid', () => {
    let mines = generateMines(1, 30, 30);
    expect(mines.width).toEqual(30);
    expect(mines.height).toEqual(30);
    expect(mines.mines.size).toEqual(1);
  });

  it('will generate larger grid with more mines', () => {
    let mines = generateMines(30, 30, 30);
    expect(mines.width).toEqual(30);
    expect(mines.height).toEqual(30);
    expect(mines.mines.size).toEqual(30);
  });

  it('will generate larger grid almost completely full of mines', () => {
    let mines = generateMines(399, 20, 20);
    expect(mines.width).toEqual(20);
    expect(mines.height).toEqual(20);
    expect(mines.mines.size).toEqual(399);
  });

  it('will throw error if grid cannot contain mines', () => {
    expect( () => {
      generateMines(5, 2, 2);
    }).toThrow();
  });
});
