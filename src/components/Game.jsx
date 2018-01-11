import React, { Component } from "react";

import GameLog from "./GameLog";
import PlayerGrid from "./PlayerGrid";
import "../styles/Game.css";

export default class Game extends Component {
  constructor() {
    super();

    this.state = {
      activePlayer: "player 1",
      boardSet: false
    };
  }

  render() {
    return (
      <div className="game">
        <div className="title-container">
          <p className="title">Battleship</p>
        </div>
        <div className="shipgrid-container">
          <PlayerGrid />
          <GameLog />
          <PlayerGrid />
        </div>
        <div className="shipgrid-container">
          <PlayerGrid />
          <PlayerGrid />
        </div>
      </div>
    );
  }
}
