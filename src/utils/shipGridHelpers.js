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
    return null;
  } else {
    if (!rotated) {
      if (row + ships[currentShip].size <= 11) {
        for (let i = 0; i < ships[currentShip].size; i++) {
          grid[row + i][col].status = "occupied";
          grid[row + i][col].type = ships[currentShip].type;
          grid[row + i][col].hover = false;
          ships[currentShip].positions.push({ row: row + i, col, hit: false });
        }
        return {
          grid,
          ships
        };
      }
    } else {
      if (col + ships[currentShip].size <= 11) {
        for (let i = 0; i < ships[currentShip].size; i++) {
          grid[row][col + i].status = "occupied";
          grid[row][col + i].type = ships[currentShip].type;
          grid[row][col + i].hover = false;
          ships[currentShip].positions.push({ row, col: col + i, hit: false });
        }
        return {
          grid,
          ships
        };
      }
    }
  }
  return null;
};

const hoverUpdate = ({ grid, row, col, rotated, type, ships, currentShip }) => {
  const bool = type === "enter" ? true : false;
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
  } else if (square.status === "hit") {
    classes += "hit";
  } else if (square.status === "sunk") {
    classes += "sunk";
  }
  return classes;
};

module.exports = {
  placeShip,
  hoverUpdate,
  classUpdate
};
