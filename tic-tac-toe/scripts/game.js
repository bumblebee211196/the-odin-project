const formPopup = document.querySelector('.popup.form');
const winnerPopup = document.querySelector('.popup.winner');
const winnerSpan = document.querySelector('.popup .winner');
const closeWinnerPopupButton = document.querySelector('.close-popup');
const submitFormButton = document.querySelector('.btn.submit-form');

const restartButton = document.querySelector('.btn.restart-game');
const resetScoreButton = document.querySelector('.btn.reset-game');
const newGameButton = document.querySelector('.btn.new-game');

const player1 = Player("Player1", 1);
const player2 = Player("Player2", 2);

const Board = (function() {
  let _board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  let _n = 3;

  const _check = () => {
    // Check row-wise
    for(let i = 0; i < _n; i++) {
      let row = []
      for(let j = 0; j < _n; j++) {
        row.push(_board[i][j]);
      }
      if (row.join('') === 'XXX') { return 'X' }
      if (row.join('') === 'OOO') { return 'O' }
    }

    // Check column-wise
    for(let i = 0; i < _n; i++) {
      let col = []
      for(let j = 0; j < _n; j++) {
        col.push(_board[j][i]);
      }
      if (col.join('') === 'XXX') { return 'X' }
      if (col.join('') === 'OOO') { return 'O' }
    }

    // Check diagonal-wise
    let diag1 = []
    let diag2 = []
    for(let i = 0; i < _n; i++) {
      for(let j = 0; j < _n; j++) {
        if (i === j) {
          diag1.push(_board[i][j]);
        }
        if (i + j === _n - 1) {
          diag2.push(_board[i][j]);
        }
      }
    }
    if (diag1.join('') === 'XXX' || diag2.join('') === 'XXX') { return 'X' }
    if (diag1.join('') === 'OOO' || diag2.join('') === 'OOO') { return 'O' }

    let data = []
    for(let i = 0; i < _n; i++) {
      for(let j = 0; j < _n; j++) {
        data.push(_board[i][j]);
      }
    }
    if (data.join('').length === 9) { return 'tie' }

    return null;
  }

  const updateBoard = (x, y, value) => {
    if (!(0 <= x < _n && 0 <= y < _n)) {
      throw new Error("Invalid coordinates");
    }
    _board[x][y] = value;
    return _check();
  }

  const reset = () => {
    _board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    document.querySelectorAll('.btn.tile').forEach((tile) => {
      tile.innerHTML = '';
      tile.addEventListener('click', handleTileEvent);
    });
  }

  return {
    updateBoard,
    reset
  };
})();

function Player(name, id) {
  let _id = id;
  let _score = 0;

  const setScore = (score) => {
    _score = score;
    document.querySelector(`.player${_id}.score`).innerHTML = _score;
  }

  const getScore = () => {
    return _score;
  }

  const updateScore = () => {
    _score++;
    document.querySelector(`.player${_id}.score`).innerHTML = _score;
  }

  return { name, getScore, setScore, updateScore}
}

const Game = (function(board, player1, player2) {
  const move = (x, y, value) => {
    const result = board.updateBoard(x, y, value);
    if (result === null) { return }
    if (result === 'X') { player1.updateScore() }
    if (result === 'O') { player2.updateScore() }
    return result;
  }

  const reset = () => {
    board.reset();
    player1.setScore(0);
    player2.setScore(0);
  }

  return {
    move,
    reset,
  }

})(Board, player1, player2);

const announcements = (function() {
  const announceWinner = (player) => {
    winnerPopup.classList.toggle('active');
    winnerSpan.innerHTML = `${player.name} won the game!.`;
  }
  
  const announceTie = () => {
    winnerPopup.classList.toggle('active');
    winnerSpan.innerHTML = 'It\'s a tie!.';
  }

  return { announceTie, announceWinner }
})();

const updateTile = (e) => {
  const tile = e.target;
  const tileValue = X ? 'X' : 'O';
  tile.innerHTML = tileValue;
  const result = Game.move(tile.dataset["x"], tile.dataset["y"], tileValue);
  if (result !== undefined) {
    if (result === 'X') {
      announcements.announceWinner(player1);
    } else if (result === 'O') {
      announcements.announceWinner(player2);
    } else {
      announcements.announceTie();
    }
    X = true;
    return
  }
  X = !X;
}

let X = true;

const handleTileEvent = (e) => {
  updateTile(e);
  e.target.removeEventListener('click', handleTileEvent);
}

document.querySelectorAll('.btn.tile').forEach((tile) => {
  tile.addEventListener('click', handleTileEvent);
});

submitFormButton.addEventListener('click', () => {
  const player1Name = document.querySelector('#player1').value;
  const player2Name = document.querySelector('#player2').value;
  if (player1Name && player2Name) {
    player1.name = player1Name;
    player2.name = player2Name;
    document.querySelector('.player.player1').innerHTML = `${player1Name} - X`;
    document.querySelector('.player.player2').innerHTML = `${player2Name} - O`;
    formPopup.classList.toggle('active');
  }
});

closeWinnerPopupButton.addEventListener('click', () => {
  winnerPopup.classList.toggle('active');
  Board.reset();
});

resetScoreButton.addEventListener('click', () => {
  Board.reset();
});

restartButton.addEventListener('click', () => {
  Board.reset();
  player1.setScore(0);
  player2.setScore(0);
});

newGameButton.addEventListener('click', () => {
  Game.reset();
  formPopup.classList.toggle('active');
});
