import React from "react";
import { classUpdate } from "../utils/battleGridHelpers";

const BattleGridSquare = ({ square, i, j, handleHover, handleClick, shipsSet }) => {
  if (square.status === "label") {
    return <div className="grid-square label">{square.label}</div>;
  }
  if (!shipsSet) {
    return (
      <div
        className={classUpdate(square)}
      />
    );
  }
  return (
    <div
      className={classUpdate(square)}
      onMouseEnter={() => handleHover(i, j, "enter")}
      onMouseLeave={() => handleHover(i, j, "leave")}
      onClick={() => handleClick(i, j)}
    />
  );
};

export default BattleGridSquare;
