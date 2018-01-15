import React, { Component } from "react";

import "../styles/GameLog.css";

export default class GameLog extends Component {
  constructor(props) {
    super(props);


  }

  renderTurn() {
    if (!this.props.allShipsSet) {
      return "Set your ships"
    } else {
      return "X's turn"
    }
  }

  render() {
    console.log(this.props.logs);
    return (
      <div className="game-log">
        <p className="player-turn">{this.renderTurn()}</p>
        <div className="gamelog-container">
          {this.props.logs.map((log, i) => {
            return (
              <div key={i} className="turn-block">
                Turn {log.turn}
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
