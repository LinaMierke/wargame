
let suits = ['♠', '♡', '♢', '♣'];
let cardFace = ["2","3","4","5","6","7","8", "9","10","J","K","Q","A",];
let cards = [];
let players = [[], []];
let firstRound = true;
let gameover = false;


function peleas() {
  if (firstRound) {
    firstRound = false;
    cardsConstruir();
    mesclar(cards);
    repartirCartas(cards);
  }
  attack();
}
function cardsConstruir() {
  cards = [];
  for (let s in suits) {
    let suitNew = suits[s][0].toUpperCase();
    for (let n in cardFace) {
      let card = {
        suit: suits[s],
        num: cardFace[n],
        cardValue: parseInt(n) + 2,
        icon: suitNew,
      };
      cards.push(card);
    }
  }
  console.log("Begin Game");
  console.log(cards);
}
function repartirCartas(array) {
  for (let i = 0; i < array.length; i++) {
    let m = i % 2;
    players[m].push(array[i]);
  }
}
function mesclar(array) {
  for (let b = array.length - 1; b > 0; b--) {
    let a = Math.floor(Math.random() * (b + 1));
    let temp = array[b];
    array[b] = array[a];
    array[a] = temp;
  }
  console.log("Shuffle Deck");
  return array;
}
function battlemode(todas) {
  let carta, cartaUno;
  let cartaArriba, otraCarta;
  for (let i = 0; i < 4; i++) {
    carta = players[0].shift();
    if (i == 0) {
      cartaArriba = carta;
    }
    todas = todas.concat(carta);
  }
  for (let i = 0; i < 4; i++) {
    cartaUno = players[1].shift();
    if (i == 0) {
      otraCarta = cartaUno;
    }
    todas = todas.concat(cartaUno);
  }
  if (cartaArriba == undefined || otraCarta == undefined) {
    gameover();
  } else {
    winner(cartaArriba, otraCarta, todas);
  }
}
function gameOver() {
  if (players[0].length == 0) {
    console.log("You lose Player 1, Game Over");
  } else if (players[1].length == 0) {
    console.log("You lose Player 2, Game Over");
  } else {
    console.log("Continue Battle");
    peleas();
  }
}
function attack() {
  let cartaUno = players[0].shift();
  let carta2 = players[1].shift();
  let todas = [cartaUno, carta2];
  //check for winners
  winner(cartaUno, carta2, todas);
  console.log(players[0].length);
  console.log(players[1].length);
  gameOver();
}
function winner(cartaUno, carta2, todas) {
  console.log(cartaUno, carta2);
  if (cartaUno.cardValue > carta2.cardValue) {
    console.log("hand 1 wins");
    players[0] = players[0].concat(todas);
  } else if (cartaUno.cardValue < carta2.cardValue) {
    console.log("hand 2 wins");
    players[1] = players[1].concat(todas);
  } else {
    battlemode(todas);
    console.log("Battle Mode");
  }
  console.log(players);
}

console.log(peleas())