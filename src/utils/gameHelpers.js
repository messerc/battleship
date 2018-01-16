const dictionary = {
  0: null,
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
  9: "I",
  10: "J"
}

const makeShips = () => {
  return [
    {
      type: 'Carrier',
      size: 5,
      positions: []
    },
    {
      type: "Battleship",
      size: 4,
      positions: []
    },
    {
      type: "Cruiser",
      size: 3,
      positions: []
    },
    {
      type: "Submarine",
      size: 3,
      positions: []
    },
    {
      type: "Destroyer",
      size: 2,
      positions: []
    }
  ];
}

const gridGenerator = () => {
  let grid = [];
  let length = 11;
  for (let i = 0; i < length; i++) {
    let row = [];
    for (let j = 0; j < length; j++) {
      if (i === 0) {
        row.push({ status: "label", label: dictionary[j] })
      } else if (i !== 0 && j === 0) {
        row.push({ status: "label", label: i });
      } else {
        row.push({ status: "empty", hover: false, hit: false, type: null });        
      }
    }
    grid.push(row);
  }
  return grid;
};

const createPlayer = () => {
  return {
    shipsGrid: gridGenerator(),
    movesGrid: gridGenerator(),
    ships: makeShips(),
    currentShip: 0,
    shipsSet: false,
    sunkenShips: 0
  }
}

const welcomeMessage = { 
  turn: "Welcome to battleship!",
  messages: ["Players first choose the positions that they would like their battleships to be on the Ship grids below. Once the second player has chosen ship positions, players have a few seconds to head up to the battle grids to fight.", "The Battle Grid identifies a miss with gray, a hit with light green, and a sunken ship with dark green. You can not hit the same spot twice.", "Once a player sinks all of the opponent's ships, the game is over!"]
}


module.exports = {
  createPlayer,
  welcomeMessage
}