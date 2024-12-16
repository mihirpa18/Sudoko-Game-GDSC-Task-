import React from "react";
import Square from "./Square";
import { useGame } from "../store/gameStore";

function Board() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { changeBoard } = useGame();
  return (
    <div className="flex w-[100vw] h-[60vh] lg:w-[50vw] lg:h-[80vh] p-2 flex-col gap-2 relative m-auto mx-8  ">
      <div className="flex gap-2 h-full w-full">
        <Square row={0} col={0} />
        <Square row={0} col={1} />
        <Square row={0} col={2} />
      </div>
      <div className="flex gap-2 h-full w-full">
        <Square row={1} col={0} />
        <Square row={1} col={1} />
        <Square row={1} col={2} />
      </div>
      <div className="flex gap-2 h-full w-full">
        <Square row={2} col={0} />
        <Square row={2} col={1} />
        <Square row={2} col={2} />
      </div>
      <div className="flex  justify-center gap-2 md:gap-8 select-none w-full ">
        {numbers.map((i) => (
          <span
            key={i}
            onClick={() => changeBoard(i)}
            className={`text-slate-900 bg-gray-100 shadow-lg p-2 hover:bg-slate-400 hover:scale-110 md:px-3 rounded-md my-2 text-2xl cursor-pointer `}
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Board;
