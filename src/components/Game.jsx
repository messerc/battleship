import React, { Component } from "react";

import BattleGrid from "./BattleGrid";
import GameLog from "./GameLog";
import PlayerGrid from "./PlayerGrid";

import { gridGenerator, setPositions } from "../utils/gridHelpers";

import "../styles/Game.css";

const ships = [
  {
    type: 'Carrier',
    size: 5,
    durability: 5,
    set: false,
    positions: null
  },
  {
    type: "Battleship",
    size: 4,
    durability: 4,
    set: false,
    positions: null
  },
  {
    type: "Cruiser",
    size: 3,
    durability: 3,
    set: false,
    positions: null
  },
  {
    type: "Submarine",
    size: 3,
    durability: 3,
    set: false,
    positions: null
  }
];

export default class Game extends Component {
  constructor() {
    super();

    this.state = {
      activePlayer: "player1",
      player1: {
        shipsGrid: gridGenerator(),
        movesGrid: gridGenerator(),
        ships: ships.slice(),
        currentShip: 0,
        shipsSet: false,
      },
      player2: {
        shipsGrid: gridGenerator(),
        movesGrid: gridGenerator(),
        ships: ships.slice(),
        currentShip: 0,
        shipsSet: false
      },
      allShipsSet: false
    };

    this.updateGrid = this.updateGrid.bind(this);
    this.updateShips = this.updateShips.bind(this);
  }

  updateShips(player, updatedShips) {
    const { ships, currentShip, shipsSet } = this.state[player];
    let updatedPlayer;
    if (currentShip + 1 === ships.length) {
      updatedPlayer = {
        ...this.state[player],
        ships: updatedShips,
        shipsSet: true
      };
    } else {
      updatedPlayer = {
        ...this.state[player],
        ships: updatedShips,
        currentShip: currentShip + 1
      };
    }
    this.setState({
      [player]: updatedPlayer
    }); 
  }

  updateGrid(player, grid, type) {
    const updatedPlayer = {
      ...this.state[player],
      [this.state[player][type]]: grid
    };
    this.setState({
      [player]: updatedPlayer
    });
  }

  render() {
    const { player1, player2 } = this.state;
    return (
      <div className="game">
        <div className="title-container">
          <p className="title">Battleship</p>
        </div>
        <div className="shipgrid-container">
          <BattleGrid 
            grid={player1.movesGrid}
            opponent={player2.shipsGrid}
            updateGrid={this.updateGrid}
            player="player1" />
          <GameLog />
          <BattleGrid 
            grid={player2.movesGrid}
            opponent={player1.shipsGrid}
            updateGrid={this.updateGrid}
            player="player2" />
        </div>
        <div className="shipgrid-container">
          <PlayerGrid
            grid={player1.shipsGrid}
            ships={player1.ships}
            currentShip={player1.currentShip}
            updateGrid={this.updateGrid}
            updateShips={this.updateShips}
            shipsSet={this.state.player1.shipsSet}
            player="player1"
          />
          <PlayerGrid
            grid={player2.shipsGrid}
            ships={player2.ships}
            currentShip={player2.currentShip}
            updateGrid={this.updateGrid}
            updateShips={this.updateShips}
            shipsSet={this.state.player2.shipsSet}
            player="player2"
          />
        </div>
      </div>
    );
  }
}
