const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);

//no 2 games are the same!
memoryGame.shuffleCards();

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;
  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      //add the clicked card to the pickedCards list
      const cardName = card.getAttribute("data-card-name");
      memoryGame.pickedCards.push(cardName);
      console.log(memoryGame.pickedCards);
      card.classList.add("turned");
      //if we have 2 cards in the pickedCards list, we compare them
      if (memoryGame.pickedCards.length === 2) {
        if (memoryGame.checkIfPair(memoryGame.pickedCards[0],memoryGame.pickedCards[1])) {
          console.log("A pair!");
          //save them to the guessed cards list so we don't unturn them later
          memoryGame.cardsGuessed.push(cardName);
        }
        else {
          console.log("No luck!");
          //after a 1 sec delay, unturn wrong pairs
          setTimeout(() => {
            document.querySelectorAll('.card').forEach((card) => {
              //only unturn cards that aren't in the guessed list
              if (!memoryGame.cardsGuessed.includes(card.getAttribute("data-card-name"))){
                card.classList.remove("turned");
              }
            })
          }, 1000)
        }
        //empty the array of pickedCards after comparing them
        memoryGame.pickedCards.length = 0;
      }
      //update scoreboard
      document.querySelectorAll('#pairs-clicked')[0].textContent = memoryGame.pairsClicked;
      document.querySelectorAll('#pairs-guessed')[0].textContent = memoryGame.pairsGuessed;
      if (memoryGame.checkIfFinished()) {
        //timeout makes time for the card to turn once we win
        setTimeout(() => {
          alert("You win!")
        }, 500)
        //little winning animation!
        setInterval(() => {
          document.querySelectorAll('.card').forEach((card) => {
            setTimeout(() => {
              card.classList.remove("turned");
            }, 500);
            setTimeout(() => {
              card.classList.add("turned");
            }, 1000);
          })
        }, 2000);
      }
    });
  });
});
