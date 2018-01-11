import React, { Component } from 'react';
import '../styles/Game.css';

export default class Game extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="game">
        This is battleship!
      </div>
    )
  }
}