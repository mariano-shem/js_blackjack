$start = document.querySelector(".start")
$restart = document.querySelector(".again")
$add = document.querySelector(".add")
$stand = document.querySelector(".stand")

$pCards = document.querySelector(".player")
$dCards = document.querySelector(".dealer")

let $gMsg = document.querySelector(".game-msg")
let $pTotal = document.querySelector(".t-player")
let $dTotal = document.querySelector(".t-dealer")

let pCards = []
let dCards = []
let pCard1, pCard2
let dCard1, dCard2
let pTotal, dTotal

let chips = 1000

/** Flags */
let hasBlackjack = false
let isDefeated = false
let isDraw = false

function randomizeCards(card1, card2) {
  card1 = Math.floor(Math.random()*10) + 2
  card2 = Math.floor(Math.random()*10) + 2
  return cardArr = [card1, card2]
}

function sumOfCards(cardArr) {
  return sum = cardArr.reduce((acc, card) => acc + card)
}

function preventExceed(sum, card1, arr) {
  if (sum === 22) {
    card1 = 1
    arr[0] = card1
    sum = sumOfCards(arr)
  }

  return sum
}

function checkSum(sum) {

  if (sum <= 20) {
    $gMsg.textContent = `Hit or Stand? Current: ${sum}`
  } else if (sum === 21) {
    hasBlackjack = true
    $gMsg.textContent = `Blackjack!`
    $stand.style.display = "none"
    $add.style.display = "none"

    $dCards.querySelectorAll("span")[1].textContent = dCards[1]
    $dTotal.textContent = dTotal
  } else {
    isDefeated = true
    $stand.style.display = "none"
    $add.style.display = "none"
    $gMsg.textContent = `You lost. Total: ${sum}`

    $dCards.querySelectorAll("span")[1].textContent = dCards[1]
    $dTotal.textContent = dTotal
  }

  $pTotal.textContent = sum
}

/** Fn to check if dealer gets Blackjack at first two cards */
function dealerBlackJack() {
  if (dTotal === 21) {
    isDefeated = true
    $stand.style.display = "none"
    $add.style.display = "none"
    $dTotal.textContent = dTotal
    $dCards.querySelectorAll("span")[1].textContent = dCards[1]
  }
}

/** Fn to check if player and dealer hit Blackjack at first two cards */
function bothBlackJack() {
  if (dTotal === 21 && pTotal === 21) {
    isDraw = true
    $stand.style.display = "none"
    $add.style.display = "none"
    $dTotal.textContent = dTotal
    $dCards.querySelectorAll("span")[1].textContent = dCards[1]
  }
}

/** Fn to check win status after standing */
function checkWin() {
  if (dTotal < 22) {
    if (dTotal === pTotal) {
      isDefeated = false
      isDraw = true
      $gMsg.textContent = "Draw!"
    } else if (dTotal > pTotal) {
      isDefeated = true
      isDraw = false
      $gMsg.textContent = "You lost."
    } else {
      isDefeated = false
      isDraw = false
      $gMsg.textContent = "You win!"
    }
  } else {
    isDefeated = false
    $gMsg.textContent = "You win!"
  }

  console.log(`isDraw: ${isDraw}`)
  console.log(`isDefeated: ${isDefeated}`)
}

/** Start Game */
$start.addEventListener("click", startGame = () => {

  $restart.style.display = "inline"
  $add.style.display = "inline"
  $stand.style.display = "inline"

  // Randomizes first two cards of both player and dealer
  pCards = randomizeCards(pCard1, pCard2, pCards)
  dCards = randomizeCards(dCard1, dCard2, dCards)

  // Returns sum of first two cards
  pTotal = sumOfCards(pCards)
  dTotal = sumOfCards(dCards)

  // Converts 1st card to 1 if both cards are valued at 11
  pTotal = preventExceed(pTotal, pCard1, pCards)
  dTotal = preventExceed(dTotal, dCard1, dCards)

  checkSum(pTotal)

  $dTotal.textContent = ""

  
  // Displays all player cards on screen
  for (let card of pCards) {
    let $thisCard = document.createElement("span")
    $thisCard.textContent = card
    $pCards.append($thisCard)
    
  }
  
  // Displays first dealer card only on screen
  for (let card of dCards) {
    let $thisCard = document.createElement("span")
    if (dCards.indexOf(card) === 0) {
      $thisCard.textContent = card
    } else {
      $thisCard.textContent = "?"
    }
    $dCards.append($thisCard)
  }
  
  // Removes Start button on first game
  $start.style.display = "none"
  
  bothBlackJack()
  dealerBlackJack()
  
  console.log(`Dealer: ${dTotal}`)
})

/** Add Card on Hand */
$add.addEventListener("click", () => {

  let newCard = Math.floor(Math.random()*10) + 2
  pCards.push(newCard)
  pTotal = sumOfCards(pCards)

  // Displays added card on screen
  let $thisCard = document.createElement("span")
  $thisCard.textContent = newCard
  $pCards.append($thisCard)

  checkSum(pTotal)
})

/** New Round */
$restart.addEventListener("click", () => {

  hasBlackjack = false

  // Deletes cards inside array
  pCards.length = 0
  dCards.length = 0

  // Deletes cards on display
  
  let allHand = document.querySelectorAll(".hand")

  for (let hand of allHand) {
    let $allCards = hand.querySelectorAll("span")
    for (let thisCard of $allCards) {
      thisCard.remove()
    }
  }

  startGame()
})

/** Stand Cards in Hand */
$stand.addEventListener("click", () => {
  $dCards.querySelectorAll("span")[1].textContent = dCards[1]
  $add.style.display = "none"
  $stand.style.display = "none"
  
  while (dTotal < 17) {
    let $thisCard = document.createElement("span")
    let newCard = Math.floor(Math.random()*10) + 2

    dCards.push(newCard)
    dTotal = sumOfCards(dCards)

    $thisCard.textContent = newCard
    $dCards.append($thisCard)

    console.log(dCards)
    console.log(dTotal)
  } 
  
  $dTotal.textContent = dTotal

  checkWin()
})


