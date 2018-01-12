import React, { Component } from "react";

import BattleGrid from "./BattleGrid";
import GameLog from "./GameLog";
import PlayerGrid from "./PlayerGrid";

import { gridGenerator } from "../utils/gridHelpers";

import "../styles/Game.css";

export default class Game extends Component {
  constructor() {
    super();

    this.state = {
      activePlayer: "player1",
      player1: {
        shipsGrid: gridGenerator(),
        movesGrid: gridGenerator()
      },
      player2: {
        shipsGrid: gridGenerator(),
        movesGrid: gridGenerator()
      },
      shipsSet: false
    };

    this.updateGrid = this.updateGrid.bind(this);
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
          <BattleGrid grid={player1.movesGrid} />
          <GameLog />
          <BattleGrid grid={player2.movesGrid} />
        </div>
        <div className="shipgrid-container">
          <PlayerGrid
            grid={player1.shipsGrid}
            updateGrid={this.updateGrid}
            player="player1"
          />
          <PlayerGrid
            grid={player2.shipsGrid}
            updateGrid={this.updateGrid}
            player="player2"
          />
        </div>
      </div>
    );
  }
}
