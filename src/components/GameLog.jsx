import React, { Component } from "react";

import "../styles/GameLog.css";

export default class GameLog extends Component {
  render() {
    return (
      <div className="gamelog-container">
        <p className="player-turn">Player 1's turn</p>
        Gamelog and whos turn it is goes here
      </div>
    );
  }
}
