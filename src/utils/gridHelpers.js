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
        row.push({ status: "empty", hover: false, hit: false, shipType: null });        
      }
    }
    grid.push(row);
  }
  return grid;
};

const isOccupied = (grid, row, col, rotated, ships, currentShip) => {
  let isTaken = false;
  if (!rotated) {
    if (row + ships[currentShip].size <= 11) {
      for (let i = 0; i < ships[currentShip].size; i++) {
        if (grid[row + i][col].status === "occupied") {
          isTaken = true;
        }
      }
    }
  } else {
    if (col + ships[currentShip].size <= 11) {
      for (let i = 0; i < ships[currentShip].size; i++) {
        if (grid[row][col + i].status === "occupied") {
          isTaken = true; 
        }
      }
    }
  }
  return isTaken; 
};

const placeShip = ({ grid, row, col, rotated, ships, currentShip }) => {
  if (isOccupied(grid, row, col, rotated, ships, currentShip)) {
    return {
      grid,
      isUpdated: false
    }
  } else {
    if (!rotated) {
      if (row + ships[currentShip].size <= 11) {
        for (let i = 0; i < ships[currentShip].size; i++) {
          grid[row + i][col].status = "occupied";
          grid[row + i][col].hover = false;
          // TODO: insert positions into this ship 
          // ships[currentShip].positions.push()
        }
      }
    } else {
      if (col + ships[currentShip].size <= 11) {
        for (let i = 0; i < ships[currentShip].size; i++) {
          grid[row][col + i].status = "occupied";
          grid[row + i][col].hover = false;
          // TODO: insert positions into this ship 
          // ships[currentShip].positions.push()
        }
      }
    }
    return {
      grid,
      ships,
      isUpdated: true
    }
  }
};

const hoverUpdate = ({ grid, row, col, rotated, type, ships, currentShip }) => {
  const bool = type === "enter" ? true : false;
  const position = grid[row][col];
  if (!rotated) {
    if (row + ships[currentShip].size <= 11) {
      for (let i = 0; i < ships[currentShip].size; i++) {
        grid[row + i][col].hover = bool;
      }
    }
  } else {
    if (col + ships[currentShip].size <= 11) {
      for (let i = 0; i < ships[currentShip].size; i++) {
        grid[row][col + i].hover = bool;
      }
    }
  }
  return grid;
};

const classUpdate = square => {
  let classes = "grid-square ";
  if (square.status === "occupied" && square.hover) {
    classes += "active-occupied";
  } else if (square.hover) {
    classes += "active";
  } else if (square.status === "occupied") {
    classes += "occupied";
  } else if (square.hit) {
    classes += "hit";
  }
  return classes;
};

module.exports = {
  gridGenerator,
  isOccupied,
  placeShip,
  hoverUpdate,
  classUpdate
};
