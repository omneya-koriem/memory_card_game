//show all card faces at the beginning
var cardsArray = document.getElementsByClassName("memoryCard");
function showAllCards(){
    for(i=0; i < cardsArray.length; i++){
        cardsArray[i].classList.add("flip");
    } 
};
function flipAllCards(){
    for(i=0; i < cardsArray.length; i++){
    cardsArray[i].classList.remove("flip");
    }
}
setTimeout(showAllCards, 100);
setTimeout(flipAllCards, 900);
// set two digits timer //
var second = 0,
    minute = 0,
    hours = 0,
    timer = document.getElementById("TwoDigitTimer");
var interval;
function startTimer(){
    interval = setInterval(function(){
       var twoDigitSecond = ("0" + second).slice(-2),
           twoDigitMinutes = ("0" + minute).slice(-2),
           twoDigitHours = ("0" + hours).slice(-2);
        second ++;
        if(second === 60){
            minute++;
            second = 0;
        }; 
        if(minute === 60){
            hours ++
            minute = 0;
            second = 0;
        };
      if(clickedCards.length == 12){
            clearInterval(interval)
            return;
        }
        timer.innerHTML = twoDigitHours + " : " + twoDigitMinutes + " : " + twoDigitSecond;
    }, 1000);
};

// ///////////////////////set the timer one digit only////////////////////////
/*var second = 00,
    minute = 00,
    hours = 00;
var timer = document.getElementById("TimerSection");
var interval;
function startTimer(){
    interval = setInterval(function(){
        second ++;
        if(second == 60){
            minute++;
            second = 00;
        }
        if (minute == 60){
            hours ++;
            minute = 00;
        }
        if(clickedCards.length == 12){
            clearInterval(interval)
            return;
        }
        timer.innerHTML = " "+ hours+" "+ " hrs" + " : " + minute +" "+ " mins" + " : " + second + " secs";
    }, 1000);
};  */
//startTimer();  
// add Event listener to each card 
var card = document.getElementsByClassName("memoryCard");
var clickedCards = [];
//console.log(card);
                    //add Event Listener to each card
for (i=0; i <card.length; i++){
    card[i].addEventListener("click", flipCard);
};
var hasFlipedCard = true;
var lockBoard = false;
var firstCard, secondCard;
function flipCard(){
    if(second == 0 & minute == 0 & hours == 0){
        startTimer();
        document.getElementById("hourGlass").classList.add("rotatedHour");
    }
    if(lockBoard){
        return;
    }
    this.classList.add("flip");
    this.classList.add("removeMe");
    if(hasFlipedCard){
        hasFlipedCard = false;
        firstCard = this;
        this.removeEventListener("click", flipCard);
        //return;
    } else {
        hasFlipedCard = true;
        secondCard = this;
        checkForMatch();
        firstCard.addEventListener("click", flipCard);
        stepsCounter();
    }
};
// counting one step
var moves = 0;
function stepsCounter(){
    moves ++;
    document.getElementById("steps").classList.add("activeStep");
    document.getElementById("numberOfSteps").innerHTML = moves + " " + "step(s)";
}

                    //Check Matching cardds
function checkForMatch(){
    if(firstCard.dataset.name === secondCard.dataset.name){
        //disableCards();
        setTimeout(removeCards, 400); 
        clickedCards.push(firstCard);
        clickedCards.push(secondCard);
    } else{
        lockBoard = true;
        setTimeout(removeAllAddedClasses, 1000);
        function removeAllAddedClasses(){
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            firstCard.classList.remove("removeMe");
            secondCard.classList.remove("removeMe");
            lockBoard = false;
        }    
    }
};    
function removeCards(){
    var toBeRemoved = document.querySelectorAll(".removeMe");
    toBeRemoved[0].innerHTML = "";
    firstCard.classList.remove("removeMe");
    toBeRemoved[1].innerHTML = "";
    secondCard.classList.remove("removeMe");
    disableCards();
}
function disableCards(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
};                   
                    //shuffle cards position
(function shuffle(){
    for(i=0; i<card.length; i++){
        var randomPosition = Math.floor(Math.random()*12);
        card[i].style.order = randomPosition;
    }
})();

