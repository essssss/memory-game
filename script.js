const gameContainer = document.getElementById("game");
const resetButton = document.getElementById("reset");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
//create a global click counter
let clickCounter = 0;
//create a global completion counter
let completionCounter = 0;
//set a cooldown on click
let cooldown = false;
//set general variables
let firstCard;
let firstCardClicked;
let secondCard;
let secondCardClicked;

function handleCardClick(event) {
  if (cooldown) {
    return;
  } else {
    if (clickCounter === 0) {
      firstCard = event.target;
      firstCardClicked = firstCard.className;
      if (firstCard.classList.contains("completed")) {
        console.log("Pick A Different Box!");
      } else {
        console.log("you just clicked", firstCardClicked);
        firstCard.classList.add("visible");
        clickCounter++;
      }
    } else if (clickCounter === 1) {
      secondCard = event.target;
      secondCardClicked = event.target.className;

      if (secondCard.classList.contains("completed")) {
        console.log("Pick A Different Box!");
      } else if (secondCard.classList.contains("visible")) {
        console.log("Pick A Different Box!");
      } else {
        if (firstCardClicked === secondCardClicked) {
          firstCard.classList = firstCardClicked + " completed";
          secondCard.classList.add("completed");
          console.log("A MATCH!");
          clickCounter = 0;
          completionCounter++;
          if (completionCounter === 5) {
<<<<<<< Updated upstream
            winCondition();
=======
            completionCounter = 0;
            alert("YOU WIN!");
            gameContainer = "";
            setTimeout(createDivsForColors(shuffledColors), 5000);
>>>>>>> Stashed changes
          }
        } else {
          console.log("you just clicked", event.target.className);
          event.target.classList.add("visible");
          cooldown = true;
          setTimeout(resetCards, 1000);
        }
      }
    }
  }
}

function resetCards() {
  const visArray = document.querySelectorAll(".visible");
  for (i of visArray) {
    i.classList.remove("visible");
    clickCounter = 0;
    cooldown = false;
  }
}
const win = document.getElementById("win");
resetButton.addEventListener("click", resetGame);
function resetGame() {
  gameContainer.textContent = "";
  clickCounter = 0;
  completionCounter = 0;
  shuffle(COLORS);
  createDivsForColors(shuffledColors);
  win.style.display = "none";
}

function winCondition() {
  win.style.display = "block";
}

// when the DOM loads
createDivsForColors(shuffledColors);

const winButton = document.getElementById("newGame");
winButton.addEventListener("click", resetGame);
