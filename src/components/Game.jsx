import React, { Component } from "react";

import BattleGrid from "./BattleGrid";
import GameLog from "./GameLog";
import ShipGrid from "./ShipGrid";

import { createPlayer } from "../utils/gameHelpers";

import "../styles/Game.css";

export default class Game extends Component {
  constructor() {
    super();

    this.state = {
      activePlayer: "player1",
      player1: createPlayer(),
      player2: createPlayer(),
      allShipsSet: false,
      gameStarting: false,
      winner: null,
      gameOver: false,
      logs: []
    };

    this.updateGrids = this.updateGrids.bind(this);
    this.updateShips = this.updateShips.bind(this);
    this.updateLog = this.updateLog.bind(this);
  }

  updateShips(player, updatedShips) {
    const { ships, currentShip, shipsSet } = this.state[player];
    if (currentShip + 1 === ships.length && player === "player2") {
      this.setState({
        player2: {
          ...this.state.player2,
          ships: updatedShips,
          shipsSet: true,
        },
        allShipsSet: true,
        gameStarting: true
      });
      setTimeout(() => {
        this.setState({
          activePlayer: "player1",
          gameStarting: false
        });
      }, 3000);
    } else if (currentShip + 1 === ships.length && player === "player1") {
      this.setState({
        player1: {
          ...this.state.player1,
          ships: updatedShips,
          shipsSet: true
        },
        activePlayer: "player2"
      });
    } else {
      const updatedPlayer = {
        ...this.state[player],
        ships: updatedShips,
        currentShip: currentShip + 1
      };
      this.setState({
        [player]: updatedPlayer
      });
    }
  }

  updateGrids(player, grid, type, opponent) {
    const other = player === "player1" ? "player2" : "player1";
    const updatedPlayer = {
      ...this.state[player],
      [this.state[player][type]]: grid
    };
    this.setState({
      [player]: updatedPlayer
    });
    if (opponent) {
      if (opponent.sunkenShips === 4) {
        this.setState({
          gameOver: true,
          activePlayer: null,
          winner: player 
        });
        return;
      }
      this.setState({
        [other]: opponent,
        activePlayer: other
      });
    }
  }

  updateLog(messages) {
    const updatedLog = this.state.logs.slice();
    updatedLog.unshift({ turn: this.state.logs.length + 1, messages });
    this.setState({
      logs: updatedLog
    });
  }

  render() {
    const {
      player1,
      player2,
      allShipsSet,
      logs,
      activePlayer,
      gameStarting,
      gameOver,
      winner
    } = this.state;
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
            updateGrids={this.updateGrids}
            updateLog={this.updateLog}
            player="player1"
            activePlayer={activePlayer}
          />
          <GameLog
            allShipsSet={allShipsSet}
            logs={logs}
            activePlayer={activePlayer}
            gameStarting={gameStarting}
            gameOver={gameOver}
            winner={winner}
          />
          <BattleGrid
            grid={player2.movesGrid}
            shipsSet={allShipsSet}
            opponent={player1}
            updateGrids={this.updateGrids}
            updateLog={this.updateLog}
            player="player2"
            activePlayer={activePlayer}
          />
        </div>
        <div className="shipgrid-container">
          <ShipGrid
            grid={player1.shipsGrid}
            ships={player1.ships}
            currentShip={player1.currentShip}
            updateGrids={this.updateGrids}
            updateShips={this.updateShips}
            shipsSet={this.state.player1.shipsSet}
            player="player1"
            activePlayer={activePlayer}
            gameOver={gameOver}
          />
          <ShipGrid
            grid={player2.shipsGrid}
            ships={player2.ships}
            currentShip={player2.currentShip}
            updateGrids={this.updateGrids}
            updateShips={this.updateShips}
            shipsSet={this.state.player2.shipsSet}
            player="player2"
            activePlayer={activePlayer}
            gameOver={gameOver}
          />
        </div>
      </div>
    );
  }
}
