// The unordered list where the player’s guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
// The "Guess" button
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter
const input = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display
const remainingGuessesParagraph = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display
const remainingGuessesNumber = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

// The starting word for the game
const word = "magnolia";

// A function to add a circle symbol in place of each letter in the "word in progress"
const updateWordInProgress = function (word) {
    const circles = [];
    for (let letter of word) {
        circles.push("●");
    }
    wordInProgress.innerText = circles.join("");
}

updateWordInProgress(word);

// Event listener and handler for the "Guess" button
guessButton.addEventListener("click", function (e) {
    // prevent reloading the page after clicking the button
    e.preventDefault();
    // capturing the user input
    const userInput = input.value;
    console.log(userInput);
    // emptying the input field
    input.value = "";
})