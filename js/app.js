/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// elements from the DOM
const allCards = document.querySelectorAll(".card");
const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const movesElement = document.querySelector(".moves");
const theTimer = document.querySelector(".timer")
var moves = 0;
var interval;
var timerRunning = false;
var matchCardsArray = []; // an array to store matched cards
var openCards = []; // creates an array to store selected cards
var timer = [0,0,0,0]; // array for the timer


//invoke shuffle cards function when page refreshes
shuffleCards();

// *********** FUNCTIONS ****************** //

function movesCounter () {
    moves++;
    movesElement.innerHTML = moves;
}

// function to shuffle elements
function shuffleCards() {
    for (var i = deck.children.length; i >= 0; i--) {
        deck.appendChild(deck.children[(Math.random() * i) | 0]);
    }
}

// function to reset the game
function RestartAndShuffleCards() {
    for (let card of openCards) {
        card.classList.remove("open", "show", "match");
        openCards = [];
    }
    for (let card of matchCardsArray) {
        card.classList.remove("open", "show", "match");
        matchCardsArray = [];
    }
    clearInterval(interval); // stop timer with clearInterval method passing the interval variable which stores setInterval function
    interval = null; // clear the interval to reasign it
    timer = [0,0,0,0]; // resets timer array to 0
    timerRunning = false; // stops the timer
    theTimer.textContent = "00:00:00"; // resets elements to 0
    movesElement.innerHTML = 0; // reset element move to 0
    moves = 0; // resets moves variable to 0
    shuffleCards(); // invjoke function

}

// function start the timer
function startTimer() {
    // assign setInterval method to the global variable to reset clock
    if (!timerRunning) {
        timerRunning = true; 
   interval = setInterval(runTimer,10);
    }
}

// function to display on element timer running
function runTimer() {
let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
theTimer.innerHTML = currentTime;
timer[3]++;
timer[0] = Math.floor((timer[3]/100)/60);
timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// function add leading zero to numbers 9 on or below
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// function to open cards and push it to an array
function cardSelection(e) {
    // selects the current clicked card and stores in a variable
    let card = e.target;

    if (
        !card.classList.contains("open") &&
        !card.classList.contains("show") &&
        !card.classList.contains("match")
    ) {
        // pushes the selected card into openCards Array
        openCards.push(card);
        // add classes open and show to selected cards
        card.classList.add("open", "show");
        openOnlyTwoCards();
    }
}

// function to open only 2 cards at the time
function openOnlyTwoCards() {
    if (openCards.length === 2) {
        // disable click listener if 2 cards are selected
        deck.removeEventListener("click", cardSelection);
        matchCards();
    }
}

// function to check if cards match
function matchCards() {
    //open cards to close in 1 second after they dont match
    setTimeout(function () {
       if (openCards[0].innerHTML !== openCards[1].innerHTML) {
         for (let card of openCards) {
          card.classList.remove("open", "show"); // if they not equal cards, remove classes
          openCards = []; // empty the array if cards dont match
          addAgainEventListener(); // invoke function to re-atach event listener
        }
       } else {

        for (let card of openCards) {
            card.classList.add("match"); // add class match to identical cards
            matchCardsArray.push(card); // push the matching cards to the array
            openCards = []; // empty the array to wait for next cards
            addAgainEventListener();
       }
    }
    }, 1000);
}

// function re-attach event listener
function addAgainEventListener() {
    deck.addEventListener("click", cardSelection);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/****************   EVENT LISTENERS   ***************/

deck.addEventListener("click", cardSelection);
deck.addEventListener("click", startTimer);
deck.addEventListener("click",movesCounter);
restart.addEventListener("click", RestartAndShuffleCards);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
