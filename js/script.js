// The unordered list where the player’s guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// The "Guess" button
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter
const input = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display
const remainingGuessesNumber = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");
// The starting word for the game
let word = "magnolia";
// An array to contain all the letters that the player guesses
const guessedLetters = [];
// Number of guesses allowed (TODO: I think this should be at least equal to the number of characters in the word)
let remainingGuesses = 8;

remainingGuessesNumber.innerText = `${remainingGuesses} guesses`;

// A function to fetch words form a txt file
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();

    // create an array to store the words
    const wordsArray = words.split("\n");

    // create a random index
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    
    // Pull a random word and assign it to "word" global variable
    word = wordsArray[randomIndex].trim();

    // Call the placeholder function (that addes circle symbols instead of the letters)
    addCircleSymbols(word);
};

getWord();

// A function to add a circle symbol in place of each letter in the "word in progress"
const circles = [];
const addCircleSymbols = function (word) {
    for (let letter of word) {
        circles.push("●");
    }
    wordInProgress.innerText = circles.join("");
};

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
        countRemainingGuesses(letter);
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

// A function to count the guesses remaining
const countRemainingGuesses = function (guess) {
    if (word.toUpperCase().includes(guess)) {
        message.innerText = `Good job! ... The word contains the letter ${guess}`;
    } else {
        message.innerText = "Opps! this letter isn't in the word, try again!"
        remainingGuesses -= 1;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game Over! ... The word was: <span class="highlight">${word.toUpperCase()}</span>`;
        remainingGuessesNumber.innerText = `${remainingGuesses} guesses`
        guessButton.disabled = true; // To prevent submitting guesses after the game is over
    } else if (remainingGuesses === 1) {
        remainingGuessesNumber.innerText = "1 guess"
    } else if (remainingGuesses > 1) {
        remainingGuessesNumber.innerText = `${remainingGuesses} guesses`;
    }
};

// A function to check if the player won
const checkWinning = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word correctly! Congrats!</p>`
    }
};





