import React, { Component } from "react";
import { gridGenerator } from "../utils/gridHelpers";
import {
  hoverUpdate,
  classUpdate,
  placeMove
} from "../utils/battleGridHelpers";
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
      grid: gridGenerator(),
      rotated: false,
      activeSpot: null
    };

    this.handleRotate = this.handleRotate.bind(this);
  }

  handleHover(row, col, type) {
    const { grid, rotated } = this.state;
    const data = {
      grid: grid.slice(),
      rotated,
      row,
      col,
      type
    };
    const updatedGrid = hoverUpdate(data);
    this.setState({
      grid: updatedGrid,
      activeSpot: `${dictionary[col]}${row}`
    });
  }

  handleClick(row, col) {
    const { grid, rotated } = this.state;
    const data = {
      grid: grid.slice(),
      rotated,
      row,
      col
    };
    const updatedGrid = placeMove(data);
    this.setState({ grid: updatedGrid });
  }

  handleRotate() {
    this.setState(prevState => {
      return {
        rotated: !prevState.rotated
      };
    });
  }

  render() {
    const { grid, rotated } = this.state;
    return (
      <div className="grid-container">
        <div
          className="grid"
          onMouseLeave={() => this.setState({ activeSpot: null })}
        >
          {grid.map((row, i) => {
            return row.map((square, j) => {
              if (square.status === "label") {
                return (
                  <div key={`${i}${j}`} className="grid-square label">
                    {square.label}
                  </div>
                );
              }
              return (
                <div
                  key={`${i}${j}`}
                  className={classUpdate(square)}
                  onMouseEnter={() => this.handleHover(i, j, "enter")}
                  onMouseLeave={() => this.handleHover(i, j, "leave")}
                  onClick={() => this.handleClick(i, j)}
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
