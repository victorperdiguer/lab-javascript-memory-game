class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
    //added property for last part of lab
    this.cardsGuessed = [];
  }

  shuffleCards() {
    if (this.cards.length === 0) {
      return undefined;
    }
    for (let i = 0; i < this.cards.length; i++) {
      let randomPosition = Math.floor(Math.random() * this.cards.length);
      let firstCard = this.cards[i];
      let secondCard = this.cards[randomPosition];
      this.cards[i] = secondCard;
      this.cards[randomPosition] = firstCard;
    }
    return this.cards;
  }

  checkIfPair(card1, card2) {
    this.pairsClicked++;
    if (card1 === card2) {
      this.pairsGuessed++;
      return true;
    }
    return false;
  }

  checkIfFinished() {
    if (this.pairsGuessed === this.cards.length/2) {
      return true;
    }
    return false;
  }
}
