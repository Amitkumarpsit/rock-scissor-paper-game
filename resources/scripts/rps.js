// Define variables with initial values
let userMove = ''; // Initialize variable to store user's move
let computerMove = ''; // Initialize variable to store computer's move
let result = ''; // Initialize variable to store game result
// Retrieve game data from localStorage or initialize if not present
let game = JSON.parse(localStorage.getItem('game')) || { wins: 0, looses: 0, ties: 0 }; // Retrieve game data from localStorage or initialize with default values
let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || []; // Retrieve game history from localStorage or initialize as an empty array

// Function to capture user move
function captureUserMove(move) {
  userMove = move; // Set user's move
  console.log("userMove: " + userMove); // Log user's move
}

// Function to generate computer move
function generateComputerMove() {
  const randNum = Math.random(); // Generate random number between 0 and 1
  if (randNum < 1 / 3) { // Divide the range into thirds
    computerMove = 'Rock'; // Set computer's move to Rock
  } else if (randNum < 2 / 3) {
    computerMove = 'Paper'; // Set computer's move to Paper
  } else {
    computerMove = 'Scissors'; // Set computer's move to Scissors
  }
  console.log("computerMove: " + computerMove); // Log computer's move
}

// Function to evaluate user and computer moves and determine the result
function evaluateMoves() {
  if (userMove === computerMove) { // If user's move is the same as computer's move
    result = 'Tie'; // Set result to Tie
  } else if ((userMove === 'Rock' && computerMove === 'Scissors') || // If user wins
    (userMove === 'Scissors' && computerMove === 'Paper') ||
    (userMove === 'Paper' && computerMove === 'Rock')) {
    result = 'Win'; // Set result to Win
  } else {
    result = 'Loose'; // Set result to Loose (typo: should be "Lose" instead of "Loose")
  }
  console.log('result: ' + result); // Log result
}

// Function to update game scores and history
function updateScores() {
  // Update game scores based on the result
  if (result === 'Win') {
    game.wins++; // Increment wins
  } else if (result === 'Tie') {
    game.ties++; // Increment ties
  } else if (result === 'Loose') {
    game.looses++; // Increment losses (typo: should be "losses" instead of "looses")
  }
  console.log(game); // Log updated game scores
  // Create a new game history item and add it to the game history
  const gameHistoryItem = {
    userMove: userMove,
    computerMove: computerMove,
    result: result
  };
  gameHistory.push(gameHistoryItem); // Add game history item
  // Update localStorage with the updated game data
  localStorage.setItem('game', JSON.stringify(game)); // Store game data in localStorage
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory)); // Store game history in localStorage
}

// Function to render the game summary
function renderGameSummary() {
  const gamesPlayed = game.wins + game.looses + game.ties; // Calculate total games played
  // Update HTML elements with game summary data
  document.getElementById('wins').innerHTML = game.wins; // Update wins count in HTML
  document.getElementById('ties').innerHTML = game.ties; // Update ties count in HTML
  document.getElementById('looses').innerHTML = game.looses; // Update losses count in HTML (typo: should be "losses" instead of "looses")
  document.getElementById('gamesPlayed').innerHTML = gamesPlayed; // Update total games played count in HTML
}

// Function to render the game history
function renderGameHistory() {
  let gameHistoryHTML = `
  <tr>
    <th>#</th>
    <th>User Move</th>
    <th>Computer Move</th>
    <th>Result</th>
  </tr>
  `; // Initialize game history table HTML
  // Generate HTML for each game history item and append it to the game history table
  for (let i = 0; i < gameHistory.length; i++) {
    const gameItem = gameHistory[i]; // Get current game history item
    gameHistoryHTML += `
    <tr>
      <td>${i + 1}</td>
      <td>${gameItem.userMove}</td>
      <td>${gameItem.computerMove}</td>
      <td>${gameItem.result}</td>
    </tr>
    `; // Add HTML for current game history item
  }
  document.getElementById('gameHistory').innerHTML = gameHistoryHTML; // Update game history table in HTML
}

// Function to play a game
function playGame(move) {
  captureUserMove(move); // Capture user's move
  generateComputerMove(); // Generate computer's move
  evaluateMoves(); // Evaluate user and computer moves
  updateScores(); // Update game scores and history
  renderGameSummary(); // Render game summary
  renderGameHistory(); // Render game history
}

// Function to reset game scores and history
function resetScores() {
  // Reset game scores and history
  game = { wins: 0, looses: 0, ties: 0 }; // Reset game scores
  gameHistory = []; // Clear game history
  // Update localStorage with the reset game data
  localStorage.setItem('game', JSON.stringify(game)); // Store reset game data in localStorage
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory)); // Store empty game history in localStorage
}
