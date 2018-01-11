import React, { Component } from 'react';
import '../styles/Game.css';

export default class Game extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="game">
        <div className="title-container">
          <p className="title">Battleship</p>
        </div> 
      </div>
    )
  }
}