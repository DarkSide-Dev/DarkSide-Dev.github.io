let lvl = 1;
let time = 17 - lvl * 2;

function Click(number){
    let x = document.getElementById(number);
    x.classList.remove("red");
    x.classList.add("green");
    x.removeAttribute("onclick");

    let bar = document.getElementById("ranger");

    if(bar.value >= 9.5){

        bar.classList.remove("inProgress");
        time = 0;

    }

    bar.value += 0.5;

    let date = new Date();

    let ball = document.querySelector("main");

    let id = Math.floor((Math.random() * 2000) + 1) + "+" + date.getMilliseconds() + "-" + date.getSeconds();

    ball.innerHTML += `<div class="bola red" id="${id}" onclick="Click('${id}')" style="bottom:${Math.floor((Math.random() * 90) + 1)}%;left:${Math.floor((Math.random() * 80) + 1)}%"></div>`;
}

function SemiStart(){

    let time = 5;

    let clock = document.getElementById("timer");

    document.querySelector("h1").removeAttribute("onclick");

    let main = document.querySelector("main");

    main.style.height = window.innerHeight - 117 + "px";

    let timer = setInterval(() => {
        
        if(time < 0){

            clearInterval(timer);

            Start();

        }else{

            clock.innerHTML = "O jogo começará em " + time + " segundos";
            time--;

        }

    }, 1000);

}

function Start(){

    let clock = document.getElementById("timer");

    let ball = document.querySelector("main");

    let id = Math.floor((Math.random() * 100) + 1) + Date();

    ball.innerHTML = `<div class="bola red" id="${id}" onclick="Click('${id}')" style="bottom:${Math.floor((Math.random() * 90) + 1)}%;left:${Math.floor((Math.random() * 90) + 1)}%"></div>`;

    let timer = setInterval(() => {
        
        if(time < 0){

            clearInterval(timer);

            let bar = document.getElementById("ranger");

            if(bar.value == 10){

                clock.innerHTML = `Parabéns, encheu a barra de progresso!!`;

                ball.style.opacity = "0";

                setTimeout(() => {

                    ball.innerHTML = "";
                    ball.style.opacity = "1";

                    document.querySelector("h1").setAttribute("onclick", "SemiStart()");
                    clock.innerHTML = "Clique aqui para jogar novamente";
                    bar.value = 0;

                }, 5000);

            }
            else{

                clock.innerHTML = `Você conseguiu ${bar.value * 10}%, tente novamente!!`;

                ball.style.opacity = "0";

                setTimeout(() => {

                    ball.innerHTML = "";
                    ball.style.opacity = "1";

                    document.querySelector("h1").setAttribute("onclick", "SemiStart()");
                    clock.innerHTML = "Clique aqui para jogar novamente";
                    bar.value = 0;

                }, 5000);

            }

            time = 17;

        }else{

            clock.innerHTML = time + " segundos restantes...";
            
            time--;

        };

    }, 1000);

}