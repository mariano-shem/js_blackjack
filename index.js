const $restart = document.querySelector(".again")
const $add = document.querySelector(".add")
const $stand = document.querySelector(".stand")
const $rBank = document.querySelector(".reset-bank")
const $rBet = document.querySelector(".reset-bet")

const $confbet = document.querySelector(".confbet")
const $bets = document.querySelectorAll(".bets")
const $bWrap = document.querySelector(".bet-wrap")

const $pCards = document.querySelector(".player")
const $dCards = document.querySelector(".dealer")

const $gMsg = document.querySelector(".game-msg")
const $pTotal = document.querySelector(".t-player")
const $dTotal = document.querySelector(".t-dealer")

const $accChips = document.querySelector(".mychips")
const $accBets = document.querySelector(".betinfo")
const $ret = document.querySelector(".myreturn")

let pCards = []
let dCards = []
let pCard1, pCard2
let dCard1, dCard2
let pTotal, dTotal

let chips = 1000
let totalbet = 0
$accChips.textContent = `$${chips}`

/** Flags */
let hasWon = false
let isDraw = false
let isAlive = true
let dBJ = false
let pBJ = false

// $confbet.style.display = "none"
// $rBank.style.display = "none"
// $rBet.style.display = "none"

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

    let newCard = Math.floor(Math.random()*10) + 2
    
    dCards.push(newCard)
    dTotal = sumOfCards(dCards)

    let $thisCard = document.createElement("span")
    $thisCard.textContent = newCard
    $dCards.append($thisCard)

  } 
  
  $dTotal.textContent = dTotal

}

/** Fn to check win status after standing */
function showResults() {
  if (isDraw === true) {
    $gMsg.textContent = `Draw. You get ${totalbet} back.`
    $ret.textContent = `$${totalbet}`
    chips += totalbet
  } else if (isAlive === false) {
    $gMsg.textContent = `You lost ${totalbet}.`
    $ret.textContent = `$0`
    if (dBJ === true){
      $gMsg.textContent = `Dealer Blackjack. You lost ${totalbet}.`
    }
  } else if (hasWon === true) {
    $gMsg.textContent = `You win  ${totalbet * 2}!`
    $ret.textContent = `$${totalbet * 2}`
    chips += totalbet * 2
    if (pBJ === true) {
      $gMsg.textContent = `Blackjack! You win  ${(totalbet * 2) + (totalbet/2)}!`
      chips += (totalbet * 2) + (totalbet/2)
    }
  }

  if (chips > 0) {
    $accBets.textContent = `$0`
    $restart.style.display = "inline"
    $confbet.style.display = "none" 
    $rBet.style.display = "none" 
  } else if (chips === 0){
    $accBets.textContent = `$0`
    $rBank.style.display = "inline"
  }

  $accChips.textContent = `$${chips}`
  totalbet = 0
}

/** Start Game */
function startGame() {

  $gMsg.textContent = ``
  $add.style.display = "inline"
  $stand.style.display = "inline"
  $bWrap.style.display = "none"
  $confbet.style.display = "none"
  $rBet.style.display = "none"

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
  $dTotal.textContent = "?"
  $pTotal.textContent = pTotal 
  
  // Check for Blackjack
  onFirstPair()
}

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
  $bWrap.style.display = "flex"
  $restart.style.display = "none"
  $ret.textContent = `$0`
})

$bets.forEach((bet) => {bet.addEventListener("click", function placeBets() {
  let mybet = Number(this.textContent)
  let tempbet = totalbet
  tempbet += mybet
  $rBet.style.display = "inline"
  if (tempbet <= chips && tempbet !== 0) {
    totalbet = tempbet
    $accBets.textContent = `$${totalbet}`
    $confbet.style.display = "inline"
  } else if (tempbet > chips && tempbet > 1000) {
    $accBets.textContent = `Exceeded.`
  }
})})

$confbet.addEventListener("click", () => {
  if (totalbet > 0) {
    chips -= totalbet
    $accChips.textContent = `$${chips}`
    $accBets.textContent = `$${totalbet}`
    $bWrap.style.display = "none"
    $confbet.style.display = "none"
    $rBet.style.display = "none"
  
    // Reset all flags
    isAlive = true
    isDraw = false
    hasWon = false
    dBJ = false
    pBJ = false
  
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
  }
})

$rBet.addEventListener("click", () => {
  totalbet = 0
  $confbet.style.display = "none"
  $rBet.style.display = "none"
  $accBets.textContent = `$0`
})

$rBank.addEventListener("click", () => {
  chips = 1000
  $accChips.textContent = `$${chips}`
  $bWrap.style.display = "flex"
  $rBank.style.display = "none"
  $gMsg.textContent = ""
})