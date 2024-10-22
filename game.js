function createBoard() {
  let board = new Array(9);
  const addMark = (position, mark) => {
    board[position] = mark;
  };
  const checkStatus = () => {
    let winPositions = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    for (let i = 0; i < winPositions.length; i++) {
      let p = winPositions[i];
      if (
        board[p[0] - 1] === board[p[1] - 1] &&
        board[p[1] - 1] === board[p[2] - 1] &&
        board[p[0] - 1] != null
      ) {
        return ["won", board[p[0] - 1]];
      } else {
        return ["running"];
      }
    }
  };
  return { board, addMark, checkStatus };
}

function createPlayer(name, mark) {
  let playerName = name;
  let playerMark = mark;
  return { playerName, playerMark };
}

function createGame() {
  board = createBoard();
  playerOne = createPlayer("p1", "x");
  playerTwo = createPlayer("p2", "o");
  return { board, playerOne, playerTwo };
}

const game = createGame();
game.board.addMark(0, "3");
game.board.addMark(1, "a");
game.board.addMark(2, "3");
console.log(game.board.board);
console.log(game.board.checkStatus());
