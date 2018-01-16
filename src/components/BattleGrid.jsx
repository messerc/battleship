import React, { Component } from "react";
import { hoverUpdate, placeMove } from "../utils/battleGridHelpers";

import BattleGridSquare from "./BattleGridSquare";
import "../styles/Grid.css";

const dictionary = {
  0: null,
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
  9: "I",
  10: "J"
};

export default class BattleGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rotated: false,
      activeSpot: null
    };

    this.handleRotate = this.handleRotate.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleHover(row, col, type) {
    const { grid } = this.props;
    const { rotated } = this.state;
    const data = {
      grid: grid.slice(),
      rotated,
      row,
      col,
      type
    };
    const updatedGrid = hoverUpdate(data);
    this.props.updateGrids(this.props.player, updatedGrid, "movesGrid");
    this.setState({
      activeSpot: `${dictionary[col]}${row}`
    });
  }

  handleExit() {
    this.setState({
      activeSpot: null
    });
  }

  handleClick(row, col) {
    const { grid, opponent, player, activePlayer } = this.props;
    if (!activePlayer) {
      return;
    }
    if (player !== activePlayer) {
      return alert("It's not your turn!");
    }
    const { rotated } = this.state;
    const data = {
      player,
      grid: grid.slice(),
      rotated,
      row,
      col,
      opponent
    };
    const updatedGame = placeMove(data);
    if (updatedGame) {
      this.props.updateGrids(
        this.props.player,
        updatedGame.grid,
        "movesGrid",
        updatedGame.opponent
      );
      this.props.updateLog(updatedGame.log);
    }
  }

  handleRotate() {
    this.setState(prevState => {
      return {
        rotated: !prevState.rotated
      };
    });
  }

  renderSquares() {
    const { grid, shipsSet } = this.props;
    return grid.map((row, i) => {
      return row.map((square, j) => {
        return (
          <BattleGridSquare
            key={`${i}${j}`}
            i={i}
            j={j}
            square={square}
            shipsSet={shipsSet}
            handleHover={this.handleHover}
            handleClick={this.handleClick}
          />
        );
      });
    });
  }

  render() {
    const { player } = this.props;
    return (
      <div className="grid-container">
        <p className="player-title">{player}</p>
        <p className="grid-title"> Battle Grid </p>
        <div className="grid" onMouseLeave={this.handleExit}>
          {this.renderSquares()}
        </div>
        <div className="position">Active Spot: {this.state.activeSpot}</div>
      </div>
    );
  }
}
