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

let currentMove = 'X'

$playingField0.addEventListener('click', function(){
    // if($playingField0 != '') return
    printMove($playingField0)
    toggleMoveVar()
})

$playingField1.addEventListener('click', function(){
    printMove($playingField1)
    toggleMoveVar()
})

$playingField2.addEventListener('click', function(){
    printMove($playingField2)
    toggleMoveVar()
})

$playingField3.addEventListener('click', function(){
    printMove($playingField3)
    toggleMoveVar()
})

$playingField4.addEventListener('click', function(){
    printMove($playingField4)
    toggleMoveVar()
})

$playingField5.addEventListener('click', function(){
    printMove($playingField5)
    toggleMoveVar()
})

$playingField6.addEventListener('click', function(){
    printMove($playingField6)
    toggleMoveVar()
})

$playingField7.addEventListener('click', function(){
    printMove($playingField7)
    toggleMoveVar()
})

$playingField8.addEventListener('click', function(){
    printMove($playingField8)
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