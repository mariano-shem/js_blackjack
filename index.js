startBtn = document.querySelector(".start")
restartBtn = document.querySelector(".again")
addBtn = document.querySelector(".add")
standBtn = document.querySelector(".stand")
playerDeck = document.querySelector(".deck-player")
dealerDeck = document.querySelector(".deck-dealer")
let playerCards = []
let dealerCards = []
let firstPlayerCard, secondPlayerCard
let firstDealerCard, secondDealerCard
let sumPlayer, sumDealer

/* Flags */
let hasBlackjack = false

function randomizeCards(firstCard, secondCard) {
  firstCard = Math.floor(Math.random()*10) + 2
  secondCard = Math.floor(Math.random()*10) + 2
  return cardArr = [firstCard, secondCard]
}

function sumOfCards(cardArr) {
  return sum = cardArr.reduce((acc, card) => acc + card)
}

function preventExceed(sum, firstCard, arr) {
  if (sum === 22) {
    firstCard = 1
    arr[0] = firstCard
    sum = sumOfCards(arr)
  }

  return sum
}

function checkSum(sum) {
  if (sum <= 20) {
    console.log(`Your cards total to ${sum}! Hit another one?`)
  } else if (sum === 21) {
    hasBlackjack = true
    console.log(`Blackjack!`)
  } else {
    console.log(`You've exceeded your cards for a total of ${sum}!`)
  }
}

/* Start Game */
startBtn.addEventListener("click", startGame = () => {

  restartBtn.style.display = "inline"
  addBtn.style.display = "inline"
  standBtn.style.display = "inline"

  // Randomizes first two cards of both player and dealer
  playerCards = randomizeCards(firstPlayerCard, secondPlayerCard, playerCards)
  dealerCards = randomizeCards(firstDealerCard, secondDealerCard, dealerCards)

  // Returns sum of first two cards
  sumPlayer = sumOfCards(playerCards)
  sumDealer = sumOfCards(dealerCards)

  // Converts 1st card to 1 if both cards are valued at 11
  sumPlayer = preventExceed(sumPlayer, firstPlayerCard, playerCards)
  sumDealer = preventExceed(sumDealer, firstDealerCard, dealerCards)

  checkSum(sumPlayer)

  // Displays all player cards on screen
  for (let card of playerCards) {
    let thisCard = document.createElement("span")
    thisCard.textContent = card
    playerDeck.append(thisCard)
  }

  // Displays first dealer card only on screen
  let dealerShow = document.createElement("span")
  dealerShow.textContent = dealerCards[0]
  dealerDeck.append(dealerShow)

  // Removes Start button on first game
  startBtn.style.display = "none"
  console.log(`Blackjack?: ${hasBlackjack}`)
  console.log(`Player cards: ${playerCards}`)
  console.log(`Dealer cards: ${dealerCards}`)

})

/* Add Card on Deck */
addBtn.addEventListener("click", () => {

  newCard = Math.floor(Math.random()*10) + 2
  playerCards.push(newCard)
  sumPlayer = sumOfCards(playerCards)

  // Displays added card on screen
  let thisCard = document.createElement("span")
  thisCard.textContent = newCard
  playerDeck.append(thisCard)
  
  console.log(`Another hit! Your total is now ${sum}!`)
  checkSum(sumPlayer)

  console.log(hasBlackjack)
  console.log(playerCards)
})

/* Remove All Card */
restartBtn.addEventListener("click", () => {

  hasBlackjack = false

  // Deletes cards inside array
  playerCards.length = 0
  dealerCards.length = 0

  // Deletes cards on display
  
  let allDecks = document.querySelectorAll(".deck")

  for (let deck of allDecks) {
    let allCards = deck.querySelectorAll("span")
    for (let thisCard of allCards) {
      thisCard.remove()
    }
  }

  startGame()
})

/* Stand Current Cards */
standBtn.addEventListener("click", () => {
  
})

