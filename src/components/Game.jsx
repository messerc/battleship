import React, { Component } from "react";

import BattleGrid from "./BattleGrid";
import GameLog from "./GameLog";
import PlayerGrid from "./PlayerGrid";

import { gridGenerator, setPositions } from "../utils/gridHelpers";
import { makeShips } from "../utils/gameHelpers";

import "../styles/Game.css";

export default class Game extends Component {
  constructor() {
    super();

    this.state = {
      activePlayer: "player1",
      player1: {
        shipsGrid: gridGenerator(),
        movesGrid: gridGenerator(),
        ships: makeShips(),
        currentShip: 0,
        shipsSet: false,
      },
      player2: {
        shipsGrid: gridGenerator(),
        movesGrid: gridGenerator(),
        ships: makeShips(),
        currentShip: 0,
        shipsSet: false
      },
      allShipsSet: false,
      logs: []
    };

    this.updateGrid = this.updateGrid.bind(this);
    this.updateShips = this.updateShips.bind(this);
    this.updateLog = this.updateLog.bind(this);
  }

  updateShips(player, updatedShips) {
    const { ships, currentShip, shipsSet } = this.state[player];
    const other = player === "player1" ? "player2" : "player1";
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
    if (currentShip + 1 === ships.length && this.state[other].shipsSet) {
      this.setState({
        allShipsSet: true
      })
    }
  }

  updateGrid(player, grid, type, opponent) {
    const other = player === "player1" ? "player2" : "player1";
    const updatedPlayer = {
      ...this.state[player],
      [this.state[player][type]]: grid
    };
    this.setState({
      [player]: updatedPlayer,
      activePlayer: other
    });
    if (opponent) {
      console.log(other);
      console.log(opponent);
      this.setState({
        [other]: opponent
      })
    }
  }

  updateLog(messages) {
    const updatedLog = this.state.logs.slice();
    updatedLog.unshift({turn: this.state.logs.length + 1, messages});
    this.setState({
      logs: updatedLog
    });
  }


  render() {
    const { player1, player2, allShipsSet, logs } = this.state;
    return (
      <div className="game">
        <div className="title-container">
          <p className="title">Battleship</p>
        </div>
        <div className="shipgrid-container">
          <BattleGrid 
            grid={player1.movesGrid}
            shipsSet={allShipsSet}
            opponent={player2}
            updateGrid={this.updateGrid}
            updateLog={this.updateLog}
            player="player1" />

          <GameLog allShipsSet={allShipsSet} logs={logs} />
          <BattleGrid 
            grid={player2.movesGrid}
            shipsSet={allShipsSet}
            opponent={player1}
            updateGrid={this.updateGrid}
            updateLog={this.updateLog}
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
