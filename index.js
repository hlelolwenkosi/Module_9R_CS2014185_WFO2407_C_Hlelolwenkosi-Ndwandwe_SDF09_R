// Player object with name and chips
let player = {
    name: "Per",
    chips: 200
}

// Initialize game variables
let cards = []         // Array to store the cards drawn
let sum = 0            // Total sum of the drawn cards
let hasBlackJack = false  // Flag to check if the player has Blackjack
let isAlive = false    // Flag to check if the player is still in the game
let message = ""       // Variable to store the game message

// Get elements from the DOM
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

// Display player's name and chips on the page
playerEl.textContent = player.name + ": $" + player.chips

// Function to generate a random card value
function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10     // Face cards (J, Q, K) are worth 10
    } else if (randomNumber === 1) {
        return 11     // Ace is worth 11
    } else {
        return randomNumber // Return the card number (2-10)
    }
}

// Function to start a new game
function startGame() {
    isAlive = true
    hasBlackJack = false // Reset Blackjack flag
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard] // Initialize cards array
    sum = firstCard + secondCard     // Calculate initial sum
    renderGame()                    // Render the game state
}

// Function to update the game display
function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "  // Display each card
    }
    
    sumEl.textContent = "Sum: " + sum // Display the sum of cards
    
    // Determine the game message based on the sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!" // Player wins with a Blackjack
        hasBlackJack = true
    } else {
        message = "You're out of the game!" // Player loses if sum is over 21
        isAlive = false
    }
    messageEl.textContent = message // Update the message on the page
}

// Function to draw a new card
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame() // Update the game state after drawing a new card
    }
}
