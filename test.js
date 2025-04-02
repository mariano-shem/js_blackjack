let chips = 1000
totalbet = 0

const betBtn = document.querySelectorAll("button")

betBtn.forEach((bet) => {bet.addEventListener("click", function() {
  let mybet = Number(this.textContent)
  let tempbet = totalbet
  tempbet += mybet
  if (tempbet <= chips) {
    totalbet = tempbet
    console.log(`Your bet is now ${totalbet}.`)
  } else {
    console.log("You've exceeded your bet.")
  }
})})