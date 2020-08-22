<!-- Palheta: #72DBCC (div 2) -->
<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gabstore - Roupas</title>
        <link rel="stylesheet" href="assets/css/bootstrap.css">
        <link rel="stylesheet" href="assets/css/index.css">
        <link href="https://fonts.googleapis.com/css2?family=Sura&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Saira&display=swap" rel="stylesheet">
    </head>

    <body>
        
        <div id="menu">
        
            <ul class="menu-itens">

                <li id="logo">GabStore</li>

                <li class="itens">Feminino</li>

                <li class="itens">Masculino</li>

                <li class="itens">Acessórios</li>

                <li>
                    <img id="user" onmouseover="user(true)" onmouseout="user(false)" src="assets/img/user.png" alt="Carrinho de compras">
                </li>

                <li>
                    <img id="email" onmouseover="email(true)" onmouseout="email(false)" src="assets/img/email.png" alt="Carrinho de compras">
                </li>

                <li>

                    <img id="sacola" onmouseover="sacola(true)" onmouseout="sacola(false)" src="assets/img/sacola.png" alt="Carrinho de compras">    

                </li>

                <li><input id="pesquisador" type="search" name="pesquisa" placeholder="Pesquisar">

                <img id="lupa" src="assets/img/lupa.png" alt="lupa de pesquisa"></li>

            </ul>

        </div>

        <br>

        <div class="pesquisa">
        
            <div id="carrosel" class="carousel slide" data-ride="carousel">

                <div class="carousel-inner">

                    <div style="height: 500px;" class="carousel-item active bg-dark">

                        <center> <img class="d-block w-100" src="assets/img/amor.JPG" alt="..."> </center>

                        <div class="carousel-caption d-none d-md-block">

                            <h5>Este é um exemplo de animal primitivo</h5>

                            <p>Nicodemos chulézares - Espécie Endêmica</p>

                        </div>

                    </div>

                    <div style="height: 500px;" class="carousel-item">

                        <center> <img class="d-block w-100" src="assets/img/IMG_6289.JPG" alt="..."> </center>

                        <div class="carousel-caption d-none d-md-block">

                            <h5>Este é um exemplo de animal primitivo</h5>

                            <p>Nicodemos chulézares - Espécie Endêmica</p>

                        </div>

                    </div>

                    <a class="carousel-control-prev" href="#carrosel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Anterior</span>
                    </a>
                    <a class="carousel-control-next" href="#carrosel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Próximo</span>
                    </a>

                </div>

            </div>

        </div>

        <script src="assets/js/jquery-3.5.0.min.js"></script>
        
        <script src="assets/js/bootstrap.bundle.min.js"></script>

        <script>
            
            function sacola(b){

                let x = document.getElementById("sacola");

                if(b){

                    x.src = "assets/img/sacola-dark.png";

                }
                else{

                    x.src = "assets/img/sacola.png";

                }

            }

            function email(b){

                let x = document.getElementById("email");

                if(b){

                    x.src = "assets/img/email-dark.png";

                }
                else{

                    x.src = "assets/img/email.png";

                }

            }

            function user(b){

                let x = document.getElementById("user");

                if(b){

                    x.src = "assets/img/user-dark.png";

                }
                else{

                    x.src = "assets/img/user.png";

                }

            }

        </script>

    </body>

</html>