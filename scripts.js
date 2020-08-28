
// All cards variable
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let cardLock = false;

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
const modal = document.getElementById('modal');

// Move counter
const counter = document.getElementById('counter');
let moves = 0;

// Finished moves
let finishedMoves = document.getElementById('finished-moves');


// Correct counter

let correctCounter = 0;

// anchor tags in modal
let levelPick = document.getElementById('level-picker');


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
        soundButton.innerText = 'MUSIC OFF';
        jumpSound.muted = false;
        wrong.muted = false;
        correct.muted = false;
    } else {
        music.muted = true;
        jumpSound.muted = true;
        wrong.muted = true;
        correct.muted = true;
        soundButton.innerText = 'MUSIC ON';
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
    if(cardLock) return;
    if(this === firstCard) return;
    this.classList.toggle('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
    } else {
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

// Move counter

function moveCounter(){      
    moves ++;
    counter.innerHTML = moves;
}

// disable flip function
function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard();
    setTimeout(() => {
        correct.play();
        correctCounter ++;
        console.log(correctCounter);
        moveCounter();
        trigModal();
    }, 100)
    
}

// flip cards back
function unflipCards(){

    cardLock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
    setTimeout(() => {
        wrong.play();
        moveCounter();
    }, 500)
    
}
// trigger modal
function trigModal(){
    if (correctCounter === cards.length / 2){
        modal.style.display = "unset";
        modal.style.display = "flex";
        finishedMoves.innerText = `You completed the game in ${moves} moves!`;
    } else {
        // modal.style.display = "none";
    }
}




// stop the same card from being able to match
function resetBoard() {
    [hasFlippedCard, cardLock] = [false, false];
    [firstCard, secondCard] = [null, null];
}


// Shuffle cards on load
(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

// event listeners
cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', playCardSound));
links.forEach(link => link.addEventListener('click', play));
trigModal();



