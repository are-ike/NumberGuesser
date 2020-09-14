/*GAME FUNCTION
1.  Player must guess a num between min and max 
2. Player gets a certain amount of guesses
3. Notify player of guesses remaining
4. Notify player of correct answer if lose
5. Let player choose to play again
*/ 
//randomize winning number
const getRandomNum = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1) + min); 
}
//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Set message function
const setMessage = (msg, color) => {
    message.style.color = color;
    message.textContent = msg;
}

const gameOver = (won, message) => {
    let color;
    won === true ? color = 'green' : color = 'red';
    //disable input
    guessInput.disabled = true;
    //change bordercolor
    guessInput.style.borderColor = color;

    setMessage(message, color);

    //play again
    guessBtn.value = 'Play Again';
    guessBtn.classList.add('playAgain');
}

//Guess button function
const submitGuess = () => {
    let guess = parseInt(guessInput.value);

    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        return;
    }

    if(guess === winningNum){
        gameOver(true, `${winningNum} is correct. YOU WIN!`);
    }
    else{
        //if guess is wrong
        guessesLeft -= 1;

        if(guessesLeft === 0){
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

        }
        else{
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');

            //clear input
            guessInput.value = '';
        }
         
    }
}
        

guessBtn.addEventListener('click', submitGuess);
//event delegation for play again. adding event to game div
game.addEventListener('mousedown', function(e){
    if(e.target.classList.contains('playAgain')){
        window.location.reload();
    }
})