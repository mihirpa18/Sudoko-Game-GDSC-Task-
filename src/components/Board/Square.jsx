import React from "react";
import Sigma from "./sigmaSquare";

function Square({ row, col }) {
  return (
    <>
      <div className="box w-full h-full gap-1 flex flex-col relative">
        <div className="flex gap-1 w-full h-full">
          <Sigma row={row * 3} col={col * 3} />
          <Sigma row={row * 3} col={col * 3 + 1} />
          <Sigma row={row * 3} col={col * 3 + 2} />
        </div>
        <div className="flex gap-1 w-full h-full">
          <Sigma row={row * 3 + 1} col={col * 3} />
          <Sigma row={row * 3 + 1} col={col * 3 + 1} />
          <Sigma row={row * 3 + 1} col={col * 3 + 2} />
        </div>
        <div className="flex gap-1 w-full h-full">
          <Sigma row={row * 3 + 2} col={col * 3} />
          <Sigma row={row * 3 + 2} col={col * 3 + 1} />
          <Sigma row={row * 3 + 2} col={col * 3 + 2} />
        </div>
      </div>
    </>
  );
}

export default Square;
