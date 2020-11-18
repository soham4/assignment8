let drawCard1;
let drawCard2;
let cardImage1;
let cardImage2;
let score1=0;
let score2=0;
let value1;
let value2;
let suit1;
let suit2;
let remaining;
let state1=false;
let state2=false;
function preload(){
  bgImage=loadImage("pngegg.png");
  bgImage2=loadImage("green.jpg");
}
function setup() {
  createCanvas(640, 480);
  clicker1 = new Clickable();
  clicker1.text = "Draw a Card";
  clicker1.x = 270;
  clicker1.y = 140;
  clicker1.width = 100;
  clicker1.height = 50;
  clicker1.cornerRadius=40;
  clicker1.color= "#d40416";
  clicker1.textColor="#ffffff";
  clicker1.onPress = function(){
    getData();
    checkIfGreater();
}
}

function draw() {
  background(220);
  imageMode(CENTER);
  image(bgImage2, 320, 240, 640, 480);
  image(bgImage, 320, 240, 640, 480);
  if(remaining===0){
    drawGameOver();
  }
  if(remaining!=0 && state1===false && state2===false){
    drawMenu();
  }
  if(state1===true && state2===false)
    {
  clicker1.draw();
  textAlign(CENTER);
  //text("SCORE:" +score, 320, 50);
  text("YOUR SCORE:" +score1, 450, 50);
  text("COMPUTER'S SCORE:" +score2, 170, 50);
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
}
}
function getData() {
  console.log("FETCHING!");
  fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    drawCard1= data.cards[0].code;
    drawCard2= data.cards[1].code;
    value1=data.cards[0].value;
    value2=data.cards[1].value;
    suit1=data.cards[0].suit;
    suit2=data.cards[1].suit;
    remaining=data.remaining;
    console.log(remaining);
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

function checkIfGreater(){
  if(suit1===suit2){
    if((value1>=2 && value1<=10) && (value2>=2 && value2<=10)){
    if(value1>value2){
      score1+=1;
    }
    if(value2>value1){
      score2+=1;
    }
    }
    
    if((value1>=2 && value1<=10) && (value2==="KING" || value2==="QUEEN" || value2==="ACE" || value2==="JACK")){
      score2+=1;
    }
    if((value2>=2 && value2<=10) && (value1==="KING" || value1==="QUEEN" || value1==="ACE" || value1==="JACK")){
      score1+=1;
    }
    if(value1==="JACK" && (value2==="KING" || value2==="QUEEN" || value2==="ACE" )){
      score2+=1
    }
    if(value1==="QUEEN" && (value2==="KING" || value2==="ACE" )){
      score2+=1
    }
    if(value1==="KING" && value2==="ACE"){
      score2+=1
    }
    if(value2==="JACK" && (value1==="KING" || value1==="QUEEN" || value1==="ACE" )){
      score1+=1
    }
    if(value2==="QUEEN" && (value1==="KING" || value1==="ACE" )){
      score1+=1
    }
    if(value2==="KING" && value1==="ACE"){
      score1+=1
    }
  }
}

function drawMenu(){
  textAlign(CENTER);
  textSize(20);
  fill(255, 255, 255);
  text("Rules:", 320, 150);
  text("Keep drawing cards", 320, 200);
  text("When the suit is same,", 320, 250);
  text("the one with high value card gets a point", 320, 300);
  text("Press Enter to Begin", 320, 400);
}
function keyPressed(){
  if(keyCode===ENTER){
    state1=true;
    state2=false;
  }
}
function drawGameOver(){
  if(score1>score2){
    text("You Win!", 320, 200);
  }
  if(score2>score1){
    text("Computer Wins", 320, 200);
  }
  if(score1===score2){
    text("Game is a Draw!", 320, 200);
  }
  text("Press Enter to play again", 320, 400);
}