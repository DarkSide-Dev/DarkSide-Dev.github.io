let snake = [];
let direction = 8;
let id;
let timer;
let cont = 0;
let fruitCounter = 0;
let timeRunner;
let timeCounter = 0;
let food = 0;

let image;

if(document.body.clientWidth < 426){
  image = `curva-v-p`;
}
else{
  image = `curva-v`;
}
 
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

function remove(index){
  
  if(document.getElementById(`campo${index}`).classList.contains("center")){
    document.getElementById(`campo${index}`).classList.remove("center");
  }

  if(document.getElementById(`campo${index}`).classList.contains("left")){
    document.getElementById(`campo${index}`).classList.remove("left");
  }

  if(document.getElementById(`campo${index}`).classList.contains("bottom")){
    document.getElementById(`campo${index}`).classList.remove("bottom");
  }

  if(document.getElementById(`campo${index}`).classList.contains("top")){
    document.getElementById(`campo${index}`).classList.remove("top");
  }

  if(document.getElementById(`campo${index}`).classList.contains("right")){
    document.getElementById(`campo${index}`).classList.remove("right");
  }

}

function start(){

  if(!snake[0]){

    document.getElementById("controls").style.display = "none";

    window.scrollTo(0,document.body.scrollHeight);

    document.getElementById(`campo0`).classList.add("head-snake");
    document.getElementById(`campo0`).classList.add("center");
    document.getElementById(`campo0`).innerHTML = `<img src="./assets/img/head.png">`;
    document.getElementById(`campo0`).setAttribute("go", 8);
    document.getElementById(`campo0`).setAttribute("from", 1);
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

function findFood(){

  if(document.getElementById(`campo${snake[0]+direction}`).innerHTML == `<img src="./assets/img/fruta1.png" alt="Fruta">` || document.getElementById(`campo${snake[0]+direction}`).innerHTML == `<img src="./assets/img/fruta2.png" alt="Fruta">` || document.getElementById(`campo${snake[0]+direction}`).innerHTML == `<img src="./assets/img/fruta3.png" alt="Fruta">` || document.getElementById(`campo${snake[0]+direction}`).innerHTML == `<img src="./assets/img/fruta4.png" alt="Fruta">`){

    return true;
    
  }
  else{
    return false;
  }

}

function verifyFood(){

  let contain = 0;

  for(let i = 0; i < 80; i++){

    if(document.getElementById(`campo${i}`).innerHTML == `<img src="./assets/img/fruta1.png" alt="Fruta">` || document.getElementById(`campo${i}`).innerHTML == `<img src="./assets/img/fruta2.png" alt="Fruta">` || document.getElementById(`campo${i}`).innerHTML == `<img src="./assets/img/fruta3.png" alt="Fruta">` || document.getElementById(`campo${i}`).innerHTML == `<img src="./assets/img/fruta4.png" alt="Fruta">`){

      contain++;
      
    }

  }

  if(contain == 0){
    generateFood();
  }

}

let x = 0;

function move(){

  verifyFood();

  document.querySelector("body").style = "overflow-y: hidden;";

  try{
    for(let i = 0; i < snake.length; i++){
    
      if(i == 0){

        let checker1;
        let checker2;

        if(findFood()){          
  
          generateFood();
          
          fruitCounter++;
  
          document.getElementById("fruit-score").innerHTML = `<img draggable="false" src="./assets/img/fruta.png" alt="Fruta"> ${fruitCounter}`;
  
          if(snake.length == 1){

            snake.push(snake[snake.length-1]-direction);
            console.log(snake);
            document.getElementById(`campo${snake[snake.length-1]}`).classList.add("body-snake");

          }
          else{

            let dir = +(document.getElementById(`campo${snake[snake.length-1]}`).getAttribute("from"));
            snake.push(dir);
            console.log(snake);
            document.getElementById(`campo${snake[snake.length-1]}`).classList.add("body-snake");

          }
  
        }

        document.getElementById(`campo${snake[i]}`).innerHTML = "";
  
        document.getElementById(`campo${snake[i]}`).classList.remove("head-snake");
        document.getElementById(`campo${snake[i]}`).setAttribute("go", snake[i]+direction);
        
        if(x == 0){
          document.getElementById(`campo0`).removeAttribute("go");
          document.getElementById(`campo0`).removeAttribute("from");
          remove(0);
          x++;
        }

        if(snake[i+1]){
          document.getElementById(`campo${snake[i+1]}`).setAttribute("go", snake[i]);
        }

        remove(snake[0]+direction);

        document.getElementById(`campo${snake[i]+direction}`).classList.add("head-snake");
        
        switch(direction){

          case -8:
            document.getElementById(`campo${snake[i]+direction}`).innerHTML = `<img src="./assets/img/head.png" style="transform: rotate(180deg);">`;
            document.getElementById(`campo${snake[i]+direction}`).classList.add("center");
          break;

          case -1:
            document.getElementById(`campo${snake[i]+direction}`).innerHTML = `<img src="./assets/img/head.png" style="transform: rotate(90deg);">`;
            document.getElementById(`campo${snake[i]+direction}`).classList.add("right");
          break;

          case 1:
            document.getElementById(`campo${snake[i]+direction}`).innerHTML = `<img src="./assets/img/head.png" style="transform: rotate(270deg);">`;
            document.getElementById(`campo${snake[i]+direction}`).classList.add("left");
          break;

          case 8:
            document.getElementById(`campo${snake[i]+direction}`).classList.add("center");
            document.getElementById(`campo${snake[i]+direction}`).innerHTML = `<img src="./assets/img/head.png")">`;
          break;

        }
  
        checker1 = snake[i];
        snake[i] = snake[i]+direction;
        document.getElementById(`campo${snake[i]}`).setAttribute("from", snake[i]-direction);
        checker2 = snake[i];

        if(document.getElementById(`campo${checker1}`).classList.contains("wall1") && document.getElementById(`campo${checker2}`).classList.contains("wall8")){
          
          losing();

        }

        if(document.getElementById(`campo${checker1}`).classList.contains("wall8") && document.getElementById(`campo${checker2}`).classList.contains("wall1")){
          
          losing();

        }        
  
        if(document.getElementById(`campo${snake[0]}`).classList.contains("head-snake") && document.getElementById(`campo${snake[0]}`).classList.contains("body-snake") && snake.length > 2){
          
          losing();
  
        }
  
      }
      else if(i == snake.length-1){

        let dir;
                
        remove(snake[i]);
        document.getElementById(`campo${snake[i]}`).classList.remove("body-snake");
        document.getElementById(`campo${snake[i]}`).innerHTML = "";

        snake[i] = +(document.getElementById(`campo${snake[i]}`).getAttribute("go"));

        remove(snake[i]);

        dir = snake[i-1] - snake[i];

        document.getElementById(`campo${snake[i]}`).classList.add("body-snake");        
        
        switch(dir){

          case -8:
            document.getElementById(`campo${snake[i]}`).innerHTML = `<img src="./assets/img/tail.png">`;
            document.getElementById(`campo${snake[i]}`).classList.add("center");
          break;

          case -1:
            document.getElementById(`campo${snake[i]}`).innerHTML = `<img src="./assets/img/tail.png" style="transform: rotate(270deg)">`;
            document.getElementById(`campo${snake[i]}`).classList.add("left");
          break;

          case 1:
            document.getElementById(`campo${snake[i]}`).innerHTML = `<img src="./assets/img/tail.png" style="transform: rotate(90deg)">`;
            document.getElementById(`campo${snake[i]}`).classList.add("right");
          break;

          case 8:
            document.getElementById(`campo${snake[i]}`).innerHTML = `<img src="./assets/img/tail.png" style="transform: rotate(180deg)">`;
            document.getElementById(`campo${snake[i]}`).classList.add("center");
          break;

        }
  
      }
      else{
  
        let dir1;
        let dir2;

        dir1 = snake[i] - snake[i-1];        

        dir2 = +(document.getElementById(`campo${snake[i]}`).getAttribute("go")) - snake[i];

        snake[i] = +(document.getElementById(`campo${snake[i]}`).getAttribute("go"));

        remove(snake[i]);
        document.getElementById(`campo${snake[i]}`).classList.add("body-snake");

        if(2 == Math.abs(dir1) && 1 == Math.abs(dir2)){

          document.getElementById(`campo${snake[i]}`).innerHTML = `<img src="./assets/img/body.png" style="transform: rotate(90deg)"><img src="./assets/img/body.png" style="transform: rotate(90deg)"><img src="./assets/img/body.png" style="transform: rotate(90deg)">`;

          document.getElementById(`campo${snake[i]}`).classList.add("center");
          
        }
        else if((9 == dir1 && -1 == dir2) || (-9 == dir1 && 8 == dir2)){

          document.getElementById(`campo${snake[i]}`).innerHTML = `<img src="./assets/img/${image}.png" style="transform: scale(-1, 1)">`;

          document.getElementById(`campo${snake[i]}`).classList.add("top");
          document.getElementById(`campo${snake[i]}`).classList.add("right");

        }
        else if((-9 == dir1 && 1 == dir2) || (9 == dir1 && -8 == dir2)){
          
          document.getElementById(`campo${snake[i]}`).innerHTML = `<img src="./assets/img/${image}.png" style="transform: scaleY(-1)">`;

          document.getElementById(`campo${snake[i]}`).classList.add("left");
          document.getElementById(`campo${snake[i]}`).classList.add("bottom");

        }
        else if(16 == Math.abs(dir1) && 8 == Math.abs(dir2)){

          document.getElementById(`campo${snake[i]}`).innerHTML = `<img src="./assets/img/body.png">`;
          document.getElementById(`campo${snake[i]}`).classList.add("center");

        }
        else if((-7 == dir1 && 8 == dir2) || (7 == dir1 && 1 == dir2)){

          document.getElementById(`campo${snake[i]}`).innerHTML = `<img src="./assets/img/${image}.png" style="transform: scaleY(1)">`;
          document.getElementById(`campo${snake[i]}`).classList.add("top");
          document.getElementById(`campo${snake[i]}`).classList.add("left");

        }
        else if((7 == dir1 && -8 == dir2) || (-7 == dir1 && -1 == dir2)){

          document.getElementById(`campo${snake[i]}`).innerHTML = `<img src="./assets/img/${image}.png" style="transform: scale(-1, -1)">`;
          document.getElementById(`campo${snake[i]}`).classList.add("bottom");
          document.getElementById(`campo${snake[i]}`).classList.add("right");

        }
        else{
          console.log("Estranho");
        }
  
      }
  
    }

  } catch(Error){
    
    losing();
    console.log(Error);

  }

}

function losing(){  

  document.querySelector("body").style = "";

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