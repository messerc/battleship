import React from "react";

import "../styles/GameLog.css";

const GameLog = props => {

  const renderTurn = () => {
    if (!props.allShipsSet) {
      return "Pre-game";
    } else if (props.gameStarting) {
      return "Game starting...";
    } else if (props.gameOver) {
      return `${props.winner} wins!!`;
    }
    return `${props.activePlayer}'s turn`;
  };

  return (
    <div className="game-log">
      <p className="player-turn">{renderTurn()}</p>
      <div className="gamelog-container">
        {props.logs.map((log, i) => {
          return (
            <div key={i} className="turn-block">
              {log.turn}
              {log.messages.map((msg, j) => {
                return (
                  <p className="log" key={j}>
                    {msg}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameLog;