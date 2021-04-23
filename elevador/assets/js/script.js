function retirar(){
    let jandir1 = document.querySelectorAll(".jandir1");
    let jandir2 = document.querySelectorAll(".jandir2");
    let jandir3 = document.querySelectorAll(".jandir3");
    let jandir4 = document.querySelectorAll(".jandir4");
    let janesq1 = document.querySelectorAll(".janesq1");
    let janesq2 = document.querySelectorAll(".janesq2");
    let janesq3 = document.querySelectorAll(".janesq3");
    let janesq4 = document.querySelectorAll(".janesq4");


    for(let i = 0; i < 2; i++){
            jandir1[i].classList.remove('amarelo');

            jandir2[i].classList.remove('amarelo');

            jandir3[i].classList.remove('amarelo');

            jandir4[i].classList.remove('amarelo');

            janesq1[i].classList.remove('amarelo');

            janesq2[i].classList.remove('amarelo');

            janesq3[i].classList.remove('amarelo');

            janesq4[i].classList.remove('amarelo');

    }
}




function andar1(){

    let elevador = document.querySelector(".elevador");

    elevador.style.top = "-85px";

    retirar();

    let janeladir = document.querySelectorAll(".jandir1");

    let janelaesq = document.querySelectorAll(".janesq1");

    for(let i = 0; i < 2; i++){
        janeladir[i].classList.add('amarelo');
        janelaesq[i].classList.add('amarelo');
    }

    let voz = document.getElementById('vozes');
    voz.innerHTML = "<audio src='assets/mp3/voz1.mp3' autoplay></audio>";

}

function andar2(){
    retirar();

    let elevador = document.querySelector(".elevador");

    elevador.style.top = "-214px";

    let janeladir = document.querySelectorAll(".jandir2");

    let janelaesq = document.querySelectorAll(".janesq2");
    
    for(let i = 0; i < 2; i++){
        janeladir[i].classList.add('amarelo');
        janelaesq[i].classList.add('amarelo');
    }

    let voz = document.getElementById('vozes');
    voz.innerHTML = "<audio src='assets/mp3/voz2.mp3' autoplay></audio>";

}

function andar3(){
    retirar();

    let elevador = document.querySelector(".elevador");

    elevador.style.top = "-342px";

    let janeladir = document.querySelectorAll(".jandir3");

    let janelaesq = document.querySelectorAll(".janesq3");
    
    for(let i = 0; i < 2; i++){
        janeladir[i].classList.add('amarelo');
        janelaesq[i].classList.add('amarelo');
    }

    let voz = document.getElementById('vozes');
    voz.innerHTML = "<audio src='assets/mp3/voz3.mp3' autoplay></audio>";

}

function andar4(){
    retirar();

    let elevador = document.querySelector(".elevador");

    elevador.style.top = "-470px";

    let janeladir = document.querySelectorAll(".jandir4");

    let janelaesq = document.querySelectorAll(".janesq4");
    
    for(let i = 0; i < 2; i++){
        janeladir[i].classList.add('amarelo');
        janelaesq[i].classList.add('amarelo');
    }

    let voz = document.getElementById('vozes');
    voz.innerHTML = "<audio src='assets/mp3/voz4.mp3' autoplay></audio>";

}

function andar0(){
    retirar();

    let elevador = document.querySelector(".elevador");

    elevador.style.top = "0px";

    let voz = document.getElementById('vozes');
    voz.innerHTML = "<audio src='assets/mp3/voz0.mp3' autoplay></audio>";

}