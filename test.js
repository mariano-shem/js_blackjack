// // let suits = [
// //   "assets/suits/club-suit.svg",
// //   "assets/suits/diamond-suit.svg",
// //   "assets/suits/heart-suit.svg",
// //   "assets/suits/spade-suit.svg",
// // ]

// // let thisSuit = Math.floor(Math.random() * suits.length)

// // console.log(suits[thisSuit])

// // myImg = document.createElement("img")
// // myImg.src = suits[thisSuit]
// // myImg.className = "suit"

// // console.log(myImg)

// // $pCards.append(myImg)

// // function createCard(allC, nC) {
// //   let $thisCard = document.createElement("span")
// //   $thisCard.textContent = (nC === 11) ? "A" : nC;
// //   allC.append($thisCard)
// // }

// let arr = [1, 2, 3, 4, 5]

// function wait() {
//   return new Promise(resolve => {
//       arr.forEach((val, index) => {
//     setTimeout(() => {
//       console.log(val)

//       if (index === arr.length - 1) {
//         resolve()
//       }
//     }, 500 * index)
//   })
//   })
// }

// async function test() {
//   console.log("this one first")
//   await wait()
//   console.log("finally")
// }

// test()


// // let arr = [1, 2, 3, 4, 5]

// // function wait(ms) {
// //   return new Promise(function(resolve) {
// //     setTimeout(function() {
// //       resolve()
// //     }, ms)
// //   })
// // }


// // async function test(arr) {
// //   for (let i = 0; i < arr.length; i++) {
// //     console.log(arr[i])
// //     await wait(500)
// //   }
// //   console.log("finally")
// // }

// // test(arr)