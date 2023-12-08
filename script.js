class Card {
    constructor(suit, rank) {
      this.suit = suit;
      this.rank = rank;
    }
  }
  //The Card class represents a playing card with properties for its suit and rank.

  class Deck {
    constructor() {
      this.cards = [];
      this.generateDeck();
      this.shuffle();
    }

    //The Deck class represents a deck of playing cards, and it provides methods for generating, shuffling, and dealing cards. A game requires a deck to draw cards from, and shuffling ensures randomness in the order of the cards.
  
    generateDeck() {
      const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
      for (const suit of suits) {
        for (const rank of ranks) {
          this.cards.push(new Card(suit, rank));
        }
      }
    }
    // Fills the cards array with a standard deck of 52 cards.
    shuffle() {
      let currentIndex = this.cards.length;
  
      while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        const temporaryValue = this.cards[currentIndex];
        this.cards[currentIndex] = this.cards[randomIndex];
        this.cards[randomIndex] = temporaryValue;
      }
    }
    // Implements the Fisher-Yates shuffle algorithm I found on google, to randomize the order of cards.
  
    deal() {
      return this.cards.pop();
    }
  }
// Returns the top card from the deck, removing it from the array.

class Player {
    constructor(name) {
      this.name = name;
      this.hand = [];
    }
//The Player class represents a player in the game, with methods for drawing cards, playing cards, and adding cards to the player's hand.Players need a way to interact with the deck, draw cards, and manage their hands during the game.
  
    draw(deck) {
      this.hand.push(deck.deal());
    }

    // Draws a card from the given deck and adds it to the player's hand.
  
    playCard() {
      return this.hand.pop();
    }

    // Removes and returns the top card from the player's hand.
  
    addToHand(cards) {
      this.hand = this.hand.concat(cards);
    }

    // Adds an array of cards to the player's hand.
  }

  
  
  class Game {
    constructor() {
      this.player1 = new Player('Player 1');
      this.player2 = new Player('Player 2');
      this.deck = new Deck();
    }
  // The Game class represents the overall game, with methods for playing rounds, determining the winner, and starting the game This class orchestrates the game flow, managing players, the deck, and the overall progression of the game.

    playRound() {
      const card1 = this.player1.playCard();
      const card2 = this.player2.playCard();
  
      console.log(`${this.player1.name} plays ${card1.rank} of ${card1.suit}`);
      console.log(`${this.player2.name} plays ${card2.rank} of ${card2.suit}`);
  
      if (card1.rank > card2.rank) {
        console.log(`${this.player1.name} wins the round!\n`);
        this.player1.addToHand([card1, card2]);
      } else if (card1.rank < card2.rank) {
        console.log(`${this.player2.name} wins the round!\n`);
        this.player2.addToHand([card1, card2]);
      } else {
        console.log("It's a tie!\n");
      }
    }
//   Simulates a round of the game, including playing cards, comparing ranks, and determining the round winner.
    determineWinner() {
      if (this.player1.hand.length > this.player2.hand.length) {
        console.log(`${this.player1.name} wins the game!`);
      } else if (this.player1.hand.length < this.player2.hand.length) {
        console.log(`${this.player2.name} wins the game!`);
      } else {
        console.log("It's a tie!");
      }
    }
    // Compares the number of cards each player has to declare the overall winner of the game.
  
    startGame() {
      // Deal cards to players
      for (let i = 0; i < 26; i++) {
        this.player1.draw(this.deck);
        this.player2.draw(this.deck);
      }
  
      // Play rounds until one player runs out of cards
      while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
        this.playRound();
      }
  
      // Determine the overall winner
      this.determineWinner();
    }
  }
// This is the entry point for the game, creating an instance of the Game class and starting the game loop.
  
  
 const warGame = new Game();
  warGame.startGame();
  // This is the entry point for the game, creating an instance of the Game class and starting the game loop. m,This demonstrates how to use the classes together to simulate a complete game of War.