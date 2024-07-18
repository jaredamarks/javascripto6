// Card class
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
//Array of all cards
    toString() {
        const valueNames = [null, null, "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
        return `${valueNames[this.value]} of ${this.suit}`;
    }
}

// Deck class
class Deck {
    constructor() {
        this.cards = [];
        this.initializeDeck();
        this.shuffle();
    }
// Organize the suit of deck
    initializeDeck() {
        const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        for (let suit of suits) {
            for (let value = 2; value <= 14; value++) {
                this.cards.push(new Card(suit, value));
            }
        }
    }
// Shuffles deck
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
// Deals deck of cards
    deal() {
        const hand1 = this.cards.slice(0, 26);
        const hand2 = this.cards.slice(26);
        return [hand1, hand2];
    }
}

// Player class
class Player {
    constructor() {
        this.hand = [];
        this.score = 0;
    }
// Play card
    playCard() {
        return this.hand.shift();
    }
// Add point
    addPoint() {
        this.score++;
    }
}

// Game class
class Game {
    constructor() {
        this.player1 = new Player();
        this.player2 = new Player();
        this.deck = new Deck();
    }
// Starts game
    startGame() {
        [this.player1.hand, this.player2.hand] = this.deck.deal();
    }
// Display round of card and winner/loser of round
    playRound() {
        const card1 = this.player1.playCard();
        const card2 = this.player2.playCard();

        console.log(`Player 1 plays: ${card1.toString()}`);
        console.log(`Player 2 plays: ${card2.toString()}`);

        if (card1.value > card2.value) {
            console.log("Player 1 wins the round");
            this.player1.addPoint();
        } else if (card1.value < card2.value) {
            console.log("Player 2 wins the round");
            this.player2.addPoint();
        } else {
            console.log("This round is a tie");
        }
    }
// Loop to start game 
    playGame() {
        this.startGame();
        for (let i = 0; i < 26; i++) {
            this.playRound();
        }

        console.log(`Final Score - Player 1: ${this.player1.score}, Player 2: ${this.player2.score}`);
        if (this.player1.score > this.player2.score) {
            console.log("Player 1 wins the game!");
        } else if (this.player1.score < this.player2.score) {
            console.log("Player 2 wins the game!");
        } else {
            console.log("The game is a tie!");
        }
    }
}

// Start the game
const game = new Game();
game.playGame();
