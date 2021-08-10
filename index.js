const $switcherBot = document.querySelector(".box-switcher")
const $switcherMD = document.querySelector('.box-type-switcher')
const $buttonStart = document.querySelector('.button-start')

$switcherBot.addEventListener('click', function(){
    $switcherBot.classList.toggle('switcher-active')
})

$switcherMD.addEventListener('click', function(){
    $switcherMD.classList.toggle('type-switcher5')
})

$buttonStart.addEventListener('click', function(){
    $buttonStart.classList.toggle('button-stop')
})