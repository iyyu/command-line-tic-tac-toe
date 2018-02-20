const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let player1, player2;

const getNames = (callback) => {
  rl.question('Player 1, what\'s your name? > ', (answer) => {
    player1 = answer;
      console.log(`Alright, ${answer}, you'll be using the X markers!`);
    rl.question('Player 2, what\'s your name? > ', (answer) => {
      player2 = answer;
        console.log(`Alright, ${answer}, you'll be using the O marker!`);
        callback();
    });
  });
}
const decideFirst = () => {
  return (Math.random() % 2 === 0) ? console.log(`${player1}, player 1, you're going first!`) : console.log(`${player2}, player 2, you're going first!`);
}

const initializeBoard = () => {
  let one = '  ', two = '  ', three = '  ', four = '  ', five = '  ', six = '  ', seven = '  ', eight = '  ', nine = '  ';
  let board = `|${one}|${two}|${three}|\n|${four}|${five}|${six}|\n|${seven}|${eight}|${nine}|`;
  console.log('Here\'s the board:');
  console.log('------------------------------------');
  console.log(board);
  console.log('------------------------------------');
  rl.question('Hit "Enter" to flip a coin and see who goes first!', (response) => {
      decideFirst();
  });

}

console.log('Hello there! Let\'s play a game of tic-tac-toe! Grab a buddy and hit "Enter" to begin.');

rl.on('line', (line) => {
  if (!player1 && !player2) {
    getNames(initializeBoard);
  }
});