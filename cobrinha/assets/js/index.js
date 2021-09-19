let snake = [];
let direction = 8;
let id;
let timer;
let cont = 0;
let fruitCounter = 0;
let timeRunner;
let timeCounter = 0;
 
var initialX = null;
var initialY = null;
 
function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
  e.preventDefault();
};
 
function moveTouch(e) {

  if (initialX === null) {
    return;
  }
 
  if (initialY === null) {
    return;
  }
 
  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;
 
  var diffX = initialX - currentX;
  var diffY = initialY - currentY;
 
  if (Math.abs(diffX) > Math.abs(diffY)) {
    
    if (diffX > 0) {
      
      console.log("Esquerda");
      if(direction != 1){
        direction = -1;
      }

    } else {
      
      console.log("Direita");
      if(direction != -1){
        direction = 1;
      }

    }

  }
  else {
    
    if (diffY > 0) {
      
      console.log("Cima");
      if(direction != 8){
        direction = -8;
      }

    } else {
      
      console.log("Baixo");
      if(direction != -8){
        direction = 8;
      }

    }  

  }
 
  initialX = null;
  initialY = null;
   
  e.preventDefault();

};

function getDirection(e){

  switch(e.key.toLowerCase()){

    case 'arrowup':
      
      if(direction != 8){

        direction = -8;
        
      }

    break

    case 'arrowleft':

      if(direction != 1){

        direction = -1;

      }

    break

    case 'arrowdown':
      
      if(direction != -8){

        direction = 8;
        
      }

    break

    case 'arrowright':
      
      if(direction != -1){

        direction = 1;
        
      }

    break

    default:
    break

  }

}

function preencher(){

  document.getElementById("tabuleiro").innerHTML = "";

  for(let i = 0; i < 12; i++) {

    if(i == 1){
      id = 0;
    }
  
    for(let j = 0; j < 10; j++){
  
      if(i == 0 || j == 9){
        
        document.getElementById("tabuleiro").innerHTML += `<div class="block size-desktop border"></div>`;

      }
      else if(j == 0 || i == 11){

        document.getElementById("tabuleiro").innerHTML += `<div class="block size-desktop border"></div>`;

      }
      else if(i%2 == 0 && j != 0){

        if(j%2 == 0){          

          if(j == 1 || j == 8){

            document.getElementById("tabuleiro").innerHTML += `<div id="campo${id}" class="block size-desktop dark wall${j}"></div>`;
            id++;

          }
          else{

            document.getElementById("tabuleiro").innerHTML += `<div id="campo${id}" class="block size-desktop dark"></div>`;
            id++;

          }

        }
        else{

          if(j == 1 || j == 8){

            document.getElementById("tabuleiro").innerHTML += `<div id="campo${id}" class="block size-desktop light wall${j}"></div>`;
            id++;

          }
          else{

            document.getElementById("tabuleiro").innerHTML += `<div id="campo${id}" class="block size-desktop light"></div>`;
            id++;

          }

        }
      }
      else if(i%2 != 0 && j != 0){

        if(j%2 == 0){

          if(j == 1 || j == 8){

            document.getElementById("tabuleiro").innerHTML += `<div id="campo${id}" class="block size-desktop light wall${j}"></div>`;
            id++;

          }
          else{

            document.getElementById("tabuleiro").innerHTML += `<div id="campo${id}" class="block size-desktop light"></div>`;
            id++;

          }

        }
        else{

          if(j == 1 || j == 8){
            document.getElementById("tabuleiro").innerHTML += `<div id="campo${id}" class="block size-desktop dark wall${j}"></div>`;
            id++;
          }
          else{
            document.getElementById("tabuleiro").innerHTML += `<div id="campo${id}" class="block size-desktop dark"></div>`;
            id++;
          }

        }
      }
  
    }
  
  }  

}

function generateFood(){

  let index = Math.floor((Math.random() * 80));
  let fruit = Math.floor((Math.random() * 4))+1;
  
  if(document.getElementById(`campo${index}`).classList.contains("head-snake") || document.getElementById(`campo${index}`).classList.contains("body-snake")){
    generateFood();
  }
  else{
    document.getElementById(`campo${index}`).innerHTML = `<img src="./assets/img/fruta${fruit}.png" alt="Fruta">`;
  }

}

function start(){

  if(!snake[0]){

    document.getElementById("controls").style.display = "none";

    window.scrollTo(0,document.body.scrollHeight);

    document.getElementById(`campo0`).classList.add("head-snake");
    snake.push(0);
    timer = setInterval(move, 200);
    timeCounter = 0;

    document.getElementById("tabuleiro").addEventListener("touchstart", startTouch, false);
    document.getElementById("tabuleiro").addEventListener("touchmove", moveTouch, false);

    document.getElementById("body").addEventListener("keydown", getDirection, false);

    generateFood();

    timeRunner = setInterval(() => {
      
      timeCounter++;
      document.getElementById("time-score").innerHTML = `<img draggable="false" src="./assets/img/clock.png" alt="Tempo"> ${timeCounter}`;

    }, 1000);    

  }
  if(!document.getElementById("modal").classList.contains("hidden")){
    
    losing();
    start();

  }

}

function move(){

  try{
    for(let i = snake.length-1; i >= 0; i--){
    
      if(i == 0){

        let checker1;
        let checker2;
  
        document.getElementById(`campo${snake[0]}`).classList.remove("head-snake");
        document.getElementById(`campo${snake[0]+direction}`).classList.add("head-snake");
  
        checker1 = snake[0];
        snake[0] = snake[0]+direction;
        checker2 = snake[0];

        if(document.getElementById(`campo${checker1}`).classList.contains("wall1") && document.getElementById(`campo${checker2}`).classList.contains("wall8")){
          
          losing();

        }

        if(document.getElementById(`campo${checker1}`).classList.contains("wall8") && document.getElementById(`campo${checker2}`).classList.contains("wall1")){
          
          losing();

        }
  
        if(document.getElementById(`campo${snake[0]}`).innerHTML != ""){
  
          document.getElementById(`campo${snake[0]}`).innerHTML = "";
          generateFood();
          
          fruitCounter++;
  
          document.getElementById("fruit-score").innerHTML = `<img draggable="false" src="./assets/img/fruta.png" alt="Fruta"> ${fruitCounter}`;
  
          snake.push(snake[snake.length-1]);
          document.getElementById(`campo${snake[snake.length-1]}`).classList.add("body-snake");
  
        }
  
        if(document.getElementById(`campo${snake[0]}`).classList.contains("head-snake") && document.getElementById(`campo${snake[0]}`).classList.contains("body-snake") && snake.length > 2){
          
          losing();
  
        }
  
      }
      else if(i == snake.length-1){
  
        document.getElementById(`campo${snake[i]}`).classList.remove("body-snake");      
        snake[i] = snake[i-1];
        document.getElementById(`campo${snake[i]}`).classList.add("body-snake");
  
      }
      else{
  
        snake[i] = snake[i-1];
        document.getElementById(`campo${snake[i]}`).classList.add("body-snake");
  
      }
  
    }

  } catch(Error){
    
    losing();

  }

}

function losing(){  

  if(document.getElementById("modal").classList.contains("hidden")){
    
    clearInterval(timer);
    clearInterval(timeRunner);
    timer = null;
    timeRunner = null;

    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modal").classList.add("show");
    document.getElementById("tabuleiro").removeEventListener("touchstart", moveTouch, false);
    document.getElementById("tabuleiro").removeEventListener("touchmove", moveTouch, false);

  }
  else{

    document.getElementById("modal").classList.add("hidden");
    document.getElementById("modal").classList.remove("show");
    direction = 8;
    snake = [];
    preencher();

    window.scrollTo(0,0);
  
    fruitCounter = 0;
    document.getElementById("fruit-score").innerHTML = `<img draggable="false" src="./assets/img/fruta.png" alt="Fruta"> ${fruitCounter}`;

  }

}

preencher();