const $switcherBot = document.querySelector(".box-switcher")
const $switcherMD = document.querySelector('.box-type-switcher')

const $buttonStart = document.querySelector('.button-start')

const $playingField0 = document.querySelector('.playing-field0')
const $playingField1 = document.querySelector('.playing-field1')
const $playingField2 = document.querySelector('.playing-field2')
const $playingField3 = document.querySelector('.playing-field3')
const $playingField4 = document.querySelector('.playing-field4')
const $playingField5 = document.querySelector('.playing-field5')
const $playingField6 = document.querySelector('.playing-field6')
const $playingField7 = document.querySelector('.playing-field7')
const $playingField8 = document.querySelector('.playing-field8')

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

$playingField0.addEventListener('click', function(){
    if($playingField0.textContent != '') return
    printMove($playingField0)
    verifyWinner()
    toggleMoveVar()
})

$playingField1.addEventListener('click', function(){
    if($playingField1.textContent != '') return
    printMove($playingField1)
    verifyWinner()
    toggleMoveVar()
})

$playingField2.addEventListener('click', function(){
    if($playingField2.textContent != '') return
    printMove($playingField2)
    verifyWinner()
    toggleMoveVar()
})

$playingField3.addEventListener('click', function(){
    if($playingField3.textContent != '') return
    printMove($playingField3)
    verifyWinner()
    toggleMoveVar()
})

$playingField4.addEventListener('click', function(){
    if($playingField4.textContent != '') return
    printMove($playingField4)
    verifyWinner()
    toggleMoveVar()
})

$playingField5.addEventListener('click', function(){
    if($playingField5.textContent != '') return
    printMove($playingField5)
    verifyWinner()
    toggleMoveVar()
})

$playingField6.addEventListener('click', function(){
    if($playingField6.textContent != '') return
    printMove($playingField6)
    verifyWinner()
    toggleMoveVar()
})

$playingField7.addEventListener('click', function(){
    if($playingField7.textContent != '') return
    printMove($playingField7)
    verifyWinner()
    toggleMoveVar()
})

$playingField8.addEventListener('click', function(){
    if($playingField8.textContent != '') return
    printMove($playingField8)
    verifyWinner()
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
})

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
        if(line[0].textContent != '' && line[0].textContent == line[1].textContent && line[1].textContent == line[2].textContent)
        console.log(currentMove + ' venceu')
    }
}