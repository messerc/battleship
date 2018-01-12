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

const placeMove = ({ grid, row, col, rotated }) => {
  // place a move 
  if (grid[row][col].status === "occupied") {
    return grid;
  }
  grid[row][col].status = "occupied";
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
  placeMove,
  hoverUpdate,
  classUpdate 
}