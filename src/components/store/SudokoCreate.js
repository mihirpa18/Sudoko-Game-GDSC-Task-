export function randomNum(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isSafe(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] == num || board[i][col] == num) {
      return false;
    }
  }
  const irow = Math.floor(row / 3) * 3;
  const icol = Math.floor(col / 3) * 3;
  for (let i = irow; i < irow + 3; i++) {
    for (let j = icol; j < icol + 3; j++) {
      if (board[i][j] == num) {
        return false;
      }
    }
  }

  return true;
}

export function generateSudo(board, randArr) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == 0) {
        for (let num of randArr) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (generateSudo(board, randArr)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function removeCells(board, numCells) {
  for (let i = 0; i < numCells; i++) {
    const row = randomNum(1, 9) - 1;
    const col = randomNum(1, 9) - 1;
    board[row][col] = 0;
  }
}

export function sudoko() {
  const num_cells = randomNum(40, 50);
  let solBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
  let randArr = [];
  while (1) {
    if (randArr.length == 9) {
      break;
    }
    const num = randomNum(1, 9);
    if (!randArr.includes(num)) {
      randArr.push(num);
    }
  }
  generateSudo(solBoard, randArr);
  let unsolvedBoard = solBoard.map((row) => row.map((num) => num));
  removeCells(unsolvedBoard, num_cells);
  unsolvedBoard=unsolvedBoard.map((row)=>{
    return row.map(num=>{
        if(!num==0){
            return {value:num , default :true}
        }
        return {value:0 , default :false}
    })
  })

  return {solBoard,unsolvedBoard};
}


