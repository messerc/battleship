const makeShips = () => {
  return [
    {
      type: 'Carrier',
      size: 5,
      durability: 5,
      set: false,
      positions: []
    },
    {
      type: "Battleship",
      size: 4,
      durability: 4,
      set: false,
      positions: []
    },
    {
      type: "Cruiser",
      size: 3,
      durability: 3,
      set: false,
      positions: []
    },
    {
      type: "Submarine",
      size: 3,
      durability: 3,
      set: false,
      positions: []
    }
  ];
}

module.exports = {
  makeShips
}