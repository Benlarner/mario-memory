
// All cards variable
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;

// play button audio
let jumpSound = document.getElementById('jump-audio');
let playButton = document.getElementById('play-button')

// play sound function
function play(){
    jumpSound.play();
}

function createTimedLink(element, callback, timeout){
    setTimeout( function(){callback(element);}, timeout);
    return false;
  }
  
function myFunction(element) { 
  
  window.location = element.href;
}

// flip card function
function flipCard(){
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

function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
}

function unflipCards(){
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1500)
}

cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', play));
playButton.addEventListener('click', play);
