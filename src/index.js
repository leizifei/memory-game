// Global app controller
// import SASS
import './main.scss';
import './normalize.scss';

const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const movesElement = document.querySelector('.moves');
const theTimer = document.querySelector('.timer');
const restartBtn = document.querySelector('.fa-repeat');
const stars = document.querySelector('.stars');
const congratsMsg = document.querySelector('.congrats-msg');
const playAgain = document.querySelector('.replay');

let moves = 0;
let interval;
let timerRunning = false;
let matchCardsArray = [];
let openCards = [];
let timer = [ 0, 0, 0, 0 ];

shuffleCards();

// *********** FUNCTIONS ****************** //

// function to keep track of moves
function movesCounter() {
	moves++;
	movesElement.innerHTML = moves;
	// depending the amount of moves player has had, the start will be decreased
	// by calling back the function
	removeStar();
}

// function remove stars
function removeStar() {
	// if user has more than 10 moves, it will remove a star and so on
	if (moves === 10) {
		stars.removeChild(stars.firstElementChild);
	} else if (moves === 20) {
		stars.removeChild(stars.firstElementChild);
	}
}

// function to reset the starts when
function resetStars() {
	let resetStarsCountOne = document.createElement('li');
	let resetStarsCountTwo = document.createElement('li');
	resetStarsCountOne.innerHTML = "<i class='fa fa-star'></i>";
	resetStarsCountTwo.innerHTML = "<i class='fa fa-star'></i>";

	if (stars.childElementCount === 2) {
		stars.appendChild(resetStarsCountOne);
	} else if (stars.childElementCount === 1) {
		stars.appendChild(resetStarsCountOne);
		stars.appendChild(resetStarsCountTwo);
	}
}

// function to shuffle the cards, it loops through the list of cards and create them randomly
function shuffleCards() {
	for (let i = deck.children.length; i >= 0; i--) {
		deck.appendChild(deck.children[(Math.random() * i) | 0]);
	}
}

// function to reset the game
function RestartAndShuffleCards() {
	// loops through the list and remove the classes to reset to their original state
	for (let card of openCards) {
		card.classList.remove('open', 'show', 'match');
		openCards = [];
	}
	for (let card of matchCardsArray) {
		card.classList.remove('open', 'show', 'match');
		matchCardsArray = [];
	}
	clearInterval(interval); // stop timer with clearInterval method passing the interval variable which stores setInterval function
	interval = null; // clear the interval to reasign it
	timer = [ 0, 0, 0, 0 ]; // resets timer array to 0
	timerRunning = false; // stops the timer
	theTimer.textContent = '00:00:00'; // resets elements to 0
	movesElement.innerHTML = 0; // reset element move to 0
	moves = 0; // resets moves variable to 0
	shuffleCards(); // invokes the function and shuffle cards for a new game
	rotateAnimation(); // it rotates the restart icon animation
	addStartTimerAgain(); // reset the timer to begin again
	resetStars(); // resets stars back to 3
}

// function restart button animation
function rotateAnimation() {
	restartBtn.classList.toggle('restart-animation');
	setTimeout(function() {
		restartBtn.classList.toggle('restart-animation');
	}, 1500);
}

// function for the modal play again
function replay() {
	RestartAndShuffleCards();
}

// function start the timer
function startTimer() {
	// assign setInterval method to the global variable to reset clock
	if (!timerRunning) {
		timerRunning = true;
		interval = setInterval(runTimer, 10);
	}
}

// function to display the timer running when user starts the game
function runTimer() {
	let currentTime = leadingZero(timer[0]) + ':' + leadingZero(timer[1]) + ':' + leadingZero(timer[2]);
	theTimer.innerHTML = currentTime;
	timer[3]++;
	timer[0] = Math.floor(timer[3] / 100 / 60);
	timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
	timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

// function add leading zero to numbers 9 on or below
function leadingZero(time) {
	if (time <= 9) {
		time = '0' + time;
	}
	return time;
}

// function to open cards and push it to an array
function cardSelection(e) {
	// selects the current clicked card and stores in a variable
	let card = e.target;

	if (
		// card does not contain any of the classes
		!card.classList.contains('open') &&
		!card.classList.contains('show') &&
		!card.classList.contains('match')
	) {
		// pushes the selected card into openCards Array
		openCards.push(card);
		// add classes open and show to selected cards
		card.classList.add('open', 'show');
		openOnlyTwoCards();
	}
}

// function to allow user to open 2 card at the time
function openOnlyTwoCards() {
	if (openCards.length === 2) {
		// disable click listener if 2 cards are selected, preventing user to open a third card
		deck.removeEventListener('click', cardSelection);
		movesCounter(); // calls the movesCounter to add a move
		matchCards(); // calls function to check if cards match
	}
}

// function to check if cards match
function matchCards() {
	//open cards to close in 1 second after they dont match
	setTimeout(function() {
		// if cards are not equal
		if (openCards[0].innerHTML !== openCards[1].innerHTML) {
			for (let card of openCards) {
				card.classList.remove('open', 'show'); // if they not equal cards, remove classes
				openCards = []; // empty the array if cards dont match
				addAgainEventListener(); // invoke function to re-atach event listener
			}
		} else {
			// if cards match
			for (let card of openCards) {
				card.classList.add('match'); // add class match to identical cards
				matchCardsArray.push(card); // push the matching cards to the array
				openCards = []; // empty the array to wait for next cards
				if (matchCardsArray.length === 16) {
					// if user matches all card
					timerRunning = false; // stops the timer
					popUpMessage();
				}
				addAgainEventListener();
			}
		}
	}, 750);
}

// function for the pop up congrats message
function popUpMessage() {
	clearInterval(interval);
	interval = null; //
	modal.style.display = 'block';
	congratsMsg.innerHTML = 'Total stars : ' + stars.childElementCount + ' <br/><br/>  Time: ' + theTimer.innerHTML;
}

// function re-attach event listener for the next play
function addAgainEventListener() {
	deck.addEventListener('click', cardSelection);
}

// restart the timer
function addStartTimerAgain() {
	deck.addEventListener('click', startTimer);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	let currentIndex = array.length,
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

/**** MODAL POPUP FROM https://www.w3schools.com/howto/howto_css_modals.asp *****/

let modal = document.getElementById('myModal');
let btn = document.getElementById('myBtn');
let span = document.getElementsByClassName('close')[0];
let spanReplay = document.getElementsByClassName('replay')[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = 'none';
	deck.removeEventListener('click', startTimer);
};
spanReplay.onclick = function() {
	modal.style.display = 'none';
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};

/****************   EVENT LISTENERS   ***************/

deck.addEventListener('click', cardSelection);
deck.addEventListener('click', startTimer);
restart.addEventListener('click', RestartAndShuffleCards);
playAgain.addEventListener('click', replay);

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
