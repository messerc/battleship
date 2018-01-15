import React, { Component } from "react";
import {
  gridGenerator,
  isOccupied,
  placeShip,
  hoverUpdate
} from "../utils/gridHelpers";

import GridSquare from "./GridSquare";
import "../styles/Grid.css";

export default class PlayerGrid extends Component {
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
    const { grid, ships, currentShip } = this.props;
    const { rotated } = this.state;
    const data = {
      grid: grid.slice(),
      rotated,
      row,
      col,
      type, 
      ships,
      currentShip
    };
    const updatedGrid = hoverUpdate(data);
    this.props.updateGrid(this.props.player, updatedGrid, "shipsGrid");
  }

  handleClick(row, col) {
    const { grid, ships, currentShip } = this.props;
    const { rotated } = this.state;
    const data = {
      grid: grid.slice(),
      rotated,
      row,
      col, 
      ships,
      currentShip
    };
    const gameUpdate = placeShip(data);
    if (gameUpdate.isUpdated) {
      this.props.updateGrid(this.props.player, gameUpdate.grid, "shipsGrid");
      this.props.updateShips(this.props.player, gameUpdate.ships, "shipsGrid"); 
    }
  }

  handleRotate() {
    this.setState(prevState => {
      return {
        rotated: !prevState.rotated
      };
    });
  }

  render() {
    const { grid, ships, shipsSet } = this.props;
    return (
      <div className="grid-container">
        <div className="grid">
          {grid.map((row, i) => {
            return row.map((square, j) => {
              return (
                <GridSquare
                  key={`${i}${j}`}
                  i={i}
                  j={j}
                  shipsSet={shipsSet}
                  square={square}
                  handleHover={this.handleHover}
                  handleClick={this.handleClick}
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
