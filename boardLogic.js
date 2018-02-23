const colors = require("colors/safe");

let boardPositions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const showBoard = () => {
  let copy = boardPositions.map(char => {
    if (char === 'x') {
      char = colors.blue('x');
    }
    if (char === 'o') {
      char = colors.red('o');
    }
    return char;
  });
  let board = colors.yellow(`| ${copy[0]} | ${copy[1]} | ${copy[2]} |\n| ${copy[3]} | ${copy[4]} | ${copy[5]} |\n| ${copy[6]} | ${copy[7]} | ${copy[8]} |`);
  console.log("------------------------------------");
  console.log("Here's the current board and the available positions:");
  console.log(board);
  console.log("------------------------------------");
};

const toggleBoard = (position, marker) => {
  position = Number(position) - 1;
  boardPositions[position] = marker;
};

const wins = ["xxx", "ooo"];

const checkRows = () => {
  let rowOne = boardPositions.slice(0, 3).join("");
  let rowTwo = boardPositions.slice(3, 6).join("");
  let rowThree = boardPositions.slice(6).join("");
  return wins.includes(rowOne) || wins.includes(rowTwo) || wins.includes(rowThree);
}

const checkColumns = () => {
  let colOne = [boardPositions[0], boardPositions[3], boardPositions[6]].join("");
  let colTwo = [boardPositions[1], boardPositions[4], boardPositions[7]].join("");
  let colThree = [boardPositions[2], boardPositions[5], boardPositions[8]].join("");
  return wins.includes(colOne) || wins.includes(colTwo) || wins.includes(colThree);
}

const checkDiagonals = () => {
  let diagOne = [boardPositions[0], boardPositions[4], boardPositions[8]].join("");
  let diagTwo = [boardPositions[2], boardPositions[4], boardPositions[6]].join("");
  return wins.includes(diagOne) || wins.includes(diagTwo);
}

const isWin = () => {
  return (checkRows() || checkColumns() || checkDiagonals());
}

const isDone = () => {
  return checkAvailablePositions().length ? false : true;
}

const checkAvailablePositions = () => {
  return boardPositions.filter(char => char !== 'x').filter(char => char !== 'o');
};

module.exports = { boardPositions, showBoard, toggleBoard, isWin, isDone, checkAvailablePositions };