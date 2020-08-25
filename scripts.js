
// All cards variable
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// image variables
const boo = document.getElementById('main-boo');
const bowser = document.getElementById('main-bowser');
const goomba = document.getElementById('main-goomba');

//  audio
const links = document.querySelectorAll('.play-button');
let jumpSound = document.getElementById('jump-audio');
let marioSound = document.getElementById('mario');
const wrong = document.getElementById('wrong');
const correct = document.getElementById('correct');
const music = document.getElementById('music');
const soundButton = document.getElementById('sound-button');
const muteButton = document.getElementById('mute-button')
const booLaugh = document.getElementById('boo-laugh');


// play sound function
function play(){
    marioSound.play();
}

function playCardSound(){
    jumpSound.play();
}

// mute/unmute function

soundButton.onclick = function () {
    if (music.muted){
        music.muted = false;
        soundButton.innerText = 'SOUND OFF';
    } else {
        music.muted = true;
        soundButton.innerText = 'SOUND ON';
    }
}



// load page delay
function createTimedLink(element, callback, timeout){
    setTimeout( function(){callback(element);}, timeout);
    return false;
  }
  
function myFunction(element) { 
  
  window.location = element.href;
}

// flip card function
function flipCard(){
    if(lockBoard) return;
    this.classList.toggle('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard =false;
        secondCard = this;

        checkForMatch();

    }
}

// check for match and call different functions depending on match
function checkForMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
     } else {
        unflipCards();
    }
}

// disable flip function
function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    setTimeout(() => {
        correct.play();
    }, 700)
}

// flip cards back
function unflipCards(){

    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1000);
    setTimeout(() => {
        wrong.play();
    }, 1000)
    
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();


// event listeners
cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', playCardSound));
links.forEach(link => link.addEventListener('click', play))




