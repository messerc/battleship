import React, { Component } from "react";
import {
  gridGenerator,
  classUpdate,
  isOccupied,
  placeShip,
  hoverUpdate
} from "../utils/gridHelpers";
import "../styles/Grid.css";

export default class PlayerGrid extends Component {
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
    }
    const updatedGrid = hoverUpdate(data);
    this.setState({ grid: updatedGrid });
  }

  handleClick(row, col) {
    const { grid, rotated } = this.state;
    const data = {
      grid: grid.slice(),
      rotated, 
      row,
      col
    }
    const updatedGrid = placeShip(data); 
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
        <div className="grid">
          {grid.map((row, i) => {
            return row.map((square, j) => {
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
        <button onClick={this.handleRotate}>Rotate direction</button>
      </div>
    );
  }
}
