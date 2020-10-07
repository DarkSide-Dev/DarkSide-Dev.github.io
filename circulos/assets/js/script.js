let lvl = 1;

function Click(number){
    let x = document.getElementById(number);
    x.classList.remove("red");
    x.classList.add("green");
    x.removeAttribute("onclick");

    let date = new Date();

    let ball = document.querySelector("main");

    let id = Math.floor((Math.random() * 2000) + 1) + "+" + date.getMilliseconds() + "-" + date.getSeconds();

    ball.innerHTML += `<div class="bola red" id="${id}" onclick="Click('${id}')" style="bottom:${Math.floor((Math.random() * 90) + 1)}%;left:${Math.floor((Math.random() * 90) + 1)}%"></div>`;
}

function SemiStart(){

    let time = 5;

    let clock = document.getElementById("timer");

    document.querySelector("header").removeAttribute("onclick");

    let main = document.querySelector("main");

    main.style.height = screen.height - 110 + "px";

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

    let time = 17 - lvl * 2;

    let clock = document.getElementById("timer");

    let ball = document.querySelector("main");

    let id = Math.floor((Math.random() * 100) + 1) + Date();

    ball.innerHTML = `<div class="bola red" id="${id}" onclick="Click('${id}')" style="bottom:${Math.floor((Math.random() * 90) + 1)}%;left:${Math.floor((Math.random() * 90) + 1)}%"></div>`;

    let timer = setInterval(() => {
        
        if(time < 0){

            clearInterval(timer);

            let x = document.querySelectorAll(".green");

            clock.innerHTML = `Parabéns, você marcou ${x.length} pontos!!`;

            ball.style.opacity = "0";

            setTimeout(() => {

                ball.innerHTML = "";
                ball.style.opacity = "1";

                document.querySelector("header").setAttribute("onclick", "SemiStart()");
                clock.innerHTML = "Clique aqui para começar";

            }, 4000);

        }else{

            clock.innerHTML = time + " segundos restantes...";
            
            time--;

        };

    }, 1000);

}