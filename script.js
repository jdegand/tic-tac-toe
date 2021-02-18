/* the last x or o is not placed before tie/win is alerted */

const PLAYER_ONE_SYMBOL = 'X';
const PLAYER_TWO_SYMBOL = 'O';

let board =  ['','','',
              '','','',
              '','','',];

let currentPlayer = PLAYER_ONE_SYMBOL;
let turn = 0;

function handleSquareClick(event){
  executeMove(event.target.id);
}

function executeMove(moveIndex){
  if(board[moveIndex] == ''){
  board[moveIndex] = currentPlayer;
  updateBoard();
  if(!gameHasWinner()){
    currentPlayer = (currentPlayer === PLAYER_ONE_SYMBOL ? PLAYER_TWO_SYMBOL : PLAYER_ONE_SYMBOL);
    turn += 1;

    if(turn === 9){
      alert('tie');
      start()
    }

  } else {
    alert(`Player ${currentPlayer} is the winner!`)
    start()
    }
  }
}


function gameHasWinner() {
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], //horizontal winners
    [0,3,6], [1,4,7], [2,5,8], //vertical
    [0,4,8], [2,4,6] //diagonal
  ];

  return winningCombos.find(combo => {
    if(board[combo[0]] != '' && board[combo[1]] != '' && board[combo[2]] != ''
  && board[combo[0]] == board[combo[1]] && board[combo[1]] == board[combo[2]]){
    return true;
  } else {
    return false;
  }
  });
}


function updateBoard(){
  let gameBoard = document.getElementById('gameBoard');
  let squareElements = gameBoard.childNodes;

  squareElements.forEach((element, index)=> {
    if(element.innerText != board[index]){
      element.innerText = board[index];
    }
  })
}


function drawBoard(){
document.body.innerHTML = '';

let gameBoard = document.createElement('div');
gameBoard.id = 'gameBoard';
gameBoard.classList.add('board');
gameBoard.addEventListener('click', handleSquareClick);


board.forEach((square, index) => {
  let squareElement = document.createElement('div');
  squareElement.id = index;
  squareElement.classList.add('square');
  gameBoard.appendChild(squareElement);
});
  document.body.appendChild(gameBoard);
}


function start() {
  turn = 0;
   board = ['','','',
            '','','',
            '','','',];

  currentPlayer = PLAYER_ONE_SYMBOL;
  drawBoard();
}

drawBoard()
