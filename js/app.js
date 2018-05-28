/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const allCards = document.querySelectorAll(".card"); // selects all classes and store in a nodelist
const deck = document.querySelector(".deck");
const icons = document.querySelectorAll(".fa")

var openCards = [] // creates an array to store selected cards

// function to open cards and push it to an array
function cardSelection (e) {
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
      }
      openOnlyTwoCards();
};

// function to open only 2 cards at the time
function openOnlyTwoCards () {
    
    if (openCards.length === 2) {
        // remove event listener if 2 cards are selected
        deck.removeEventListener("click",cardSelection);
        //open cards to close in 1 second after they are open
        setTimeout(function(){
            for(let card of openCards)
            {           
                card.classList.remove("open", "show");
                openCards = []; // empty the array
                //reatach event listener
                addAgainEventListener();
            }
        },1000);
      
      }

      
}
// event listener
deck.addEventListener("click",cardSelection);

function addAgainEventListener()
{
    deck.addEventListener("click",cardSelection);
};







// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


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
