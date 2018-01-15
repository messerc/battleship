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

const hoverUpdate = ({ grid, row, col, rotated, type }) => {
  const bool = type === "enter" ? true : false;
  const position = grid[row][col];
  position.hover = bool; 
  return grid;
};

const isSunk = (ship, row, col) => {
  let sunk = true;
  ship.positions.forEach(position => {
    if (!(position.hit)) {
      sunk = false;
    }
  });
  return sunk;
}

const placeMove = ({ grid, row, col, rotated, player, opponent }) => {
  if (grid[row][col].status !== "empty") {
    return grid;
  }
  let turnLog = [];
  turnLog.push(`${player} targeted ${dictionary[col]}${row}`)
  const opponentShipIdx = () => {
    let idx = 0;
    for (let i = 0; i < opponent.ships.length; i++) {
      if (opponent.ships[i].type === opponent.shipsGrid[row][col].type) {
        idx = i;
      }
    }
    return idx; 
  }
  const opponentShip = opponent.ships[opponentShipIdx()]; 
  if (opponent.shipsGrid[row][col].status === "occupied") {
    opponent.shipsGrid[row][col].status = "hit";
    turnLog.push("It's a hit!")
    opponentShip.positions.forEach(position => {
      if (position.row === row && position.col === col) {
        position.hit = true;
      }
    })
  } else {
    turnLog.push("It's a miss")
  }
  if (isSunk(opponentShip, row, col)) {
    opponentShip.positions.forEach(position => {
      const { row, col } = position;
      opponent.shipsGrid[row][col].status = "sunk"; 
    }); 
    turnLog.push(`${player} sank a ${opponentShip.type}!`)
  }
  grid[row][col].status = "occupied";
  return {
    grid,
    opponent,
    log: turnLog
  } 
};

const classUpdate = square => {
  let classes = "grid-square ";
  if (square.status === "occupied" && square.hover) {
    classes += "active-occupied";
  } else if (square.hover) {
    classes += "active";
  } else if (square.hit) {
    classes += "hit";
  } else if (square.miss) {
    classes += "miss";
  }
  return classes;
};

module.exports = {
  placeMove,
  hoverUpdate,
  classUpdate 
}