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

const horizontal1 = [$playingFieldList[0], $playingFieldList[1], $playingFieldList[2]]
const horizontal2 = [$playingFieldList[3], $playingFieldList[4], $playingFieldList[5]]
const horizontal3 = [$playingFieldList[6], $playingFieldList[7], $playingFieldList[8]]

const vertical1 = [$playingFieldList[0], $playingFieldList[3], $playingFieldList[6]]
const vertical2 = [$playingFieldList[1], $playingFieldList[4], $playingFieldList[7]]
const vertical3 = [$playingFieldList[2], $playingFieldList[5], $playingFieldList[8]]

const diagonal1 = [$playingFieldList[0], $playingFieldList[4], $playingFieldList[8]]
const diagonal2 = [$playingFieldList[2], $playingFieldList[4], $playingFieldList[6]]

const linesToVerify = [horizontal1, horizontal2, horizontal3, vertical1, vertical2, vertical3, diagonal1, diagonal2]
const historyMoveList = []

let currentMove = 'X'
let winner =  ''
let scorePlayer1 = 0
let scorePlayer2 = 0
let start = false
let bot = false
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
    historyMoveList.length = 0
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

const buildHistoryMoveList = () => {
    const scenary = getScenery()

    historyMoveList.push(scenary)
}

const printScenary = (scenary) => {
    for(let i = 0; i < scenary.length; i++){
        const playingField = $playingFieldList[i]
        const move = scenary[i]

        playingField.textContent = move
    }
}

const getMoveQuantity = () => {
    let index = -1

    for(const $playingField of $playingFieldList){
        if($playingField.textContent) index++
    }

    return index
}

function printMoveHistory(move, fieldIndex){
    const playerName = getPlayerName(move)
    const currentMoveIndex = getMoveQuantity()

    const _playHistoryCard = document.createElement('button')
    const _playHistoryMove = document.createElement('div')
    const _spanMove = document.createElement('span')
    const _playHistoryPlayerWrapper = document.createElement('div')
    const _playHistoryPlayer = document.createElement('span')
    const _playHistoryField = document.createElement('span')

    _playHistoryCard.classList.add('play-history-card')
    _playHistoryMove.classList.add('play-history-move')
    _playHistoryPlayerWrapper.classList.add('play-history-player-wrapper')
    _playHistoryPlayer.classList.add('play-history-player')
    _playHistoryField.classList.add('play-history-field')

    $playHistoryList.appendChild(_playHistoryCard)
    _playHistoryCard.appendChild(_playHistoryMove)
    _playHistoryCard.appendChild(_playHistoryPlayerWrapper)
    _playHistoryMove.appendChild(_spanMove)
    _playHistoryPlayerWrapper.appendChild(_playHistoryPlayer)
    _playHistoryPlayerWrapper.appendChild(_playHistoryField)

    _spanMove.textContent = move
    _playHistoryPlayer.textContent = playerName
    _playHistoryField.textContent = fieldIndex

    _playHistoryCard.setAttribute('index', currentMoveIndex)

    _playHistoryCard.addEventListener('click', () => {
        const myScenery = historyMoveList[currentMoveIndex]

        printScenary(myScenery)
    })
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

function getPositionText(index){
    const dicionaryText = ['Primeiro Campo', 'Segundo Campo', 'Terceiro Campo', 'Quarto Campo', 'Quinto Campo', 'Sexto Campo', 'Setimo Campo', 'Oitavo Campo', 'Nono Campo']

    return dicionaryText[index]
}

function botMoveIndex(){
    return Math.floor(Math.random() * 9) 
}

function botPlay(){
    const botMove = botMoveIndex()
    const $playingField = $playingFieldList[botMove]
    const itsfull = checkField()

    if($playingField.textContent && !itsfull) return botPlay()

    if($playingField.textContent || !start) return
        const positionText = getPositionText(botMove)
    printMove($playingField)
    printMoveHistory(currentMove, positionText)
    buildHistoryMoveList()
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
}

for(let i = 0; i < $playingFieldList.length; i++){
    const $playingField = $playingFieldList[i]
    
    $playingField.addEventListener('click', function(){
        if($playingField.textContent || !start) return
        const positionText = getPositionText(i)
    printMove($playingField)
    printMoveHistory(currentMove, positionText)
    buildHistoryMoveList()
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
    bot && botPlay()
    })

}

$switcherBot.addEventListener('click', function(){
    $switcherBot.classList.toggle('switcher-active')
    bot = !bot
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