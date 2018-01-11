import React, { Component } from "react";

import "../styles/GameLog.css";

export default class GameLog extends Component {
  render() {
    return (
      <div>
        <p className="player-turn">Player 1's turn</p>
        <div className="gamelog-container">
          Gamelog and whos turn it is goes here
        </div>
      </div>
    );
  }
}
