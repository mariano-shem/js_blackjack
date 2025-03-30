startBtn = document.querySelector(".start")
addBtn = document.querySelector(".add")
playerDeck = document.querySelector(".deck-player")
let playerCards = []
let firstCard
let secondCard
let sum

function sumOfCards(playerCards) {
  return sum = playerCards.reduce((acc, card) => acc + card)
}

startBtn.addEventListener("click", () => {
  firstCard = Math.floor(Math.random()*10) + 2
  secondCard = Math.floor(Math.random()*10) + 2
  playerCards = [firstCard, secondCard]
  
  sumOfCards(playerCards)

  for (card of playerCards) {
    thisCard = document.createElement("span")
    thisCard.textContent = card
    playerDeck.append(thisCard)
  }


  console.log(playerCards)
  console.log(sum)
})

addBtn.addEventListener("click", () => {
  newCard = Math.floor(Math.random()*10) + 2
  playerCards.push(newCard)

  sumOfCards(playerCards)

  console.log(playerCards)
  console.log(sum)
})


