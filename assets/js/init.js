let text1 = "Websites e Apps";
            let text2 = "na palma da sua mão";
            let text3 = "<Darkside Dev/>";
            let h1 = document.getElementById("Text1");
            let h2 = document.getElementById("Text2");
            let small = document.querySelector("small");
            let x = 0;
            let y = 0;
            let z = 0;
            let w = 0;

            let imgs = document.querySelectorAll(".special_image");

            function Wait(){

                setTimeout(() => {
                    Write();
                }, 1000);

            }

            function Write(){

                if(x < text1.length){

                    h1.innerHTML += text1.charAt(x);
                    x++;

                    setTimeout(() => {
                        Write();
                    }, 100);

                }
                else if(y < text2.length){

                    h2.innerHTML += text2.charAt(y);
                    y++;

                    setTimeout(() => {
                        Write();
                    }, 100);

                }
                else if(z < imgs.length){

                    imgs[z].style.opacity = 1;

                    z++;

                    setTimeout(() => {
                        Write();
                    }, 500);

                }
                else{
                    document.querySelector(".intro_button").style.opacity = "1";
                    
                    if(w < text3.length){

                        small.innerHTML += text3.charAt(w);
                        w++;

                        setTimeout(() => {
                            Write();
                        }, 200);

                    }
                }

            }

            function Goinit(){

                window.location = "#port_title";

            }

            document.querySelector("main").style.height = window.innerHeight + "px";



function Nop(ev){
    ev.preventDefault();
}