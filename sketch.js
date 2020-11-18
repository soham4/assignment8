let drawCard1;
let drawCard2;
let cardImage1;
let cardImage2;
let score=0;
let value;
function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(220);
  textAlign(CENTER);
  text("SCORE:", score, 450, 50);
  textSize(30);
  text("Card Game",320, 100);
  textSize(20);
  text("Your Card", 450, 200);
   text("Computer's Card", 170, 200);
  imageMode(CENTER);
  if(cardImage1){
    image(cardImage1, 450, 300, 124, 176);
  }
  if(cardImage2){
    image(cardImage2, 170, 300, 124, 176);
  }

  //print("score", score);
  //print("value", value);
}
function getData() {
  console.log("FETCHING!");
  
  fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    drawCard1= data.cards[0].code;
    drawCard2= data.cards[1].code;
    return loadCardImage(data);
  });
}

function loadCardImage (data) {
  loadImage(data.cards[0].image, img => {
    cardImage1 = img;
  });
  loadImage(data.cards[1].image, img => {
    cardImage2 = img;
  });
}

function mousePressed() {
  getData();
   if(drawCard2>drawCard1){
    score+=1;
  }
}