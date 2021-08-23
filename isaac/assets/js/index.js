function playsound(){
    let audio = document.getElementById("music");
    let img = document.getElementById("sound");
    img.removeAttribute("src");
    img.removeAttribute("onclick");
    img.setAttribute("src", "./assets/img/sound.png");
    img.setAttribute("onclick", "stopsound()");
    audio.play();
}

function stopsound(){
    let audio = document.getElementById("music");
    let img = document.getElementById("sound");
    img.removeAttribute("onclick");
    img.removeAttribute("src");
    img.setAttribute("src", "./assets/img/sound2.png");
    img.setAttribute("onclick", "playsound()");
    audio.pause();
}

setInterval(() => {

    let home = document.getElementById("home");

    let x = home.classList;

    if(x.contains("back1")){
        
        x.remove("back1");
        x.add("back2");

    }
    else if(x.contains("back2")){
        
        x.remove("back2");
        x.add("back3");

    }
    else if(x.contains("back3")){
        
        x.remove("back3");
        x.add("back4");

    }
    else if(x.contains("back4")){
        
        x.remove("back4");
        x.add("back5");

    }
    else{
        
        x.remove("back5");
        x.add("back1");

    }

}, 4000);

setInterval(() => {

    let sinopse = document.getElementById("sinopse-side");

    let x = sinopse.classList;

    if(x.contains("back1")){
        
        x.remove("back1");
        x.add("back2");

    }
    else if(x.contains("back2")){
        
        x.remove("back2");
        x.add("back3");

    }
    else if(x.contains("back3")){
        
        x.remove("back3");
        x.add("back4");

    }
    else if(x.contains("back4")){
        
        x.remove("back4");
        x.add("back5");

    }
    else{
        
        x.remove("back5");
        x.add("back1");

    }

}, 4000);

const loadJSON = (callback) => {

    const xObj = new XMLHttpRequest();

    xObj.overrideMimeType("application/json");

    xObj.open('GET', './assets/json/boss.json', true);

    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) {
            
            callback(xObj.responseText);
        }
    };

    xObj.send(null);
}
  
const init = () => {
    
    loadJSON((response) => {
    
        const json = JSON.parse(response);
        
        for(let info of json.boss){

            document.querySelector(".boss-selection").innerHTML += `<div class="boss-block"><img draggable="false" onclick="showInfo(${info.id})" src="${info.wallpaper}" alt="${info.name}"></div>`;

        }

    });
}
  
init();

function showInfo(id){

    loadJSON((response) => {
    
        const json = JSON.parse(response);
        
        for(let info of json.boss){

            if(info.id == id){
                
                document.getElementById("boss-name").innerHTML = info.name;

                document.getElementById("boss-name-modal").innerHTML = info.name;
                
                document.getElementById("boss-img").setAttribute("src", info.photo);

                document.getElementById("boss-img-modal").setAttribute("src", info.photo);
                
                document.getElementById("boss-life-points").innerHTML = info.baseHp;

                document.getElementById("boss-life-points-modal").innerHTML = info.baseHp;

                if(id >= 9){

                    document.querySelector(".boss-show").style = "align-items: flex-end;";

                }
                else if(id >= 6){

                    document.querySelector(".boss-show").style = "align-items: center;";

                }
                else{
                    document.querySelector(".boss-show").style = "align-items: flex-start;";
                }

                document.querySelector(".boss-show-modal").style.display = "";

                window.location = "#modal";

            }

        }

    });
}

let isaac = 3;

function changeIsaac(){

    if(isaac == 3){

        document.getElementById("isaac").innerHTML = `<img style="width: 120px; position: absolute; left: -40px !important; top: -28px;" draggable="false" src="./assets/img/isaac1.gif" alt="Isaac">`;

        isaac = 2;

    }
    else if(isaac == 2){

        document.getElementById("isaac").innerHTML = `<img style="width: 110px; position: absolute; left: -35px !important; top: -35px;" draggable="false" src="./assets/img/isaac2.gif" alt="Isaac">`;

        isaac = 1;

    }
    else if(isaac == 1){

        document.getElementById("devilDoor").setAttribute("src", "./assets/img/Collectible_Dogma_icon_animated.gif")

        isaac = 0;

    }
    else{
        window.location = "devil-room.html";
    }

}

function closeModal(){
    
    document.querySelector(".boss-show-modal").style.display = "none";

}

function back(){
    window.location = "index.html";
}