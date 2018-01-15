import React, { Component } from "react";

import "../styles/GameLog.css";

export default class GameLog extends Component {
  constructor(props) {
    super(props);


  }

  renderTurn() {
    if (!this.props.allShipsSet) {
      return "Pre-game"
    } else if (this.props.gameStarting) {
      return "Game starting..."
    } else if (this.props.gameOver) {
      return `${this.props.winner} wins!!`
    } {
      return `${this.props.activePlayer}'s turn`
    }
  }

  render() {
    return (
      <div className="game-log">
        <p className="player-turn">{this.renderTurn()}</p>
        <div className="gamelog-container">
          {this.props.logs.map((log, i) => {
            return (
              <div key={i} className="turn-block">
                {log.turn}
                {log.messages.map((msg, j) => {
                  return <p className="log" key={j}>{msg}</p>
                })}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
