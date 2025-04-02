const $start = document.querySelector(".start")
const $restart = document.querySelector(".again")
const $add = document.querySelector(".add")
const $stand = document.querySelector(".stand")

const $pCards = document.querySelector(".player")
const $dCards = document.querySelector(".dealer")

const $gMsg = document.querySelector(".game-msg")
const $pTotal = document.querySelector(".t-player")
const $dTotal = document.querySelector(".t-dealer")

let pCards = []
let dCards = []
let pCard1, pCard2
let dCard1, dCard2
let pTotal, dTotal

let chips = 1000

/** Flags */
let hasWon = false
let isDraw = false
let isAlive = true
let dBJ = false
let pBJ = false

function randomizeCards(card1, card2) {
  card1 = Math.floor(Math.random()*10) + 2
  card2 = Math.floor(Math.random()*10) + 2
  return cardArr = [card1, card2]
}

function sumOfCards(cardArr) {
  return sum = cardArr.reduce((acc, card) => acc + card)
}

function preventBust(sum, card1, arr) {
  if (sum === 22) {
    card1 = 1
    arr[0] = card1
    sum = sumOfCards(arr)
  }

  return sum
}

function showDealerPair() {
  $stand.style.display = "none"
  $add.style.display = "none"
  $dCards.querySelectorAll("span")[1].textContent = dCards[1]
  $dTotal.textContent = dTotal
}
function onFirstPair() {
  if (dTotal !== 21 && pTotal !== 21) {
    isDraw = false
    hasWon = false
    isAlive = true
    // $gMsg.textContent = `Hit or Stand? Current: ${pTotal}`
  } else {
    if (dTotal === 21 && pTotal === 21) {
      isDraw = true
    } else if (dTotal === 21) {
      isAlive = false
      dBJ = true
      // $gMsg.textContent = `Dealer Blackjack!`
    } else if (pTotal === 21) {
      hasWon = true
      pBJ = true
      // $gMsg.textContent = `Blackjack!`
    }
    showDealerPair()
    showResults()
  }
}

function onPlayerHit() {
  if (pTotal === 21) {
    onDealerHit()
    if (dTotal === 21) {
      isDraw = true
      // $gMsg.textContent = `Draw.`
    } else {
      hasWon = true
      // $gMsg.textContent = `You won 100 chips!`
    }
    showResults()
  } else if (pTotal > 21) {
    isAlive = false
    // $gMsg.textContent = `Bust!`
    showDealerPair()
    showResults()
  } else {
    // $gMsg.textContent = `Hit or Stand? Current: ${pTotal}`
    isDraw = false
    isAlive = true
    hasWon = false
  }
}

function onDealerHit() {
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

  } 
  
  $dTotal.textContent = dTotal

}

/** Fn to check win status after standing */
function showResults() {
  if (isDraw === true) {
    $gMsg.textContent = `Draw.`
  } else if (isAlive === false) {
    $gMsg.textContent = `You lost.`
    if (dBJ === true){
      $gMsg.textContent = `Dealer Blackjack. You lost.`
    }
  } else if (hasWon === true) {
    $gMsg.textContent = `You win!`
    if (pBJ === true) {
      $gMsg.textContent = `Blackjack! You win!`
    }
  }
}

/** Start Game */
$start.addEventListener("click", startGame = () => {

  $gMsg.textContent = ``
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
  pTotal = preventBust(pTotal, pCard1, pCards)
  dTotal = preventBust(dTotal, dCard1, dCards) 
  
  // Displays all player cards on screen
  for (let card of pCards) {
    let $thisCard = document.createElement("span")
    $thisCard.textContent = card
    $pCards.append($thisCard)
    
  }
  // Displays first dealer card only on screen
  dCards.forEach((card, index) => {
    let $thisCard = document.createElement("span")
    $thisCard.textContent = (index === 0) ? card : "?";
    $dCards.append($thisCard)
  })
  // Removes Start button and displays total
  $start.style.display = "none"
  $dTotal.textContent = "?"
  $pTotal.textContent = pTotal 
  
  // Check for Blackjack
  onFirstPair()
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

  onPlayerHit()

  $pTotal.textContent = pTotal 
})

/** Stand Cards in Hand */
$stand.addEventListener("click", () => {
  onDealerHit()
  if (dTotal === 21) {
    isAlive = false
  } else if (dTotal > 21) {
    hasWon = true
  } else {
    if (dTotal > pTotal) {
      isAlive = false
    } else if (dTotal < pTotal) {
      hasWon = true
    } else {
      isDraw = true
    }
  }
  showResults()
})

/** New Round */
$restart.addEventListener("click", () => {

  hasWon = false

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

