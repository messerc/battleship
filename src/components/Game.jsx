import React, { Component } from "react";

import BattleGrid from "./BattleGrid";
import GameLog from "./GameLog";
import ShipGrid from "./ShipGrid";

import { createPlayer, welcomeMessage } from "../utils/gameHelpers";

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
      logs: [welcomeMessage]
    };

    this.updateGrids = this.updateGrids.bind(this);
    this.updateShips = this.updateShips.bind(this);
    this.updateLog = this.updateLog.bind(this);
  }

  updateShips(player, updatedShips) {
    const { ships, currentShip } = this.state[player]; 
    const payload = {
      updatedShips, 
      player
    }
    if (currentShip + 1 === ships.length && player === "player2") {
      this.shipReducer("SET_PLAYER_TWO", payload); 
      this.shipReducer("START_GAME", payload);
    } else if (currentShip + 1 === ships.length && player === "player1") {
      this.shipReducer("SET_PLAYER_ONE", payload); 
    } else {
      this.shipReducer("SET_SHIP", payload)
    }
  }
  
  shipReducer(action, { updatedShips, player }) {
    const { ships, currentShip, shipsSet } = this.state[player];
    if (action === "SET_PLAYER_ONE") {
      this.setState({
        player1: {
          ...this.state.player1,
          ships: updatedShips,
          shipsSet: true
        },
        activePlayer: "player2"
      });
    }
    if (action === "SET_PLAYER_TWO") {
      this.setState({
        player2: {
          ...this.state.player2,
          ships: updatedShips,
          shipsSet: true
        },
        allShipsSet: true,
        gameStarting: true
      });
    }
    if (action === "START_GAME") {
      setTimeout(() => {
        this.setState({
          activePlayer: "player1",
          gameStarting: false
        });
      }, 3000);
    }
    if (action === "SET_SHIP") {
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
    const payload = {
      player,
      grid,
      type,
      opponent
    }
    this.gridReducer("UPDATE", payload); 
    if (opponent && opponent.sunkenShips === 4) {
      this.gridReducer("GAME_OVER", payload); 
    } else if (opponent) {
      this.gridReducer("HIT", payload); 
    }
  }

  gridReducer(action, { player, grid, type, opponent }) {
    const other = player === "player1" ? "player2" : "player1";
    if (action === "UPDATE") {
      const updatedPlayer = {
      ...this.state[player],
      [this.state[player][type]]: grid
    };
    this.setState({
      [player]: updatedPlayer
    });
    }
    if (action === "GAME_OVER") {
      this.setState({
        gameOver: true,
        activePlayer: null,
        winner: player
      });
    }
    if (action === "HIT") {
      this.setState({
        [other]: opponent,
        activePlayer: other
      });
    }
  }

  updateLog(messages) {
    const updatedLog = this.state.logs.slice();
    updatedLog.unshift({ turn: `Turn ${this.state.logs.length}`, messages });
    this.setState({
      logs: updatedLog
    });
  }

  renderBattleGrid(player) {
    const opponent = player === "player1" ? "player2" : "player1";
    const { activePlayer } = this.state;
    return (
      <BattleGrid
        player={player}
        grid={this.state[player].movesGrid}
        opponent={this.state[opponent]}
        updateGrids={this.updateGrids}
        updateLog={this.updateLog}
        activePlayer={activePlayer}
        shipsSet={this.state[player].shipsSet}
      />
    );
  }

  renderShipGrid(player) {
    const { activePlayer, gameOver } = this.state;
    return (
      <ShipGrid
        player={player}
        grid={this.state[player].shipsGrid}
        ships={this.state[player].ships}
        currentShip={this.state[player].currentShip}
        updateGrids={this.updateGrids}
        updateShips={this.updateShips}
        shipsSet={this.state[player].shipsSet}
        activePlayer={activePlayer}
        gameOver={gameOver}
      />
    );
  }

  render() {
    return (
      <div className="game">
        <div className="title-container">
          <p className="title">Battleship</p>
        </div>
        <div className="shipgrid-container">
          {this.renderBattleGrid("player1")}
          <GameLog {...this.state} />
          {this.renderBattleGrid("player2")}
        </div>
        <div className="shipgrid-container">
          {this.renderShipGrid("player1")}
          {this.renderShipGrid("player2")}
        </div>
      </div>
    );
  }
}
