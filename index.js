const buttonPlay = document.querySelector('.play')
const buttonPause =  document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonIncrease = document.querySelector('.increase')
const buttonDecrease = document.querySelector('.decrease')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const buttonDarkMode = document.querySelector('.dark-mode')
const buttonLightMode = document.querySelector('.light-mode')
const themeDarkMode = document.querySelector('#dark')
const html = document.querySelector('html')
const cardOfRainForest = document.querySelector('#rainForest')
const cardOfRain = document.querySelector('#rain')
const cardOfCoffeeShop = document.querySelector('#coffeeShop')
const cardOfFireplace = document.querySelector('#fireplace')
const volumeRainForest = document.querySelector('#volumeRainForest')
const volumeRain = document.querySelector('#volumeRain')
const volumeCoffeeShop = document.querySelector('#volumeCoffeeShop')
const volumeFireplace = document.querySelector('#volumeFireplace')

//SOUNDS
const soundOfRainForest = new Audio('./sounds/rainForest.wav')
const soundOfRain = new Audio('./sounds/rain.wav')
const soundOfCoffeeShop = new Audio('./sounds/coffeeShop.wav')
const soundOfFireplace = new Audio('./sounds/fireplace.wav')
const kitchenTimer = new Audio("./sounds/KitchenTimer.mp3")


function togglePlay(myAudio) {
  myAudio.loop = true;
  return myAudio.paused ? myAudio.play() : myAudio.pause();
}

function volumePlay(myAudio, volumeBar) {
  myAudio.volume = volumeBar.value / 100
}


// VARIABLES
let timerTimeOut;
let minutes = Number(minutesDisplay.textContent)
let seconds = Number(secondsDisplay.textContent)

// FUNCTIONS
function resetControls() {
  buttonPause. classList.add('hide')
  buttonPlay.classList.remove('hide')
}

function resetTimer() {
  updateTimerDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function updateMinutes(minutes){
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
}

function increaseFiveMinutes() {        
  minutes += 5
  updateMinutes(minutes)
  }

function decreaseFiveMinutes() {
  minutes -= 5 
  updateMinutes(minutes)
}

function countdown() {
  timerTimeOut = setTimeout(function() {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let isFinished = minutes <= 0 && seconds <= 0


    updateTimerDisplay(minutes, 0)

    if(isFinished) {
      togglePlay(kitchenTimer)
      return
    }

    if(minutes <= 0) {
      resetControls()
      return
    }

    if(seconds <= 0 ) {
      seconds = 60

      --minutes
    }

    updateTimerDisplay(minutes, String(seconds - 1))

    countdown()
  }, 1000)
  
}



function changeTheme(){
  buttonDarkMode.classList.toggle('hide')
  buttonLightMode.classList.toggle('hide')
  themeDarkMode.classList.toggle('themeDark')
  html.classList.toggle('dark-mode')
}

// EVENTS

buttonLightMode.addEventListener('click',() => changeTheme()) 
buttonDarkMode.addEventListener('click',() => changeTheme()) 

buttonPlay.addEventListener('click', function() {
  buttonPause. classList.remove('hide')
  buttonPlay.classList.add('hide')
  countdown()
})

buttonPause.addEventListener('click', function() {
  resetControls()
  clearTimeout(timerTimeOut)
  sound.buttonPressAudio()
})

buttonStop.addEventListener('click', function() {
  resetControls()
  resetTimer()
})

buttonDecrease.addEventListener('click', function() {

  decreaseFiveMinutes()

  if (minutes < 0) {
    minutes = 0
  }

  if(minutes < 10) {
    updateTimerDisplay(minutes, 0)
  }
})

buttonIncrease.addEventListener('click', function() {
  increaseFiveMinutes()

  if(minutesDisplay.textContent < 10) {
    minutesDisplay.textContent = String(minutesDisplay.textContent).padStart(2, "0")
  }
})

cardOfRainForest.addEventListener('dblclick', function() {
  cardOfRainForest.classList.toggle('clicked')
  togglePlay(soundOfRainForest)
  
})

cardOfRainForest.addEventListener('input', function() {
  volumePlay(soundOfRainForest, volumeRainForest)
})

cardOfRain.addEventListener('dblclick', function() {
  cardOfRain.classList.toggle('clicked')
  togglePlay(soundOfRain)
})

cardOfRain.addEventListener('input', function() {
  volumePlay(soundOfRain, volumeRain)
})

cardOfCoffeeShop.addEventListener('dblclick', function() {
  cardOfCoffeeShop.classList.toggle('clicked')
  togglePlay(soundOfCoffeeShop)
})

cardOfCoffeeShop.addEventListener('input', function() {
  volumePlay(soundOfCoffeeShop, volumeCoffeeShop)
})

cardOfFireplace.addEventListener('dblclick', function() {
  cardOfFireplace.classList.toggle('clicked')
  togglePlay(soundOfFireplace)
})

cardOfFireplace.addEventListener('input', function() {
  volumePlay(soundOfFireplace, volumeFireplace)
})


