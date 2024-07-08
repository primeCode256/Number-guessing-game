//The game variables
var mysteryNumber = Math.floor(Math.random() * 100);
console.log(mysteryNumber);
var playersGuess = 0;
var guessesMade = 0;
var guessesRemaining = 7;
var gameMessage = "";
var gameWon = false;

//The game objects
var ruler = document.querySelector("#scale");
var arrow = document.querySelector("#arrow");
//The graphics display selection
var explosion = document.querySelector("#explosion");
var falling = document.querySelector("#falling");
var chimo = document.querySelector("#chimo");

//The game graphics display
function render()
{
    arrow.style.left = playersGuess * 0.83 + "%";
    if(gameWon)
    {
        explosion.style.display = "block";
        falling.style.display = "block";
        chimo.innerHTML = "<b>Alert!!!</b> you've won a million Naira"
    }
}

//The input and output fields
var input = document.querySelector("#input");
var output = document.querySelector("#output");

//The button
var button = document.querySelector("button");
button.addEventListener("click", clickHandler, false);
button.style.cursor = "pointer";


//Listen for the enter key
window.addEventListener("keydown", keydownHandler, false);
function keydownHandler(event)
{
    if(event.keycode === 13)
    {
        validateInput();
    }
    
}

function clickHandler()
{
    validateInput();
}



function validateInput()
{
    playersGuess = parseInt(input.value);
    if(isNaN(playersGuess))
    {
        output.innerHTML = "Please enter a number";
    }
    else
    {
        playGame();
    }
}

function playGame()
{
    //The game message
    guessesMade = guessesMade + 1;
    guessesRemaining = guessesRemaining - 1;
    gameMessage = "Guess: " + guessesMade + ", Remaining: " + guessesRemaining;

    if(playersGuess > mysteryNumber)
    {
        output.innerHTML = "That's too high " + "<br>" + gameMessage;

        //Check for game end
        if(guessesRemaining < 1)
        {
            endGame();
        }
    }
    else if(playersGuess < mysteryNumber)
    {
        output.innerHTML = "That's too low " + "<br>" + gameMessage;

        //Check for game end
        if(guessesRemaining < 1)
        {
            endGame();
        }
    }
    else if(playersGuess === mysteryNumber)
    {
        gameWon = true;
        endGame();
    }
    render();

}

 function endGame()
{
    if(gameWon)
    {
        output.innerHTML = "Yes it's " 
        + mysteryNumber + " It only took you "+ guessesMade + " guesses";

       
    }
    else
    {
        output.innerHTML = "No more guesses left." + "<br>" + "The number was " + mysteryNumber;
    }

     //disable button
     button.removeEventListener("click", clickHandler, false);
     button.disabled = true;

     window.removeEventListener("keydown", keydownHandler, false)
     input.disabled = true;
}