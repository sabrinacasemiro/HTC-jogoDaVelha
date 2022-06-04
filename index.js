const $playingFieldList = document.querySelectorAll(".playing-field");
const $scoreboardTitle = document.querySelector(".scoreboard-title");
const $scorePlayer1 = document.querySelector('.point-player1')
  const $scorePlayer2 = document.querySelector('.point-player2')

let currentMove = "X";
let startGame = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const move = ($field) => {
  $field.textContent = currentMove;
  const game = verifyGame();
  if (game === 'X' || game === 'O') {
    startGame = false;
    printWinner();
    printScore()
    setTimeout(() => {
    resetPlayingField()()
    }, 2000)
  }
  if (game === 'draw') {
    printNotWinner()
    setTimeout(() => {
      resetPlayingField()()
      }, 2000)
  } 
  toggleMove();
};

const toggleMove = () => {
  currentMove = currentMove === "X" ? "O" : "X";
};

const printPlay = () => {
  $playingFieldList.forEach(($palyingField) => {
    $palyingField.addEventListener("click", () => {
      if ($palyingField.textContent != "" || !startGame) return;
      move($palyingField);
    });
  });
};

printPlay();

const checkWinner = () => {
  const hasWinner = winConditions.some((line) => {
    if (
      $playingFieldList[line[0]].textContent != "" &&
      $playingFieldList[line[0]].textContent ==
        $playingFieldList[line[1]].textContent &&
      $playingFieldList[line[1]].textContent ==
        $playingFieldList[line[2]].textContent
    ) {
      return true;
    }
  });

  if (hasWinner) return currentMove;
};

const printWinner = () => {
  const $player1 = document.querySelector('.imput-player1')
  const $player2 = document.querySelector('.imput-player2')
  
  if(currentMove == 'X'){
    $scoreboardTitle.textContent = $player1.value + " venceu!!"
  }
  if(currentMove == 'O'){
    $scoreboardTitle.textContent = $player2.value + ' venceu!!'
  }
  setTimeout(() => {
    $scoreboardTitle.textContent = "Placar";
  }, 2000);
};

const checkDraw = () => {
  const allFieldsNotEmpty = [...$playingFieldList].every(($field) => !!$field.textContent)

  return allFieldsNotEmpty
};

const printNotWinner = () => {
  $scoreboardTitle.textContent = "Xii... deu velha!!";
  setTimeout(() => {
    $scoreboardTitle.textContent = "Placar";
  }, 2000);
};

const verifyGame = () => {
  const winner = checkWinner()
  const draw = checkDraw()

  if(winner){
    return winner
  } else if(draw){
    return 'draw'
  } else{
    return null
  }
}

const assignsScore = () => {
   const currentScore1 = Number($scorePlayer1.textContent)
  const currentScore2 = Number($scorePlayer2.textContent) 
  
  if(currentMove == 'X'){
    return [currentScore1 + 1, currentScore2]
  }
  if(currentMove == 'O'){
    return [currentScore1, currentScore2 + 1]
  }
}

const printScore = () => {
  const [score1, score2] = assignsScore()
  $scorePlayer1.textContent = score1 < 10 ? `0${score1}` : score1
  $scorePlayer2.textContent = score2 < 10 ? `0${score2}` : score2
}

const resetPlayingField = () => {
  $playingFieldList.forEach(($playingField) => {
    $playingField.textContent = ''
  })
  startGame = true
}