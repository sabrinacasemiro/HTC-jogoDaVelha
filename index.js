const $switcherBot = document.querySelector(".box-switcher")
const $switcherMD = document.querySelector('.box-type-switcher')

const $buttonStart = document.querySelector('.button-start')
const $buttonRestart = document.querySelector('.button-restart')

const $playingField0 = document.querySelector('.playing-field0')
const $playingField1 = document.querySelector('.playing-field1')
const $playingField2 = document.querySelector('.playing-field2')
const $playingField3 = document.querySelector('.playing-field3')
const $playingField4 = document.querySelector('.playing-field4')
const $playingField5 = document.querySelector('.playing-field5')
const $playingField6 = document.querySelector('.playing-field6')
const $playingField7 = document.querySelector('.playing-field7')
const $playingField8 = document.querySelector('.playing-field8')

const $playingFieldList = document.querySelectorAll('.playing-field')

const $winnerScoreboard = document.querySelector(".winner-scoreboard")

const $namePlayer1 = document.querySelector('.imput-player1')
const $namePlayer2 = document.querySelector('.imput-player2')

const pointPlaying1 = document.querySelector('.point-player1')
const pointPlaying2 = document.querySelector('.point-player2')

const $namePlayerList = document.querySelectorAll('.imput-player')
const $playersWrapper = document.querySelector('.players-wrapper')

const $matchHistoryList = document.querySelector('.match-history-list')
const $playHistoryList = document.querySelector('.play-history-list')

const horizontal1 = [$playingField0, $playingField1, $playingField2]
const horizontal2 = [$playingField3, $playingField4, $playingField5]
const horizontal3 = [$playingField6, $playingField7, $playingField8]

const vertical1 = [$playingField0, $playingField3, $playingField6]
const vertical2 = [$playingField1, $playingField4, $playingField7]
const vertical3 = [$playingField2, $playingField5, $playingField8]

const diagonal1 = [$playingField0, $playingField4, $playingField8]
const diagonal2 = [$playingField2, $playingField4, $playingField6]

const linesToVerify = [horizontal1, horizontal2, horizontal3, vertical1, vertical2, vertical3, diagonal1, diagonal2]

let currentMove = 'X'
let winner =  ''
let scorePlayer1 = 0
let scorePlayer2 = 0
let start = false

function toggleMoveVar(){
    if(currentMove == 'O'){
        currentMove = 'X'
    } else {currentMove = 'O'}
}

function printMove($playingField){
    $playingField.textContent = currentMove
}

function verifyWinner(){
    for(const line of linesToVerify){
        if(line[0].textContent && line[0].textContent == line[1].textContent && line[1].textContent == line[2].textContent)
        winner = currentMove
    }

    const itsFull = checkField()

    if(!winner && itsFull){
        winner = 'draw'
    }
  
}

function addPoint(player, quantity){
    if(player === 'X'){
        scorePlayer1 += quantity
    } else if(player === 'O'){
        scorePlayer2 += quantity
    }
}

function checkField(){
    let itsFull = true

    for(const field of $playingFieldList){
        if(!field.textContent){
            itsFull =   false
        }
    }
    return itsFull
}

function printWinner(){
    const playerValue =  getPlayerName(currentMove)
    $winnerScoreboard.textContent = playerValue + ' Venceu!'
}

function printMatch(){
    if(checkField()){
        $winnerScoreboard.textContent = 'Xiii... deu velha!'
    }
}

function printPoint(){
    if(scorePlayer1 < 10){
        pointPlaying1.textContent = '0' + scorePlayer1
    } else {
        pointPlaying1.textContent = scorePlayer1
    }
    if(scorePlayer2 < 10){
        pointPlaying2.textContent = '0' + scorePlayer2
    } else {
        pointPlaying2.textContent = scorePlayer2
    }
}

function resetField(){
    for($playingfield of $playingFieldList){
        $playingfield.textContent = ''
    }
}

function resetVar(){
    winner = ''
    currentMove = 'X'
}

function resetWinnerScoreboard(){
    $winnerScoreboard.textContent = ''
}

function resetMoveHistory(){
    $playHistoryList.innerHTML = ''
}

function resetPointScoreboard(){
    pointPlaying1.textContent = '00'
    pointPlaying2.textContent = '00'
}

function resetScorePlayer(){
    scorePlayer1 = 0
    scorePlayer2 = 0
}

function resetMatchHistory(){
    $matchHistoryList.innerHTML = ''
}

function stopGameForAMoment(time){
    start = false

    setTimeout(function(){
        start = true
    }, time)
}

function verifyPlayers(){
    let error = false
    for($namePlayer of $namePlayerList){
        const value = $namePlayer.value
        if(!value){
           $playersWrapper.classList.add('error')
            error = true
            start = true
            $buttonStart.classList.remove('button-stop')

            setTimeout(function(){
               $playersWrapper.classList.remove('error')
            }, 1500)
        }
    }
}

function printMatchHistory(){
    $matchHistoryList.innerHTML +=
    `<li class="match-history-card">
                    <div class="winner-history-wraper">
                        <span class="winner-history-title">Vencedor</span>
                        <span class="winner-history-name">Nome do Vencedor</span>
                    </div>
                    <span class="scenery-history-title">Cenário</span>
                    <div class="scenery-history-wrapper">
                        <div class="field-scenery-history field-scenery-history1">X</div>
                        <div class="field-scenery-history field-scenery-history2"></div>
                        <div class="field-scenery-history field-scenery-history3"></div>
                        <div class="field-scenery-history field-scenery-history4"></div>
                        <div class="field-scenery-history field-scenery-history5"></div>
                        <div class="field-scenery-history field-scenery-history6"></div>
                        <div class="field-scenery-history field-scenery-history7"></div>
                        <div class="field-scenery-history field-scenery-history8"></div>
                        <div class="field-scenery-history field-scenery-history9"></div>
                    </div>
                </li>`
}

function printMoveHistory(move, fieldIndex){
    const playerName = getPlayerName(move)

    $playHistoryList.innerHTML += `
    <button class="play-history-card">
                    <div class="play-history-move">
                        <span>${move}</span>
                    </div>
                    <div class="play-history-player-wrapper">
                        <span class="play-history-player">${playerName}</span>
                        <span class="play-history-field">${fieldIndex}</span>
                    </div>
                </button>
    `
}

function getPlayerName(playerMove){
    const player1value = $namePlayer1.value
    const player2value = $namePlayer1.value

    if(playerMove === 'X'){
        return player1value
    } else if(playerMove === 'O'){
        return player2value
    }
}

$playingField0.addEventListener('click', function(){
    if($playingField0.textContent || !start) return
    printMove($playingField0)
    printMoveHistory(currentMove, 0)
    verifyWinner()
    if(winner){
        stopGameForAMoment(1500)
        addPoint(winner, 1)
        printWinner()
        printMatch()
        printPoint()
        setTimeout(function(){
            resetField()
            resetVar()
            resetWinnerScoreboard()
            resetMoveHistory()
        }, 1500)
        printMatchHistory()
    }
    toggleMoveVar()
})

$playingField1.addEventListener('click', function(){
    if($playingField1.textContent || !start) return
    printMove($playingField1)
    printMoveHistory(currentMove, 1)
    verifyWinner()
    if(winner){
        stopGameForAMoment(1500)
        addPoint(winner, 1)
        printWinner()
        printMatch()
        printPoint()
        setTimeout(function(){
            resetField()
            resetVar()
            resetWinnerScoreboard()
            resetMoveHistory()
        }, 1500)
        printMatchHistory()
    }
    toggleMoveVar()
})

$playingField2.addEventListener('click', function(){
    if($playingField2.textContent || !start) return
    printMove($playingField2)
    printMoveHistory(currentMove, 2)
    verifyWinner()
    if(winner){
        stopGameForAMoment(1500)
        addPoint(winner, 1)
        printWinner()
        printMatch()
        printPoint()
        setTimeout(function(){
            resetField()
            resetVar()
            resetWinnerScoreboard()
            resetMoveHistory()
        }, 1500)
        printMatchHistory()
    }
    toggleMoveVar()
})

$playingField3.addEventListener('click', function(){
    if($playingField3.textContent || !start) return
    printMove($playingField3)
    printMoveHistory(currentMove, 3)
    verifyWinner()
    if(winner){
        stopGameForAMoment(1500)
        addPoint(winner, 1)
        printWinner()
        printMatch()
        printPoint()
        setTimeout(function(){
            resetField()
            resetVar()
            resetWinnerScoreboard()
            resetMoveHistory()
        }, 1500)
        printMatchHistory()
    }
    toggleMoveVar()
})

$playingField4.addEventListener('click', function(){
    if($playingField4.textContent || !start) return
    printMove($playingField4)
    printMoveHistory(currentMove, 4)
    verifyWinner()
    if(winner){
        stopGameForAMoment(1500)
        addPoint(winner, 1)
        printWinner()
        printMatch()
        printPoint()
        setTimeout(function(){
            resetField()
            resetVar()
            resetWinnerScoreboard()
            resetMoveHistory()
        }, 1500)
        printMatchHistory()
    }
    toggleMoveVar()
})

$playingField5.addEventListener('click', function(){
    if($playingField5.textContent || !start) return
    printMove($playingField5)
    printMoveHistory(currentMove, 5)
    verifyWinner()
    if(winner){
        stopGameForAMoment(1500)
        addPoint(winner, 1)
        printWinner()
        printMatch()
        printPoint()
        setTimeout(function(){
            resetField()
            resetVar()
            resetWinnerScoreboard()
            resetMoveHistory()
        }, 1500)
        printMatchHistory()
    }
    toggleMoveVar()
})

$playingField6.addEventListener('click', function(){
    if($playingField6.textContent || !start) return
    printMove($playingField6)
    printMoveHistory(currentMove, 6)
    verifyWinner()
    if(winner){
        stopGameForAMoment(1500)
        addPoint(winner, 1)
        printWinner()
        printMatch()
        printPoint()
        setTimeout(function(){
            resetField()
            resetVar()
            resetWinnerScoreboard()
            resetMoveHistory()
        }, 1500)
        printMatchHistory()
    }
    toggleMoveVar()
})

$playingField7.addEventListener('click', function(){
    if($playingField7.textContent || !start) return
    printMove($playingField7)
    printMoveHistory(currentMove, 7)
    verifyWinner()
    if(winner){
        stopGameForAMoment(1500)
        addPoint(winner, 1)
        printPoint()
        printWinner()
        printMatch()
        setTimeout(function(){
            resetField()
            resetVar()
            resetWinnerScoreboard()
            resetMoveHistory()
        }, 1500)
        printMatchHistory()
    }
    toggleMoveVar()
})

$playingField8.addEventListener('click', function(){
    if($playingField8.textContent || !start) return
    printMove($playingField8)
    printMoveHistory(currentMove, 8)
    verifyWinner() 
    if(winner){
        stopGameForAMoment(1500)
        addPoint(winner, 1)
        printPoint()
        printWinner()
        printMatch()
        setTimeout(function(){
            resetField()
            resetVar()
            resetWinnerScoreboard()
            resetMoveHistory()
        }, 1500)
        printMatchHistory()
    }
    toggleMoveVar() 
})

$switcherBot.addEventListener('click', function(){
    $switcherBot.classList.toggle('switcher-active')
})

$switcherMD.addEventListener('click', function(){
    $switcherMD.classList.toggle('type-switcher5')
})

$buttonStart.addEventListener('click', function(){
    $buttonStart.classList.toggle('button-stop')
    if(verifyPlayers()) return
    if(start){
        start = false
        $buttonStart.textContent = 'Jogar'
    } else{
        start = true
        $buttonStart.textContent = 'Parar'
    }
})

$buttonRestart.addEventListener('click', function(){
    resetField()
    resetVar()
    resetWinnerScoreboard()
    resetMoveHistory()
    resetPointScoreboard()
    resetScorePlayer()
    resetMatchHistory()
})