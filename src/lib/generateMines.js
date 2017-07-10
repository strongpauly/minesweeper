import getCellKey from './getCellKey';

export default function(numMines, width, height) {
  let mines = new Map();
  for (let mineNumber = 0; mineNumber < numMines; mineNumber ++) {
    let setMine = false;
    while(!setMine) {
      let x = Math.round(Math.random() * (width - 1));
      let y = Math.round(Math.random() * (height - 1));
      let key = getCellKey(x, y);
      if(!mines.has(key)) {
        mines.set(key, {x: x, y:y});
        setMine = true;
      }
    }
  }
  return {
    mines,
    width,
    height
  };
}
