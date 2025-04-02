function onFirstPair() {
  if (dealer === 21 && player === 21) {
    isDraw = false
  } else if (dealer === 21) {
    isAlive = false
  } else if (player === 21) {
    hasBlackjack = true
    showDealer()
  } else {
    isDraw = false
    isAlive = true
    hasBlackjack = false
  }
}

function onFirstPair() {
  if (dealer !== 21 && player !== 21) {
    isDraw = false
    isAlive = true
    hasBlackjack = false
  } else {
    if (dealer === 21 && player === 21) {
      isDraw = false
    } else if (dealer === 21) {
      isAlive = false
    } else if (player === 21) {
      hasBlackjack = true
    }
    showDealer()
  } 

}






function onHit() {
  if (player === 21) {
    dealerHit() 
  } else if (player > 21) {
    isAlive = false
  } else {
    isDraw = false
    isAlive = true
    hasBlackjack = false
  }
}


function onAdd() {
  
  function dealerHit() {
    if (dealer === 21 && player === 21) {
      isDraw = true
    } else if (dealer === 21) {
      isAlive = false
    } else if (dealer > 21) {
      hasWon = true
    } else if (dealer < 21) {
      if (dealer > player) {
        isAlive = false
      } else if (dealer < player) {
        hasWon = true
      } else {
        isDraw = true
      }
    }
  }

}