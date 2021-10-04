let quant_tabuleiro = 100;
let quant_Bombas = 20;
let seconds = 0;
let timer;

let flags = 0;

let tabuleiro = [];
let tabuleiroShow = [];

function definirBombas(){

    let bombas = 0;

    tabuleiro = [];

    tabuleiroShow = [];

    document.getElementById("bombs-number").innerHTML = quant_Bombas;

    seconds = 0;

    let i = 0

    while(bombas != quant_Bombas){

        for(i = 0; i < quant_tabuleiro; i++){

            if(tabuleiro.length == 100){

                if(Math.floor((Math.random() * 100) + 1) % 2 == 0 && tabuleiro[i] != 0){
                    tabuleiro[i] = 0;
                    bombas++;
                }

            }
            else{

                if(quant_Bombas == 99){
                    
                    if(Math.floor((Math.random() * 100) + 1) % 7 == 0){
                        tabuleiro.push(0);
                        bombas++;
                    }
                    else{
                        tabuleiro.push(1);
                    }                    
                }
                else if(Math.floor((Math.random() * 100) + 1) % 3 == 0){
                    tabuleiro.push(0);
                    bombas++;
                }
                else{
                    tabuleiro.push(1);
                }

            }

            tabuleiroShow.push(0);
    
        }

        if(bombas > quant_Bombas){
            bombas = 0;
            tabuleiro = [];
        }

    }

}

function preencherContainer(){
    
    let container = document.getElementById("container");

    container.innerHTML = "";

    for(let i = 0; i < quant_tabuleiro; i++){

        container.innerHTML += `<div id="bomb${i}" ondblclick="flag(${i}); return false;" oncontextmenu="flag(${i}); return false;" onclick="verificar(${i})" class="block">.</div>`;

    }

}

function iniciar(){

    definirBombas();

    preencherContainer();

    clearInterval(timer);

    document.getElementById("time-numbers").innerHTML = seconds;
    document.getElementById("bombs-number").innerHTML = quant_Bombas;

}

iniciar();

function flag(index){

    if(tabuleiroShow[index] == 0 && flags != quant_Bombas){

        document.getElementById(`bomb${index}`).innerHTML = `<img src="./assets/img/flag.png" draggable="false" alt="Flag">`;
        tabuleiroShow[index] = 2;
        flags++;
        let audio = document.getElementById("put-flag");
        audio.play();

    }
    else if(tabuleiroShow[index] == 2){

        document.getElementById(`bomb${index}`).innerHTML = `.`;
        tabuleiroShow[index] = 0;
        flags--;
        let audio = document.getElementById("put-flag");
        audio.play();

    }
    else if(document.getElementById(`bomb${index}`).innerHTML != `&nbsp;`){
        
    }
    else{
        document.getElementById(`bomb${index}`).innerHTML = `&nbsp`;
    }

    document.getElementById("bombs-number").innerHTML = quant_Bombas-flags;

}

function countFlags(){

    let x = quant_tabuleiro;

    for(let i = 0; i < quant_tabuleiro; i++){

        if(tabuleiroShow[i] != 2){
            x--;
        }

    }

    flags = x;
    
    document.getElementById("bombs-number").innerHTML = quant_Bombas-flags;

}

function verificar(index){

    if(tabuleiroShow[index] == 0){

        if(tabuleiro[index] == 1){

            let audio = document.getElementById("put-bomb");
            audio.play();
         
            tabuleiroShow[index] = 1;
            if(seconds == 0){

                seconds++;

                timer = setInterval(() => {
                    
                    seconds++;
                    document.getElementById("time-numbers").innerHTML = seconds;
    
                }, 1000);
    
            }

            document.getElementById(`bomb${index}`).innerHTML = `&nbsp;`;

            expandir();

        }
        else if(tabuleiroShow[index] == 3){            

        }
        else{

            bombAnimation(index);

            tabuleiroShow = [];
            tabuleiro = [];

            setTimeout(() => {
                let audio = document.getElementById("lose-music");
                audio.play();
                lose();
            }, 2000);
        }

        countFlags();

    }

}

function bombAnimation(index){

    document.getElementById(`bomb${index}`).innerHTML = `<img src="./assets/img/bomb.gif" alt="Bomba">`;

}

function lose(){

    if(document.getElementById("lose").classList.contains("hide")){
        document.getElementById("lose").classList.remove("hide");
        document.getElementById("lose").classList.add("show");
    }
    else{
        document.getElementById("lose").classList.remove("show");
        document.getElementById("lose").classList.add("hide");
    }

    tabuleiro = [];
    tabuleiroShow = [];

    clearInterval(timer);
    timer = null;

}

function win(){

    if(document.getElementById("win").classList.contains("hide")){
        document.getElementById("win").classList.remove("hide");
        document.getElementById("win").classList.add("show");
    }
    else{
        document.getElementById("win").classList.remove("show");
        document.getElementById("win").classList.add("hide");
    }

    tabuleiro = [];
    tabuleiroShow = [];

    clearInterval(timer);
    timer = 0;

}

function expandir(){

    let counter = 0;

    for(let i = 0; i < 10; i++){

        counter = 0;

        for(let index = 0; index < quant_tabuleiro; index++){

            if(tabuleiroShow[index] == 1){

                counter++;

                if(index == 0){

                    let bombas = 0;

                    if(!tabuleiro[index+1]){
                        bombas++;
                    }

                    if(!tabuleiro[index+10]){
                        bombas++;
                    }

                    if(!tabuleiro[index+11]){
                        bombas++;
                    }

                    if(bombas > 0){
                                                
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";

                        switch(bombas){

                            case 1:
                                document.getElementById(`bomb${index}`).style.color = "#101585";
                            break;

                            case 2:
                                document.getElementById(`bomb${index}`).style.color = "#398a3f";
                            break;

                            case 3:
                                document.getElementById(`bomb${index}`).style.color = "#941a17";
                            break;

                            default:
                            break;

                        }

                        document.getElementById(`bomb${index}`).innerHTML = bombas;

                    }
                    else{

                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+1}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+10}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index+11}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index}`).innerHTML = "&nbsp;";

                        tabuleiroShow[index+1] = 1;
    
                        tabuleiroShow[index+10] = 1;
    
                        tabuleiroShow[index+11] = 1;

                    }

                }
                else if(index == 9){

                    let bombas = 0;

                    if(!tabuleiro[index-1]){
                        bombas++;
                    }

                    if(!tabuleiro[index+9]){
                        bombas++;
                    }

                    if(!tabuleiro[index+10]){
                        bombas++;
                    }

                    if(bombas > 0){
                                                
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";

                        switch(bombas){

                            case 1:
                                document.getElementById(`bomb${index}`).style.color = "#101585";
                            break;

                            case 2:
                                document.getElementById(`bomb${index}`).style.color = "#398a3f";
                            break;

                            case 3:
                                document.getElementById(`bomb${index}`).style.color = "#941a17";
                            break;

                            default:
                            break;

                        }

                        document.getElementById(`bomb${index}`).innerHTML = bombas;

                    }
                    else{

                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-1}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+9}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index+10}`).style.backgroundColor = "#9e9e9e";  

                        tabuleiroShow[index-1] = 1;
    
                        tabuleiroShow[index+9] = 1;
    
                        tabuleiroShow[index+10] = 1;

                    }

                }
                else if(index == 90){

                    let bombas = 0;

                    if(!tabuleiro[index+1]){
                        bombas++;
                    }

                    if(!tabuleiro[index-10]){
                        bombas++;
                    }

                    if(!tabuleiro[index-9]){
                        bombas++;
                    }

                    if(bombas){
                        
                        document.getElementById(`bomb${index}`).innerHTML = bombas;
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";   

                        switch(bombas){

                            case 1:
                                document.getElementById(`bomb${index}`).style.color = "#101585";
                            break;

                            case 2:
                                document.getElementById(`bomb${index}`).style.color = "#398a3f";
                            break;

                            case 3:
                                document.getElementById(`bomb${index}`).style.color = "#941a17";
                            break;

                            default:
                            break;

                        }

                    }
                    else{

                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+1}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-9}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index-10}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index}`).innerHTML = "&nbsp;";

                        tabuleiroShow[index+1] = 1;
    
                        tabuleiroShow[index-10] = 1;
    
                        tabuleiroShow[index-9] = 1;

                    }

                }
                else if(index == 99){

                    let bombas = 0;

                    if(!tabuleiro[index-1]){
                        bombas++;
                    }

                    if(!tabuleiro[index-10]){
                        bombas++;
                    }

                    if(!tabuleiro[index-11]){
                        bombas++;
                    }

                    if(bombas){
                        
                        document.getElementById(`bomb${index}`).innerHTML = bombas;
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";   

                        switch(bombas){

                            case 1:
                                document.getElementById(`bomb${index}`).style.color = "#101585";
                            break;

                            case 2:
                                document.getElementById(`bomb${index}`).style.color = "#398a3f";
                            break;

                            case 3:
                                document.getElementById(`bomb${index}`).style.color = "#941a17";
                            break;

                            default:
                            break;

                        }

                    }
                    else{

                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-1}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-10}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index-11}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index}`).innerHTML = "&nbsp;";

                        tabuleiroShow[index-1] = 1;
    
                        tabuleiroShow[index-10] = 1;
    
                        tabuleiroShow[index-11] = 1;

                    }

                }
                else if(index == 10 || index == 20 || index == 30 || index == 40 || index == 50 || index == 60 || index == 70 || index == 80){

                    let bombas = 0;

                    if(!tabuleiro[index-10]){
                        bombas++;
                    }

                    if(!tabuleiro[index-9]){
                        bombas++;
                    }
                    
                    if(!tabuleiro[index+1]){
                        bombas++;
                    }

                    if(!tabuleiro[index+10]){
                        bombas++;
                    }

                    if(!tabuleiro[index+11]){
                        bombas++;
                    }

                    if(bombas){                        
                        
                        switch(bombas){

                            case 1:
                                document.getElementById(`bomb${index}`).style.color = "#101585";
                            break;

                            case 2:
                                document.getElementById(`bomb${index}`).style.color = "#398a3f";
                            break;

                            case 3:
                                document.getElementById(`bomb${index}`).style.color = "#941a17";
                            break;

                            case 4:
                                document.getElementById(`bomb${index}`).style.color = "#1e1957";
                            break;

                            case 5:
                                document.getElementById(`bomb${index}`).style.color = "#560503";
                            break;

                            default:
                            break;

                        }

                        document.getElementById(`bomb${index}`).innerHTML = bombas;
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  

                    }
                    else{      

                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+1}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+11}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-10}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-9}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+10}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index}`).innerHTML = "&nbsp;";  

                        tabuleiroShow[index+1] = 1;
    
                        tabuleiroShow[index+10] = 1;
    
                        tabuleiroShow[index+11] = 1;

                        tabuleiroShow[index-10] = 1;

                        tabuleiroShow[index-9] = 1;

                    }

                }
                else if(index == 19 || index == 29 || index == 39 || index == 49 || index == 59 || index == 69 || index == 79 || index == 89){

                    let bombas = 0;

                    if(!tabuleiro[index-10]){
                        bombas++;
                    }

                    if(!tabuleiro[index-11]){
                        bombas++;
                    }
                    
                    if(!tabuleiro[index-1]){
                        bombas++;
                    }

                    if(!tabuleiro[index+9]){
                        bombas++;
                    }

                    if(!tabuleiro[index+10]){
                        bombas++;
                    }

                    if(bombas){                        
                        
                        switch(bombas){

                            case 1:
                                document.getElementById(`bomb${index}`).style.color = "#101585";
                            break;

                            case 2:
                                document.getElementById(`bomb${index}`).style.color = "#398a3f";
                            break;

                            case 3:
                                document.getElementById(`bomb${index}`).style.color = "#941a17";
                            break;

                            case 4:
                                document.getElementById(`bomb${index}`).style.color = "#1e1957";
                            break;

                            case 5:
                                document.getElementById(`bomb${index}`).style.color = "#560503";
                            break;

                            default:
                            break;

                        }

                        document.getElementById(`bomb${index}`).innerHTML = bombas;
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  

                    }
                    else{
                        
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  

                        document.getElementById(`bomb${index-1}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+9}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+10}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-10}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-11}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index}`).innerHTML = "&nbsp;";

                        tabuleiroShow[index-1] = 1;
    
                        tabuleiroShow[index+10] = 1;
    
                        tabuleiroShow[index-11] = 1;

                        tabuleiroShow[index-10] = 1;

                        tabuleiroShow[index+9] = 1;

                    }

                }
                else if(index >= 1 && index < 9){

                    let bombas = 0;

                    if(!tabuleiro[index-1]){
                        bombas++;
                    }

                    if(!tabuleiro[index+9]){
                        bombas++;
                    }
                    
                    if(!tabuleiro[index+10]){
                        bombas++;
                    }

                    if(!tabuleiro[index+11]){
                        bombas++;
                    }

                    if(!tabuleiro[index+1]){
                        bombas++;
                    }

                    if(bombas){                        
                        
                        switch(bombas){

                            case 1:
                                document.getElementById(`bomb${index}`).style.color = "#101585";
                            break;

                            case 2:
                                document.getElementById(`bomb${index}`).style.color = "#398a3f";
                            break;

                            case 3:
                                document.getElementById(`bomb${index}`).style.color = "#941a17";
                            break;

                            case 4:
                                document.getElementById(`bomb${index}`).style.color = "#1e1957";
                            break;

                            case 5:
                                document.getElementById(`bomb${index}`).style.color = "#560503";
                            break;

                            default:
                            break;

                        }

                        document.getElementById(`bomb${index}`).innerHTML = bombas;
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  

                    }
                    else{

                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+1}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+11}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+10}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+9}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-1}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index}`).innerHTML = "&nbsp;";

                        tabuleiroShow[index+1] = 1;
    
                        tabuleiroShow[index+10] = 1;
    
                        tabuleiroShow[index+11] = 1;

                        tabuleiroShow[index-1] = 1;

                        tabuleiroShow[index+9] = 1;

                    }

                }
                else if(index >= 91 && index < 99){

                    let bombas = 0;

                    if(!tabuleiro[index-1]){
                        bombas++;
                    }

                    if(!tabuleiro[index-11]){
                        bombas++;
                    }
                    
                    if(!tabuleiro[index-10]){
                        bombas++;
                    }

                    if(!tabuleiro[index-9]){
                        bombas++;
                    }

                    if(!tabuleiro[index+1]){
                        bombas++;
                    }

                    if(bombas){                        
                        
                        switch(bombas){

                            case 1:
                                document.getElementById(`bomb${index}`).style.color = "#101585";
                            break;

                            case 2:
                                document.getElementById(`bomb${index}`).style.color = "#398a3f";
                            break;

                            case 3:
                                document.getElementById(`bomb${index}`).style.color = "#941a17";
                            break;

                            case 4:
                                document.getElementById(`bomb${index}`).style.color = "#1e1957";
                            break;

                            case 5:
                                document.getElementById(`bomb${index}`).style.color = "#560503";
                            break;

                            default:
                            break;

                        }

                        document.getElementById(`bomb${index}`).innerHTML = bombas;
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  

                    }
                    else{
                        
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";          

                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index+1}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-11}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-10}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-9}`).style.backgroundColor = "#9e9e9e";  
                        document.getElementById(`bomb${index-1}`).style.backgroundColor = "#9e9e9e"; 
                        document.getElementById(`bomb${index}`).innerHTML = "&nbsp;"; 

                        tabuleiroShow[index+1] = 1;
    
                        tabuleiroShow[index-10] = 1;
    
                        tabuleiroShow[index-11] = 1;

                        tabuleiroShow[index-1] = 1;

                        tabuleiroShow[index-9] = 1;

                    }

                }
                else{

                    let bombas = 0;

                    if(!tabuleiro[index-11]){
                        bombas++;
                    }

                    if(!tabuleiro[index-10]){
                        bombas++;
                    }
                    
                    if(!tabuleiro[index-9]){
                        bombas++;
                    }

                    if(!tabuleiro[index+1]){
                        bombas++;
                    }

                    if(!tabuleiro[index+11]){
                        bombas++;
                    }

                    if(!tabuleiro[index+10]){
                        bombas++;
                    }

                    if(!tabuleiro[index+9]){
                        bombas++;
                    }

                    if(!tabuleiro[index-1]){
                        bombas++;
                    }

                    if(bombas){                        
                        
                        switch(bombas){

                            case 1:
                                document.getElementById(`bomb${index}`).style.color = "#101585";
                            break;

                            case 2:
                                document.getElementById(`bomb${index}`).style.color = "#398a3f";
                            break;

                            case 3:
                                document.getElementById(`bomb${index}`).style.color = "#941a17";
                            break;

                            case 4:
                                document.getElementById(`bomb${index}`).style.color = "#1e1957";
                            break;

                            case 5:
                                document.getElementById(`bomb${index}`).style.color = "#560503";
                            break;

                            case 6:
                                document.getElementById(`bomb${index}`).style.color = "#409e93";
                            break;

                            case 7:
                                document.getElementById(`bomb${index}`).style.color = "#ffd900";
                            break;

                            case 8:
                                document.getElementById(`bomb${index}`).style.color = "#800080";
                            break;

                            default:
                            break;

                        }

                        document.getElementById(`bomb${index}`).innerHTML = bombas;
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e";  

                    }
                    else{
                        
                        document.getElementById(`bomb${index}`).style.backgroundColor = "#9e9e9e"; 

                        document.getElementById(`bomb${index-11}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index-10}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index-9}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index+1}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index+11}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index+10}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index+9}`).style.backgroundColor = "#9e9e9e";
                        document.getElementById(`bomb${index-1}`).style.backgroundColor = "#9e9e9e";

                        document.getElementById(`bomb${index}`).innerHTML = "&nbsp;";

                        tabuleiroShow[index-11] = 1;
                        tabuleiroShow[index-10] = 1;
                        tabuleiroShow[index-9] = 1;
                        tabuleiroShow[index+1] = 1;
                        tabuleiroShow[index+11] = 1;
                        tabuleiroShow[index+10] = 1;
                        tabuleiroShow[index+9] = 1;
                        tabuleiroShow[index-1] = 1;

                    }

                }

                verificar(index);

            }

        }

    }

    if(counter == quant_tabuleiro - quant_Bombas){

        let audio = document.getElementById("win-music");
        audio.play();
        win();

    }

}

function changeBombs(bombs){

    document.getElementById("totalbombs").innerHTML = bombs;

    document.getElementById("bombQuant").value = bombs;

    if(bombs == 20){

        document.getElementById("easylabel").classList.add("selected-e");

        document.getElementById("easylabel").classList.remove("unselected");

        document.getElementById("mediumlabel").classList.remove("selected-m");

        document.getElementById("mediumlabel").classList.add("unselected");

        document.getElementById("hardlabel").classList.remove("selected-h");

        document.getElementById("hardlabel").classList.add("unselected");

    }
    else if(bombs == 30){

        document.getElementById("easylabel").classList.remove("selected-e");

        document.getElementById("easylabel").classList.add("unselected");

        document.getElementById("mediumlabel").classList.add("selected-m");

        document.getElementById("mediumlabel").classList.remove("unselected");

        document.getElementById("hardlabel").classList.remove("selected-h");

        document.getElementById("hardlabel").classList.add("unselected");

    }
    else if(bombs == 50){

        document.getElementById("easylabel").classList.remove("selected-e");

        document.getElementById("easylabel").classList.add("unselected");

        document.getElementById("mediumlabel").classList.remove("selected-m");

        document.getElementById("mediumlabel").classList.add("unselected");

        document.getElementById("hardlabel").classList.add("selected-h");

        document.getElementById("hardlabel").classList.remove("unselected");

    }
    else{
        document.getElementById("easylabel").classList.remove("selected-e");

        document.getElementById("easylabel").classList.add("unselected");

        document.getElementById("mediumlabel").classList.remove("selected-m");

        document.getElementById("mediumlabel").classList.add("unselected");

        document.getElementById("hardlabel").classList.remove("selected-h");

        document.getElementById("hardlabel").classList.add("unselected");
    }

}

function toggleMenu(){

    if(document.getElementById("aside").classList.contains("showMenu")){
        document.getElementById("aside").classList.add("hiddenMenu");
        document.getElementById("aside").classList.remove("showMenu");
    }
    else{
        document.getElementById("aside").classList.remove("hiddenMenu");
        document.getElementById("aside").classList.add("showMenu");
    }

}

function change(){

    let x = +document.getElementById("totalbombs").innerHTML;

    quant_Bombas = x;

    toggleMenu();

    iniciar();

}