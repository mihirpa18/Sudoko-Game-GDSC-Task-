import { create } from "zustand";
import { sudoko } from "./SudokoCreate";
import { persist } from "zustand/middleware";

const initialState = {
  isStart: false,
  isPause: false,
  isComplete: false,
  mistake: 0,
  time: 0,
  hint: 0,
  board: Array.from({ length: 9 }, () => Array(9).fill(0)), //solved
  usboard: Array.from({ length: 9 }, () => Array(9).fill(0)),
  selectedCell: {
    row: null,
    col: null,
    squares: null,

    cell: null,
  },
  score: 0,
};

const gameState = (set,get) => ({
  ...initialState,

  startGame: () => {
    const data = sudoko();
    set({
      board: data.solBoard,
      usboard: data.unsolvedBoard,
      isStart: true,

      isPause: false,
      mistake: 0,
      time: 0,
      isComplete: false,
    });
  },

  tryAgain: () => {
    set((state) => {
      const usboard = state.usboard.map((row) =>
        row.map((item) => {
          if (item.default) return item;
          return { default: false };
        })
      );
      return { ...state, usboard, mistake: 0, time: 0, hint: 0 };
    });
  },

  pause: () => {
    set((state) => ({ ...state, isPause: !state.isPause }));
  },

  changeBoard: (num) => {
    set((state) => {
      if (state.isPause) return state;
      let mistake = state.mistake;
      const row = state.selectedCell.row;
      const col = state.selectedCell.col;
      if (state.selectedCell.row === null || state.selectedCell.col === null) {
        return state;
      }
      if (state.usboard[row][col].default) {
        return state;
      }
      const usboard = state.usboard;
      usboard[row][col] = { default: false, value: num };
      if (usboard[row][col].value != state.board[row][col]) {
        mistake += 1;
      }
      let win = true;
      usboard.forEach((itemRow, i) => {
        itemRow.forEach((item, j) => {
          if (item.value != state.board[i][j]) {
            win = false;
          }
        });
      });
      if (win) state.isComplete = true;
      return { ...state, usboard, mistake };
    });
  },

  reset: () => {},

  setSelectedCell: (row, col) => {
    const irow = Math.floor(row / 3) * 3;
    const icol = Math.floor(col / 3) * 3;
    const squares = [];
    for (let i = irow; i < irow + 3; i++) {
      for (let j = icol; j < icol + 3; j++) {
        squares.push([i, j]);
      }
    }
    set({ selectedCell: { row, col, squares } });
  },

  Hint: () => {
    set((state) => {
      state.hint += 1;
      const row = state.selectedCell.row;
      const col = state.selectedCell.col;
      if (row === null || col === null) return state;
      if (state.isPause || state.isComplete) return state;
      let usboard = state.usboard;
      if (usboard[row][col].default) return state;

      usboard[row][col] = {
        ...usboard[row][col],
        value: state.board[row][col],
      };
      return { ...state, usboard };
    });
  },

  increaseTime: () => {
    set((state) => ({ ...state, time: state.time + 1 }));
  },

  setState: () => {},

  score: () => {
    const state = get();
    let mistake = state.mistake;
    let hint = state.hint;
    let time = state.time;

    let score = 0;
    let temp = mistake + hint;
    score = time - temp;

    return score;
  },
});
export const useGame = create(persist(gameState, { name: "board" }));
