const { boardPositions, showBoard, toggleBoard, isWin, isDone, checkAvailablePositions } = require('./boardLogic.js');
const inquirer = require('inquirer');
const colors = require("colors/safe");

let playerOne, playerTwo;
let getNames = async () => {
  let nameSchema = [{
      name: "1P",
      message: "1P: What is your name?",
      required: true
    },
    {
      name: "2P",
      message: "2P: What is your name?",
      required: true
    }];
  let result = await inquirer.prompt(nameSchema);
  playerOne = colors.bold(colors.blue(result["1P"]));
  playerTwo = colors.bold(colors.red(result["2P"]));
  console.log(`Alright, let\'s play!`);
  console.log(colors.blue(`${playerOne}, you're using ${colors.bold('X')} markers.`));
  console.log(colors.red(`${playerTwo}, you're using ${colors.bold('O')} markers.`));
  return true;
}

let play = player => {
  let marker;
  if (player === playerOne) {
    marker = 'x';
    console.log(colors.blue(`It's your turn, ${playerOne}.`));
  } else {
    marker = 'o';
    console.log(colors.red(`It's your turn, ${playerTwo}.`));
  }
  if (isDone()) {
    console.log('Looks like there\'s no winner this round.');
    return;
  };
  showBoard();
  let positionSchema = {
    type: 'list',
    name: 'position',
    message: 'Which position would you like to play next?',
    required: true,
    choices: checkAvailablePositions(),
  };
  inquirer
  .prompt(positionSchema)
  .then(result => {
    toggleBoard(result.position, marker);
    showBoard();
    if (isWin()) {
      console.log(`${player}, YOU\'VE WON!`);
      return;
    }
    (marker === 'x') ? play(playerTwo) : play(playerOne);
  });
}

const start = async () => {
  console.log("------------------------------------");
  console.log("Hello there! Let's play a game of tic-tac-toe!");
  console.log("------------------------------------");
  await getNames();
  setTimeout(() => {
    console.log('\n\n');
    play(playerOne);
  }, 1000);
};

start();
