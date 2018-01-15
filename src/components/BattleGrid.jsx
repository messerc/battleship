import React, { Component } from "react";
import { gridGenerator } from "../utils/gridHelpers";
import {
  hoverUpdate,
  classUpdate,
  placeMove
} from "../utils/battleGridHelpers";

import GridSquare from "./GridSquare";
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
    this.props.updateGrid(this.props.player, updatedGrid, "movesGrid");
    this.setState({
      activeSpot: `${dictionary[col]}${row}`
    });
  }

  handleClick(row, col) {
    const { grid, opponent } = this.props;
    const { rotated } = this.state;
    const data = {
      grid: grid.slice(),
      rotated,
      row,
      col
    };
    const updatedGrid = placeMove(data);
    if (opponent[row][col].status === "occupied") {
      console.log("I hit you dawg");
    }
    this.props.updateGrid(this.props.player, updatedGrid, "movesGrid");
  }

  handleRotate() {
    this.setState(prevState => {
      return {
        rotated: !prevState.rotated
      };
    });
  }

  render() {
    const { grid } = this.props;
    const { rotated } = this.state;
    return (
      <div className="grid-container">
        <div
          className="grid"
          onMouseLeave={() => this.setState({ activeSpot: null })}
        >
        {grid.map((row, i) => {
          return row.map((square, j) => {
            return (
              <GridSquare
                key={`${i}${j}`}
                i={i}
                j={j}
                square={square}
                handleHover={this.handleHover}
                handleClick={this.handleClick}
              />
            );
          });
        })}
        </div>
        <div className="position">Active Spot: {this.state.activeSpot}</div>
      </div>
    );
  }
}
