<img onclick="toggleMenu()" id="menu" src="<?= get_template_directory_uri(); ?>/assets/img/menu.png" alt="Menu">
<header class="hide">

    <div class="container">
        <nav>

            <ul>

                <li><img src="<?= get_template_directory_uri(); ?>/assets/img/logo.png" alt="Logo"></li>

                <li><a href="#">Sobre nós</a></li>

                <li><a href="#">Consultoria</a></li>

                <li><a href="#">Educação</a></li>

                <li><a href="#">Franquia</a></li>

                <li><a href="#" id="btnContact">Entrar em contato</a></li>

            </ul>

        </nav>
    </div>

</header>

<script>

    function toggleMenu(){

        let header = document.querySelector("header");

        let menu = document.getElementById("menu");

        if(header.className == "show"){

            header.className = "hide";

            menu.setAttribute("src", "assets/img/menu.png");

        }else{

            header.className = "show";

            menu.setAttribute("src", "assets/img/back.png");

        }

    }

</script>