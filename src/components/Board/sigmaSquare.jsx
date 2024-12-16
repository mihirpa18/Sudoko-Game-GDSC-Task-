import React from "react";
import { useGame } from "../store/gameStore";
import Board from "./Board";
import { Pause } from "lucide-react";

function MiniSquare({ row, col }) {
  const { usboard, setSelectedCell, selectedCell, board, pause, isPause } =
    useGame();
  function handleClick() {
    if (isPause) return;
    setSelectedCell(row, col);
  }
  function isSelected() {
    const temp = { current: false, other: false };
    if (selectedCell.row === null || selectedCell.col === null) return temp;
    if (selectedCell.row == row && selectedCell.col == col) {
      temp.current = true;
    }
    if (selectedCell.row == row || selectedCell.col == col) {
      temp.other = true;
    }
    for (let x of selectedCell.squares) {
      if (x[0] == row && x[1] == col) temp.other = true;
    }
    return temp;
  }
  return (
    <div
      onClick={handleClick}
      className={`${
        isSelected().current && "bg-cyan-900 outline outline-slate-200"
      }
                                           ${
                                             isSelected().other &&
                                             "bg-cyan-800 outline outline-zinc-500 "
                                           }
                                           minibox select-none flex items-center justify-center cursor-pointer bg-slate-600 w-full h-full rounded-md relative  hover:outline outline-[1px] hover:outline-white`}
    >
      {usboard[row][col].value != 0 && (
        <span
          className={`${
            usboard[row][col].default
              ? `text-cyan-300 font-extrabold font-mono`
              : usboard[row][col].value === board[row][col]
              ? `text-green-400 font-extrabold font-mono`
              : "text-red-500 font-extrabold font-mono"
          } text-2xl md:text-3xl `}
        >
          {usboard[row][col].value}
        </span>
      )}
    </div>
  );
}

export default MiniSquare;
