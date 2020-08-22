window.onload = function() {
    document.getElementById("audio").play();
}

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

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

