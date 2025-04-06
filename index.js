const $restart = document.querySelector(".restart")
const $double = document.querySelector(".double")
const $hit = document.querySelector(".hit")
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

let suits = [
  "assets/suits/diamond-suit.svg",
  "assets/suits/heart-suit.svg",
  "assets/suits/club-suit.svg",
  "assets/suits/spade-suit.svg",
]

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
let doesDouble = false
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
function randomizeSuits(card) {
  return new Promise(resolve => {
    let thisSuit = Math.floor(Math.random() * suits.length)
  
    let $thisImg = document.createElement("img")
    $thisImg.src = suits[thisSuit]
    $thisImg.className = "suit"
  
    if (thisSuit < 2) {
      card.style.color = "#bc1a1a"
    }
    card.append($thisImg)
    resolve()
  })
}
function sumOfCards(cardArr) {
  return sum = cardArr.reduce((acc, card) => acc + card)
}
async function createCard(allC, nC) {
  let $thisCard = document.createElement("span")
  $thisCard.textContent = (nC === 11) ? "A" : nC;
  await randomizeSuits($thisCard)
  allC.append($thisCard)
}
function preventBust(sum, card1, arr) {
  if (sum === 22) {
    card1 = 1
    arr[0] = card1
    sum = sumOfCards(arr)
  }
  return sum
}
function checkBust(card, sum, arr) {
  if (sum > 21) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 11) {
        arr[i] = 1
        sum = sumOfCards(arr)
      }
    }
  }
  return sum
}
function showDealerPair() {
  $stand.style.display = "none"
  $hit.style.display = "none"
  $double.style.display = "none"
  $dCards.querySelector("span").textContent = (dCards[0] === 11) ? "A" : dCards[0];
  randomizeSuits($dCards.querySelector("span"))
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
  $dCards.querySelector("span").textContent = (dCards[0] === 11) ? "A" : dCards[0];
  randomizeSuits($dCards.querySelector("span"))
  $hit.style.display = "none"
  $stand.style.display = "none"
  $double.style.display = "none"
  for(let i = 0; dTotal < 17; i++) {
    let newCard = Math.floor(Math.random()*10) + 2
    dCards.push(newCard)
    dTotal = sumOfCards(dCards)
    dTotal = checkBust(newCard, dTotal, dCards)

    setTimeout(() => {
      createCard($dCards, newCard)
    }, 250 * i)
    

  }

  $dTotal.textContent = dTotal
  
}

function onStand() {
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
}

/** Fn to check win status after standing */
function showResults() {
  if (isDraw === true) {
    if (doesDouble) {
      chips += totalbet/2
    } else {
      chips += totalbet
    }
    $gMsg.textContent = `Push. You get $${totalbet} back.`
    $ret.textContent = `$${totalbet}`

  } else if (isAlive === false) {
    $gMsg.textContent = `You lost $${totalbet}.`
    $ret.textContent = `$0`

    if (dBJ === true){
      $gMsg.textContent = `Dealer Blackjack. You lost $${totalbet}.`
    }
  } else if (hasWon === true) {
    if (pBJ === true) {
      $gMsg.textContent = `Blackjack! You win  $${(totalbet * 2) + (totalbet/2)}!`
      $ret.textContent = `$${(totalbet * 2) + (totalbet/2)}`
      chips += (totalbet * 2) + (totalbet/2)
    } else {
      $gMsg.textContent = `You win  $${totalbet * 2}!`
      $ret.textContent = `$${totalbet * 2}`
      chips += totalbet * 2
    }
  }

  if (chips > 0) {
    $restart.style.display = "inline"
    $confbet.style.display = "none" 
    $rBet.style.display = "none" 
  } else if (chips === 0){
    $rBank.style.display = "inline"
  }

  $accChips.textContent = `$${chips}`
}

/** Start Game */
async function startGame() {

  $gMsg.textContent = ``
  $hit.style.display = "inline"
  $stand.style.display = "inline"
  $bWrap.style.display = "none"
  $confbet.style.display = "none"
  $rBet.style.display = "none"
  
  if (totalbet <= chips) {
    $double.style.display = "inline"
  }


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
  pCards.forEach((card, index) => {
    setTimeout(() => {
      createCard($pCards, card)
    }, 250 * index)
  })
  // Displays first dealer card only on screen
  function dispDealFP() {
    return new Promise(resolve => {
      dCards.forEach((card, index) => {
        setTimeout(() => {
          let $thisCard = document.createElement("span")
          if (index === 0) {
            $thisCard.textContent = ""
          } else {
            $thisCard.textContent = (card === 11) ? "A" : card;
            randomizeSuits($thisCard)
          }
          $dCards.append($thisCard)
          if (index === dCards.length - 1) {
            resolve()
          }
        }, 250 * index)
      })
    })
  }
  // Removes Start button and displays total
  $dTotal.textContent = "?"
  $pTotal.textContent = pTotal 
  
  // Check for Blackjack
  await dispDealFP()
  onFirstPair()
}

/** Hit Card on Hand */
$hit.addEventListener("click", () => {

  $double.style.display = "none"
  let newCard = Math.floor(Math.random()*10) + 2
  pCards.push(newCard)
  pTotal = sumOfCards(pCards)
  pTotal = checkBust(newCard, pTotal, pCards)

  // Displays added card on screen
  onPlayerHit()
  createCard($pCards, newCard)

  $pTotal.textContent = pTotal 
})

/** Stand Cards on Hand */
$stand.addEventListener("click",() => {
  onStand()
})

/** Double Cards on First Pair */
$double.addEventListener("click", () => {

  $double.style.display = "none"
  doesDouble = true
  totalbet *= 2
  chips -= totalbet/2
  $accBets.textContent = `$${totalbet}`
  let newDoubleCard = Math.floor(Math.random()*10) + 2
  pCards.push(newDoubleCard)
  pTotal = sumOfCards(pCards)
  pTotal = checkBust(newDoubleCard, pTotal, pCards)

  // Displays added card on screen
  createCard($pCards, newDoubleCard)
  onPlayerHit()
  $pTotal.textContent = pTotal
  onStand()
  
})

/** New Round */
$restart.addEventListener("click", () => {
  hasWon = false
  $bWrap.style.display = "flex"
  $restart.style.display = "none"
  $ret.textContent = `$0`
  $accBets.textContent = `$0`
  totalbet = 0
  doesDouble = false

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

  //Deletes card total on display
  $dTotal.textContent = ""
  $pTotal.textContent = ""
  $gMsg.textContent = ""
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
  } else if (tempbet > chips || tempbet > 1000) {
    $gMsg.textContent = `Exceeded.`
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
    
    startGame()
  }
})

$rBet.addEventListener("click", () => {
  totalbet = 0
  $confbet.style.display = "none"
  $rBet.style.display = "none"
  $accBets.textContent = `$0`
  $gMsg.textContent = ""
})

$rBank.addEventListener("click", () => {
  chips = 1000
  $accChips.textContent = `$${chips}`
  $bWrap.style.display = "flex"
  $rBank.style.display = "none"
  $gMsg.textContent = ""
  $accBets.textContent = `$0`
  totalbet = 0
  doesDouble = false

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

  //Deletes card total on display
  $dTotal.textContent = ""
  $pTotal.textContent = ""
  $gMsg.textContent = ""
})