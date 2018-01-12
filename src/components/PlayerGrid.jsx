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
      rotated: false,
      activeSpot: null
    };

    this.handleRotate = this.handleRotate.bind(this);
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
    this.props.updateGrid(this.props.player, updatedGrid, "shipsGrid");
  }

  handleClick(row, col) {
    const { grid } = this.props;
    const { rotated } = this.state; 
    const data = {
      grid: grid.slice(),
      rotated,
      row,
      col
    };
    const updatedGrid = placeShip(data);
    this.props.updateGrid(this.props.player, updatedGrid, "shipsGrid");
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
    return (
      <div className="grid-container">
        <div className="grid">
          {grid.map((row, i) => {
            return row.map((square, j) => {
              if (square.status === "label") {
                return (
                  <div key={`${i}${j}`}
                    className="grid-square label">
                    {square.label}
                  </div>
                )
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
        <button className="btn-rotate" onClick={this.handleRotate}>
          Rotate direction
        </button>
      </div>
    );
  }
}
