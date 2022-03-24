// The unordered list where the player’s guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
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
// An array to contain all the letters that the player guesses
const guessedLetters = [];

// A function to add a circle symbol in place of each letter in the "word in progress"
const circles = [];
const addCircleSymbols = function (word) {
    for (let letter of word) {
        circles.push("●");
    }
    wordInProgress.innerText = circles.join("");
};

addCircleSymbols(word);

// Event listener and handler for the "Guess" button
guessButton.addEventListener("click", function (e) {
    // prevent reloading the page after clicking the button
    e.preventDefault();
    // capturing the user input
    const userInput = input.value;
    //console.log(userInput);
    // emptying the input field
    input.value = "";

    // emptying the text of the message element
    message.innerText = "";

    // call the function to check the input
    const validatedInput = validatePlayerInput(userInput);

    //console.log(validatedInput);

    if (validatedInput) {
        makeGuess(validatedInput);
    }
});

// Validate the user input (check if it's not a letter, more than one character or empty)
const validatePlayerInput = function (userInput) {
    // A regular expression to ensure the player inputs a letter
    const acceptedLetters = /[a-zA-Z]/;
    if (userInput === "") {
        message.innerText = "You didn't enter any letters!";
    } else if (userInput.length > 1) {
        message.innerText = "Please enter 1 character only";
    } else if (!userInput.match(acceptedLetters)) {
        message.innerText = "Please enter a letter from A to Z";
    } else {
        return userInput;
    }
};

// Capture user input
const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You guessed this letter before ... Guess another one!"
    } else {
        guessedLetters.push(letter);
        //console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

// A function to show the guessed letters
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";

    for (let letter of guessedLetters) {
        let li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// A function to update the word in progress
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");

    wordArray.forEach(function (letter, index) {
        if (guessedLetters.includes(letter)) {
            circles.splice(index, 1, letter);
            wordInProgress.innerText = circles.join("");
        }
    });

    checkWinning();
};

// A function to check if the player won
const checkWinning = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word correctly! Congrats!</p>`
    }
};





