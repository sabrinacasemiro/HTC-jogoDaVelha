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

const fieldSceneryHistory0 = document.querySelector('.field-scenery-history0')
const fieldSceneryHistory1 = document.querySelector('.field-scenery-history1')
const fieldSceneryHistory2 = document.querySelector('.field-scenery-history2')
const fieldSceneryHistory3 = document.querySelector('.field-scenery-history3')
const fieldSceneryHistory4 = document.querySelector('.field-scenery-history4')
const fieldSceneryHistory5 = document.querySelector('.field-scenery-history5')
const fieldSceneryHistory6 = document.querySelector('.field-scenery-history6')
const fieldSceneryHistory7 = document.querySelector('.field-scenery-history7')
const fieldSceneryHistory8 = document.querySelector('.field-scenery-history8')

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
let winnerHistoryName = ''

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
    if(checkField() && winner != 'X' && winner != 'O'){
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
    const scenery = getScenery()

    const _container = document.createElement('li')
    const _winnerWrapper = document.createElement('div')
    const _winnerTitle = document.createElement('span')
    const _winnerName = document.createElement('span')
    const _sceneryTitle = document.createElement('span')
    const _sceneryWrapper = document.createElement('div')

    _container.classList.add('match-history-card')
    _winnerWrapper.classList.add('winner-history-wraper')
    _winnerTitle.classList.add('winner-history-title')
    _winnerName.classList.add('winner-history-name')
    _sceneryTitle.classList.add('scenery-history-title')
    _sceneryWrapper.classList.add('scenery-history-wrapper')

    $matchHistoryList.appendChild(_container)
    _container.appendChild(_winnerWrapper)
    _container.appendChild(_sceneryTitle)
    _container.appendChild(_sceneryWrapper)
    _winnerWrapper.appendChild(_winnerTitle)
    _winnerWrapper.appendChild(_winnerName)

    _winnerTitle.textContent = 'Vencedor'
    _winnerName.textContent = printWinnerHistory()
    _sceneryTitle.textContent = 'Cenário'

    for(const move of scenery){
        const _move = document.createElement('span')
        _move.classList.add('field-scenery-history')
        _move.textContent = move
        _sceneryWrapper.appendChild(_move)
    }
}

function printWinnerHistory(){
    if(winner){
        return $winnerScoreboard.textContent
    } 
}

function getScenery(){
    const scenery = []

    for(const $playingField of $playingFieldList){
        const move = $playingField.textContent
        scenery.push(move)
    }
    return scenery
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
    const player2value = $namePlayer2.value

    if(playerMove === 'X'){
        return player1value
    } else if(playerMove === 'O'){
        return player2value
    }
}

for(let i = 0; i < $playingFieldList.length; i++){
    const $playingField = $playingFieldList[i]

    $playingField.addEventListener('click', function(){
        if($playingField.textContent || !start) return
    printMove($playingField)
    printMoveHistory(currentMove, 'Primeiro Campo')
    verifyWinner()
    if(winner){
        stopGameForAMoment(1500)
        addPoint(winner, 1)
        printWinner()
        printMatch()
        printPoint()
        printMatchHistory()
        setTimeout(function(){
            resetField()
            resetVar()
            resetWinnerScoreboard()
            resetMoveHistory()
        }, 1500)
    }
    toggleMoveVar()
    })
}

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