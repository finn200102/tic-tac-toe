function createBoard() {
  let board = new Array(9);
  const addMark = (position, mark) => {
    if (checkValidMove(position)) {
      board[position - 1] = mark;
      return true;
    } else {
      return false;
    }
  };
  const checkValidMove = (position) => {
    if (board[position - 1] == undefined) {
      return true;
    }

    return false;
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
        board[p[0] - 1] != undefined
      ) {
        return ["won", board[p[0] - 1]];
      }
    }
    return true;
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
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const getInput = (round, player) => {
    return new Promise((resolve) => {
      readline.question(
        `Player: ${player.playerName} Round ${round}: Enter your input: `,
        (input) => {
          console.log(`You entered: ${input}`);
          resolve(input);
        }
      );
    });
  };

  const runGame = async () => {
    let lastPlayer = playerOne;
    let i = 0;
    while (board.checkStatus() == true) {
      i++;
      const input = await getInput(i, lastPlayer);
      if (!board.addMark(input, lastPlayer.playerMark)) {
        console.log("Not a valid move!");
        continue;
      }

      console.log(board.board);
      if (board.checkStatus() != true) {
        let status = board.checkStatus();
        let winMark = status[1];
        let winPlayerName = "";
        if (winMark == playerOne.playerMark) {
          winPlayerName = playerOne.playerName;
        } else {
          winPlayerName = playerTwo.playerName;
        }
        console.log(`${winPlayerName} has won`);
        break;
      }
      if (lastPlayer === playerOne) {
        lastPlayer = playerTwo;
      } else {
        lastPlayer = playerOne;
      }
    }
    readline.close();
  };
  return { runGame };
}

const game = createGame();
game.runGame().catch(console.error);
